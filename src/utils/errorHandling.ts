/**
 * Utility functions for error handling
 */

/**
 * Safely executes an async function and returns a tuple with [data, error]
 * @param promise - The promise to execute
 * @returns A tuple with [data, error]
 */
export async function safeAsync<T>(
  promise: Promise<T>
): Promise<[T | null, Error | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error instanceof Error ? error : new Error(String(error))];
  }
}

/**
 * Checks if the error is a network error
 * @param error - The error to check
 * @returns True if the error is a network error
 */
export function isNetworkError(error: Error): boolean {
  return (
    error.message.includes('network') ||
    error.message.includes('fetch') ||
    error.message.includes('connection') ||
    error.message.includes('offline') ||
    error.name === 'NetworkError' ||
    error.name === 'AbortError' ||
    !navigator.onLine
  );
}

/**
 * Formats an error message for display
 * @param error - The error to format
 * @returns A user-friendly error message
 */
export function formatErrorMessage(error: Error): string {
  if (isNetworkError(error)) {
    return 'Network error. Please check your internet connection and try again.';
  }

  if (error.message.includes('timeout') || error.message.includes('timed out')) {
    return 'Request timed out. Please try again later.';
  }

  if (error.message.includes('404') || error.message.includes('not found')) {
    return 'The requested resource was not found.';
  }

  if (error.message.includes('403') || error.message.includes('forbidden')) {
    return 'You do not have permission to access this resource.';
  }

  if (error.message.includes('401') || error.message.includes('unauthorized')) {
    return 'Authentication failed. Please log in and try again.';
  }

  if (error.message.includes('500') || error.message.includes('server error')) {
    return 'Server error. Please try again later.';
  }

  // Default generic message
  return 'An error occurred. Please try again later.';
}

/**
 * Creates a custom error with additional metadata
 * @param message - The error message
 * @param code - The error code
 * @param metadata - Additional metadata
 * @returns A custom error
 */
export class AppError extends Error {
  code: string;
  metadata: Record<string, any>;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    metadata: Record<string, any> = {}
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.metadata = metadata;
  }
}