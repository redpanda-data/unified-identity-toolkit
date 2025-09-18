/**
 * Unit tests for ConnectRPC interceptors
 */

import { beforeEach, describe, expect, jest, test } from 'bun:test';
import type { UnaryRequest } from '@connectrpc/connect';
import { Code, ConnectError } from '@connectrpc/connect';
import { createBearerTokenInterceptor, createRetryInterceptor } from './interceptors.js';

// Mock types for testing
type MockRequest = {
  header: Map<string, string>;
  method: { name: string };
};

type MockResponse = {
  message: string;
};

// Helper to create mock request
function createMockRequest(): MockRequest {
  return {
    header: new Map<string, string>(),
    method: { name: 'TestMethod' },
  };
}

// Helper to create mock next function
function createMockNext(response?: MockResponse, error?: Error, callCount?: { value: number }) {
  return jest.fn(async (_req: MockRequest) => {
    if (callCount) {
      callCount.value++;
    }

    if (error) {
      throw error;
    }

    return response || { message: 'success' };
  });
}

describe('createBearerTokenInterceptor', () => {
  test('should add Authorization header with bearer token', async () => {
    const token = 'test-token-123';
    const interceptor = createBearerTokenInterceptor(token);

    const req = createMockRequest();
    const mockNext = createMockNext();

    const interceptorFn = interceptor(mockNext);
    await interceptorFn(req as UnaryRequest);

    expect(req.header.get('Authorization')).toBe(`Bearer ${token}`);
    expect(mockNext).toHaveBeenCalledWith(req);
  });

  test('should preserve existing headers', async () => {
    const token = 'test-token-456';
    const interceptor = createBearerTokenInterceptor(token);

    const req = createMockRequest();
    req.header.set('Content-Type', 'application/json');
    const mockNext = createMockNext();

    const interceptorFn = interceptor(mockNext);
    await interceptorFn(req as UnaryRequest);

    expect(req.header.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.header.get('Content-Type')).toBe('application/json');
    expect(mockNext).toHaveBeenCalledWith(req);
  });

  test('should overwrite existing Authorization header', async () => {
    const token = 'new-token';
    const interceptor = createBearerTokenInterceptor(token);

    const req = createMockRequest();
    req.header.set('Authorization', 'Bearer old-token');
    const mockNext = createMockNext();

    const interceptorFn = interceptor(mockNext);
    await interceptorFn(req as UnaryRequest);

    expect(req.header.get('Authorization')).toBe(`Bearer ${token}`);
    expect(mockNext).toHaveBeenCalledWith(req);
  });
});

