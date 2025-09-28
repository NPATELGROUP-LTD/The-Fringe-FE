// API Configuration for frontend
export const apiConfig = {
  // Read API base URL from env. If empty, we'll treat this as "no API" and let services fall back to mocks.
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  version: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  debug: process.env.NEXT_PUBLIC_API_DEBUG === 'true',
  rateLimit: parseInt(process.env.NEXT_PUBLIC_API_RATE_LIMIT || '60'),
};

// Helper function to construct API URLs
export const getApiUrl = (endpoint: string): string => {
  if (!apiConfig.baseURL) {
    throw new ApiError(0, 'No API configured');
  }

  const baseUrl = apiConfig.baseURL.replace(/\/$/, '');
  const version = apiConfig.version;
  const formattedEndpoint = endpoint.replace(/^\//, '');
  return `${baseUrl}/api/${version}/${formattedEndpoint}`;
};

// Helper function to get common fetch options
export const getDefaultFetchOptions = (): RequestInit => {
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(apiConfig.apiKey ? { 'Authorization': `Bearer ${apiConfig.apiKey}` } : {}),
    },
    // timeout: apiConfig.timeout, // Removed because fetch does not support timeout in RequestInit
  };
};

// API error handling
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper with error handling
export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = getApiUrl(endpoint);
  const fetchOptions = {
    ...getDefaultFetchOptions(),
    ...options,
  };

  if (apiConfig.debug) {
    console.log(`API Request: ${url}`, fetchOptions);
  }

  try {
    const response = await fetch(url, fetchOptions);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText, data);
    }

    if (apiConfig.debug) {
      console.log(`API Response: ${url}`, data);
    }

    return data as T;
  } catch (error) {
    // If getApiUrl threw a 'No API configured' ApiError, rethrow so services fall back to mocks.
    if (error instanceof ApiError) {
      throw error;
    }
    // Wrap unknown errors so callers receive a consistent ApiError type
    throw new ApiError(500, 'Internal Client Error', error);
  }
}