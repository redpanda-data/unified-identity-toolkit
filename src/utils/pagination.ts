/**
 * Generic pagination utility for ConnectRPC APIs
 * Handles the common pattern of paginated requests with page tokens
 */

export interface PaginatedRequest {
  pageSize: number;
  pageToken: string;
  [key: string]: unknown;
}

export interface PaginatedResponse {
  nextPageToken: string;
  [key: string]: unknown;
}

export interface PaginationOptions {
  pageSize?: number;
  maxPages?: number;
  logRequests?: boolean;
  logResults?: boolean;
  requestName?: string;
}

export type ApiFunction<TRequest extends PaginatedRequest, TResponse extends PaginatedResponse> = (
  request: TRequest
) => Promise<TResponse>;

export type ResultExtractor<TResponse, TResult> = (response: TResponse) => TResult[];

export type ResultAccumulator<TResult, TAccumulated> = (
  accumulated: TAccumulated,
  results: TResult[]
) => TAccumulated;

/**
 * Generic pagination function that handles the common pattern of:
 * 1. Make paginated API calls with page tokens
 * 2. Extract results from each response
 * 3. Accumulate results across pages
 * 4. Continue until no more pages
 */
export async function paginateAll<
  TRequest extends PaginatedRequest,
  TResponse extends PaginatedResponse,
  TResult,
  TAccumulated,
>(
  baseRequest: Omit<TRequest, 'pageSize' | 'pageToken'>,
  apiFunction: ApiFunction<TRequest, TResponse>,
  resultExtractor: ResultExtractor<TResponse, TResult>,
  initialAccumulator: TAccumulated,
  resultAccumulator: ResultAccumulator<TResult, TAccumulated>,
  options: PaginationOptions = {}
): Promise<TAccumulated> {
  const {
    pageSize = 100,
    maxPages = 1000,
    logRequests = true,
    logResults = true,
    requestName = 'API',
  } = options;

  let accumulated = initialAccumulator;
  let pageToken = '';
  let pageCount = 0;
  let totalResults = 0;

  do {
    pageCount++;

    if (pageCount > maxPages) {
      throw new Error(`Maximum pages limit (${maxPages}) exceeded for ${requestName}`);
    }

    const request = {
      ...baseRequest,
      pageSize,
      pageToken,
    } as TRequest;

    if (logRequests) {
      console.log(
        `📤 ${requestName} request (page ${pageCount}):`,
        JSON.stringify(request, null, 2)
      );
    }

    const response = await apiFunction(request);
    const pageResults = resultExtractor(response);

    accumulated = resultAccumulator(accumulated, pageResults);
    totalResults += pageResults.length;

    pageToken = response.nextPageToken || '';

    if (logRequests && pageResults.length > 0) {
      console.log(`   📄 Page ${pageCount}: ${pageResults.length} results`);
    }
  } while (pageToken);

  if (logResults) {
    console.log(
      `📊 Total ${requestName.toLowerCase()} fetched: ${totalResults} (${pageCount} pages)`
    );
  }

  return accumulated;
}

/**
 * Convenience function for paginating into an array
 */
export async function paginateToArray<
  TRequest extends PaginatedRequest,
  TResponse extends PaginatedResponse,
  TResult,
>(
  baseRequest: Omit<TRequest, 'pageSize' | 'pageToken'>,
  apiFunction: ApiFunction<TRequest, TResponse>,
  resultExtractor: ResultExtractor<TResponse, TResult>,
  options?: PaginationOptions
): Promise<TResult[]> {
  return paginateAll(
    baseRequest,
    apiFunction,
    resultExtractor,
    [] as TResult[],
    (accumulated, results) => [...accumulated, ...results],
    options
  );
}

/**
 * Convenience function for paginating into a Map
 */
export async function paginateToMap<
  TRequest extends PaginatedRequest,
  TResponse extends PaginatedResponse,
  TResult,
  TKey,
  TValue,
>(
  baseRequest: Omit<TRequest, 'pageSize' | 'pageToken'>,
  apiFunction: ApiFunction<TRequest, TResponse>,
  resultExtractor: ResultExtractor<TResponse, TResult>,
  keyValueExtractor: (result: TResult) => [TKey, TValue],
  options?: PaginationOptions
): Promise<Map<TKey, TValue>> {
  return paginateAll(
    baseRequest,
    apiFunction,
    resultExtractor,
    new Map<TKey, TValue>(),
    (accumulated, results) => {
      for (const result of results) {
        const [key, value] = keyValueExtractor(result);
        accumulated.set(key, value);
      }
      return accumulated;
    },
    options
  );
}