describe('createRetryInterceptor', () => {
  beforeEach(() => {
    // Mock console.log to avoid noise in test output
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  test('should succeed on first attempt when no error', async () => {
    const interceptor = createRetryInterceptor();

    const req = createMockRequest();
    const callCount = { value: 0 };
    const mockNext = createMockNext({ message: 'success' }, undefined, callCount);

    const interceptorFn = interceptor(mockNext);
    const result = await interceptorFn(req as UnaryRequest);

    expect(result).toEqual({ message: 'success' });
    expect(callCount.value).toBe(1);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  test('should retry on retryable ConnectError and eventually succeed', async () => {
    const interceptor = createRetryInterceptor({ maxRetries: 2, baseDelay: 1 });

    const req = createMockRequest();
    const callCount = { value: 0 };
    const mockNext = jest.fn(async (_req: MockRequest) => {
      callCount.value++;
      if (callCount.value <= 2) {
        throw new ConnectError('Service unavailable', Code.Unavailable);
      }
      return { message: 'success' };
    });

    const interceptorFn = interceptor(mockNext);
    const result = await interceptorFn(req as UnaryRequest);

    expect(result).toEqual({ message: 'success' });
    expect(callCount.value).toBe(3);
    expect(mockNext).toHaveBeenCalledTimes(3);
  });

  test('should exhaust retries and throw last error', async () => {
    const interceptor = createRetryInterceptor({ maxRetries: 2, baseDelay: 1 });

    const req = createMockRequest();
    const error = new ConnectError('Service unavailable', Code.Unavailable);
    const callCount = { value: 0 };
    const mockNext = createMockNext(undefined, error, callCount);

    const interceptorFn = interceptor(mockNext);

    await expect(interceptorFn(req as UnaryRequest)).rejects.toThrow(error);
    expect(callCount.value).toBe(3); // 1 initial + 2 retries
    expect(mockNext).toHaveBeenCalledTimes(3);
  });

  test('should not retry on non-retryable ConnectError', async () => {
    const interceptor = createRetryInterceptor({ maxRetries: 2, baseDelay: 1 });

    const req = createMockRequest();
    const error = new ConnectError('Invalid argument', Code.InvalidArgument);
    const callCount = { value: 0 };
    const mockNext = createMockNext(undefined, error, callCount);

    const interceptorFn = interceptor(mockNext);

    await expect(interceptorFn(req as UnaryRequest)).rejects.toThrow(error);
    expect(callCount.value).toBe(1); // No retries
    expect(mockNext).toHaveBeenCalledTimes(1);
  });

  test('should retry on network errors', async () => {
    const interceptor = createRetryInterceptor({ maxRetries: 1, baseDelay: 1 });

    const req = createMockRequest();
    const callCount = { value: 0 };
    const mockNext = jest.fn(async (_req: MockRequest) => {
      callCount.value++;
      if (callCount.value === 1) {
        const error = new Error('network timeout');
        throw error;
      }
      return { message: 'success' };
    });

    const interceptorFn = interceptor(mockNext);
    const result = await interceptorFn(req as UnaryRequest);

    expect(result).toEqual({ message: 'success' });
    expect(callCount.value).toBe(2);
    expect(mockNext).toHaveBeenCalledTimes(2);
  });

  test('should use custom retry configuration', async () => {
    const customConfig = {
      maxRetries: 1,
      baseDelay: 1,
      maxDelay: 5000,
      retryableStatusCodes: [Code.Internal],
    };
    const interceptor = createRetryInterceptor(customConfig);

    const req = createMockRequest();
    const error = new ConnectError('Internal error', Code.Internal);
    const callCount = { value: 0 };
    const mockNext = createMockNext(undefined, error, callCount);

    const interceptorFn = interceptor(mockNext);

    await expect(interceptorFn(req as UnaryRequest)).rejects.toThrow(error);
    expect(callCount.value).toBe(2); // 1 initial + 1 retry (maxRetries: 1)
  });

  test('should not retry Code.Unavailable with custom config that excludes it', async () => {
    const customConfig = {
      maxRetries: 2,
      baseDelay: 1,
      retryableStatusCodes: [Code.Internal], // Only Internal is retryable
    };
    const interceptor = createRetryInterceptor(customConfig);

    const req = createMockRequest();
    const error = new ConnectError('Service unavailable', Code.Unavailable);
    const callCount = { value: 0 };
    const mockNext = createMockNext(undefined, error, callCount);

    const interceptorFn = interceptor(mockNext);

    await expect(interceptorFn(req as UnaryRequest)).rejects.toThrow(error);
    expect(callCount.value).toBe(1); // No retries because Unavailable not in custom config
  });

  test('should apply exponential backoff with jitter', async () => {
    const interceptor = createRetryInterceptor({
      maxRetries: 2,
      baseDelay: 100,
      maxDelay: 1000,
    });

    const req = createMockRequest();
    const error = new ConnectError('Service unavailable', Code.Unavailable);
    const callCount = { value: 0 };
    const mockNext = createMockNext(undefined, error, callCount);

    const interceptorFn = interceptor(mockNext);

    const startTime = Date.now();
    await expect(interceptorFn(req as UnaryRequest)).rejects.toThrow(error);
    const endTime = Date.now();

    // Should have some delay (at least base delay for 2 retries)
    // Using loose timing to avoid flaky tests
    expect(endTime - startTime).toBeGreaterThan(100);
    expect(callCount.value).toBe(3); // 1 initial + 2 retries
  });

  test('should handle non-Error objects gracefully', async () => {
    const interceptor = createRetryInterceptor({ maxRetries: 1, baseDelay: 1 });

    const req = createMockRequest();
    const callCount = { value: 0 };
    const mockNext = jest.fn(async (_req: MockRequest) => {
      callCount.value++;
      // Throw a non-Error object
      throw 'string error';
    });

    const interceptorFn = interceptor(mockNext);

    await expect(interceptorFn(req as UnaryRequest)).rejects.toBe('string error');
    expect(callCount.value).toBe(1); // Should not retry non-Error objects
  });
});

describe('integration tests', () => {
  test('should work together: bearer token + retry interceptors', async () => {
    const token = 'integration-test-token';
    const bearerInterceptor = createBearerTokenInterceptor(token);
    const retryInterceptor = createRetryInterceptor({ maxRetries: 1, baseDelay: 1 });

    const req = createMockRequest();
    const callCount = { value: 0 };
    const mockNext = jest.fn(async (req: MockRequest) => {
      callCount.value++;

      // Verify token was added
      expect(req.header.get('Authorization')).toBe(`Bearer ${token}`);

      if (callCount.value === 1) {
        throw new ConnectError('Service unavailable', Code.Unavailable);
      }
      return { message: 'success' };
    });

    // Apply interceptors in sequence
    const bearerInterceptorFn = bearerInterceptor(mockNext);
    const retryInterceptorFn = retryInterceptor(bearerInterceptorFn);

    const result = await retryInterceptorFn(req as UnaryRequest);

    expect(result).toEqual({ message: 'success' });
    expect(callCount.value).toBe(2);
    expect(req.header.get('Authorization')).toBe(`Bearer ${token}`);
  });
});
