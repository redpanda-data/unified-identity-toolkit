/**
 * Unit tests for pagination utility
 */

import { beforeEach, describe, expect, jest, test } from 'bun:test';
import {
  type ApiFunction,
  type PaginatedRequest,
  type PaginatedResponse,
  paginateAll,
  paginateToArray,
  paginateToMap,
  type ResultAccumulator,
  type ResultExtractor,
} from './pagination.js';

// Mock types for testing
interface MockUser {
  id: string;
  email: string;
}

interface MockListUsersRequest extends PaginatedRequest {
  filter?: string;
}

interface MockListUsersResponse extends PaginatedResponse {
  users: MockUser[];
}

// Helper to create mock users
function createMockUsers(count: number, prefix = 'user'): MockUser[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    email: `${prefix}${i + 1}@example.com`,
  }));
}

describe('paginateAll', () => {
  beforeEach(() => {
    // Mock console.log to avoid noise in test output
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  test('should handle single page response', async () => {
    const mockUsers = createMockUsers(5);
    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest.fn(
      async (_request) => ({
        users: mockUsers,
        nextPageToken: '',
      })
    );

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const accumulator: ResultAccumulator<MockUser, MockUser[]> = (acc, results) => [
      ...acc,
      ...results,
    ];

    const result = await paginateAll(
      { filter: 'test' },
      apiFunction,
      resultExtractor,
      [] as MockUser[],
      accumulator,
      { logRequests: false, logResults: false }
    );

    expect(result).toEqual(mockUsers);
    expect(apiFunction).toHaveBeenCalledTimes(1);
    expect(apiFunction).toHaveBeenCalledWith({
      filter: 'test',
      pageSize: 100,
      pageToken: '',
    });
  });

  test('should handle multiple pages', async () => {
    const page1Users = createMockUsers(3, 'page1');
    const page2Users = createMockUsers(2, 'page2');

    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValueOnce({
        users: page1Users,
        nextPageToken: 'token-page2',
      })
      .mockResolvedValueOnce({
        users: page2Users,
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const accumulator: ResultAccumulator<MockUser, MockUser[]> = (acc, results) => [
      ...acc,
      ...results,
    ];

    const result = await paginateAll(
      {},
      apiFunction,
      resultExtractor,
      [] as MockUser[],
      accumulator,
      { logRequests: false, logResults: false }
    );

    expect(result).toEqual([...page1Users, ...page2Users]);
    expect(apiFunction).toHaveBeenCalledTimes(2);
    expect(apiFunction).toHaveBeenNthCalledWith(1, {
      pageSize: 100,
      pageToken: '',
    });
    expect(apiFunction).toHaveBeenNthCalledWith(2, {
      pageSize: 100,
      pageToken: 'token-page2',
    });
  });

  test('should handle empty responses', async () => {
    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValue({
        users: [],
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const accumulator: ResultAccumulator<MockUser, MockUser[]> = (acc, results) => [
      ...acc,
      ...results,
    ];

    const result = await paginateAll(
      {},
      apiFunction,
      resultExtractor,
      [] as MockUser[],
      accumulator,
      { logRequests: false, logResults: false }
    );

    expect(result).toEqual([]);
    expect(apiFunction).toHaveBeenCalledTimes(1);
  });

  test('should respect custom page size', async () => {
    const mockUsers = createMockUsers(2);
    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValue({
        users: mockUsers,
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const accumulator: ResultAccumulator<MockUser, MockUser[]> = (acc, results) => [
      ...acc,
      ...results,
    ];

    await paginateAll({}, apiFunction, resultExtractor, [] as MockUser[], accumulator, {
      pageSize: 50,
      logRequests: false,
      logResults: false,
    });

    expect(apiFunction).toHaveBeenCalledWith({
      pageSize: 50,
      pageToken: '',
    });
  });

  test('should enforce max pages limit', async () => {
    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValue({
        users: createMockUsers(1),
        nextPageToken: 'always-more',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const accumulator: ResultAccumulator<MockUser, MockUser[]> = (acc, results) => [
      ...acc,
      ...results,
    ];

    await expect(
      paginateAll({}, apiFunction, resultExtractor, [] as MockUser[], accumulator, {
        maxPages: 2,
        logRequests: false,
        logResults: false,
      })
    ).rejects.toThrow('Maximum pages limit (2) exceeded');

    expect(apiFunction).toHaveBeenCalledTimes(2);
  });

  test('should handle API errors', async () => {
    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockRejectedValue(new Error('API Error'));

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const accumulator: ResultAccumulator<MockUser, MockUser[]> = (acc, results) => [
      ...acc,
      ...results,
    ];

    await expect(
      paginateAll({}, apiFunction, resultExtractor, [] as MockUser[], accumulator, {
        logRequests: false,
        logResults: false,
      })
    ).rejects.toThrow('API Error');
  });

  test('should work with custom accumulator (counting)', async () => {
    const page1Users = createMockUsers(3);
    const page2Users = createMockUsers(2);

    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValueOnce({
        users: page1Users,
        nextPageToken: 'token2',
      })
      .mockResolvedValueOnce({
        users: page2Users,
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const countAccumulator: ResultAccumulator<MockUser, number> = (count, results) =>
      count + results.length;

    const totalCount = await paginateAll({}, apiFunction, resultExtractor, 0, countAccumulator, {
      logRequests: false,
      logResults: false,
    });

    expect(totalCount).toBe(5);
  });

  test('should log requests and results when enabled', async () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValue({
        users: createMockUsers(2),
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const accumulator: ResultAccumulator<MockUser, MockUser[]> = (acc, results) => [
      ...acc,
      ...results,
    ];

    await paginateAll(
      { filter: 'test' },
      apiFunction,
      resultExtractor,
      [] as MockUser[],
      accumulator,
      {
        logRequests: true,
        logResults: true,
        requestName: 'Users',
      }
    );

    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining('📤 Users request (page 1):'),
      expect.any(String)
    );
    expect(mockConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining('📊 Total users fetched: 2')
    );
  });
});

describe('paginateToArray', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  test('should paginate to array', async () => {
    const mockUsers = createMockUsers(3);
    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValue({
        users: mockUsers,
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;

    const result = await paginateToArray({ filter: 'test' }, apiFunction, resultExtractor, {
      logRequests: false,
      logResults: false,
    });

    expect(result).toEqual(mockUsers);
    expect(Array.isArray(result)).toBe(true);
  });

  test('should handle multiple pages into array', async () => {
    const page1Users = createMockUsers(2, 'p1');
    const page2Users = createMockUsers(2, 'p2');

    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValueOnce({
        users: page1Users,
        nextPageToken: 'page2',
      })
      .mockResolvedValueOnce({
        users: page2Users,
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;

    const result = await paginateToArray({}, apiFunction, resultExtractor, {
      logRequests: false,
      logResults: false,
    });

    expect(result).toEqual([...page1Users, ...page2Users]);
    expect(result.length).toBe(4);
  });
});

describe('paginateToMap', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  test('should paginate to map', async () => {
    const mockUsers = createMockUsers(3);
    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValue({
        users: mockUsers,
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const keyValueExtractor = (user: MockUser): [string, string] => [user.id, user.email];

    const result = await paginateToMap({}, apiFunction, resultExtractor, keyValueExtractor, {
      logRequests: false,
      logResults: false,
    });

    expect(result instanceof Map).toBe(true);
    expect(result.size).toBe(3);
    expect(result.get('user-1')).toBe('user1@example.com');
    expect(result.get('user-2')).toBe('user2@example.com');
    expect(result.get('user-3')).toBe('user3@example.com');
  });

  test('should handle multiple pages into map', async () => {
    const page1Users = createMockUsers(2, 'p1');
    const page2Users = createMockUsers(2, 'p2');

    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValueOnce({
        users: page1Users,
        nextPageToken: 'page2',
      })
      .mockResolvedValueOnce({
        users: page2Users,
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const keyValueExtractor = (user: MockUser): [string, string] => [user.id, user.email];

    const result = await paginateToMap({}, apiFunction, resultExtractor, keyValueExtractor, {
      logRequests: false,
      logResults: false,
    });

    expect(result.size).toBe(4);
    expect(result.get('p1-1')).toBe('p11@example.com');
    expect(result.get('p2-2')).toBe('p22@example.com');
  });

  test('should handle duplicate keys (last wins)', async () => {
    const users = [
      { id: 'user-1', email: 'first@example.com' },
      { id: 'user-1', email: 'second@example.com' }, // Same ID, different email
    ];

    const apiFunction: ApiFunction<MockListUsersRequest, MockListUsersResponse> = jest
      .fn()
      .mockResolvedValue({
        users,
        nextPageToken: '',
      });

    const resultExtractor: ResultExtractor<MockListUsersResponse, MockUser> = (response) =>
      response.users;
    const keyValueExtractor = (user: MockUser): [string, string] => [user.id, user.email];

    const result = await paginateToMap({}, apiFunction, resultExtractor, keyValueExtractor, {
      logRequests: false,
      logResults: false,
    });

    expect(result.size).toBe(1);
    expect(result.get('user-1')).toBe('second@example.com'); // Last value wins
  });
});
