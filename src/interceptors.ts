/**
 * ConnectRPC interceptors for authentication and retry logic
 */

import type { Interceptor } from '@connectrpc/connect';
import { Code, ConnectError } from '@connectrpc/connect';

/**
 * Bearer token authentication interceptor
 * Adds Authorization header with Bearer token to all requests
 */
export function createBearerTokenInterceptor(token: string): Interceptor {
  return (next) => async (req) => {
    req.header.set('Authorization', `Bearer ${token}`);
    return await next(req);
  };
}

/**
 * Retry interceptor for handling transient failures
 * Retries requests with exponential backoff for specific error codes
 */
export function createRetryInterceptor(
  options: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    retryableStatusCodes?: Code[];
  } = {}
): Interceptor {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    retryableStatusCodes = [
      Code.Unavailable,
      Code.DeadlineExceeded,
      Code.ResourceExhausted,
      Code.Internal,
    ],
  } = options;

  return (next) => async (req) => {
    let lastError: Error = new Error('Unexpected retry error');

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await next(req);
      } catch (error: unknown) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on last attempt or if error is not retryable
        if (attempt === maxRetries || !isRetryableError(error, retryableStatusCodes)) {
          throw error;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(baseDelay * 2 ** attempt + Math.random() * 1000, maxDelay);

        console.log(
          `⚠️ Request failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${Math.round(delay)}ms...`
        );
        await sleep(delay);
      }
    }

    throw lastError;
  };
}

/**
 * Check if an error is retryable based on ConnectError status code
 */
function isRetryableError(error: unknown, retryableStatusCodes: Code[]): boolean {
  // Check if it's a ConnectError and has a retryable status code
  if (error instanceof ConnectError) {
    return retryableStatusCodes.includes(error.code);
  }

  // For non-ConnectError, check for network-related errors
  if (error instanceof Error && error.message) {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('connection') ||
      message.includes('econnreset') ||
      message.includes('enotfound')
    );
  }

  return false;
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
