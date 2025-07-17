# Axios Implementation with Interceptors

## Changes Made

1. Installed Axios: `npm install axios --legacy-peer-deps`

2. Created a new axios client with interceptors in `src/lib/axios-client.ts`:

   - Set up axios with base configuration
   - Added request interceptor to automatically add authentication token
   - Added response interceptor to handle token refresh on 401 errors
   - Added utility functions for common API requests (get, post, put, patch, delete)
   - Added specific API endpoint functions

3. Updated `src/hooks/api.ts`:

   - Replaced fetch calls with the new axios client methods
   - Imported the handleQueries function from axios-client

4. Removed `fetchWithRefreshToken` function from `src/lib/utils.tsx`:
   - This functionality is now handled by axios interceptors

## How It Works

1. **Request Interceptor**:

   - Automatically adds Authorization header with access token to every request
   - Handles authentication without manual token management

2. **Response Interceptor**:

   - Automatically detects 401 (Unauthorized) errors
   - Attempts to refresh the token
   - Retries the original request with new token
   - Handles logout if refresh token is invalid
   - Handles 403 (Forbidden) errors

3. **API Service Methods**:
   - Provides simplified methods for API requests
   - Handles query string formatting
   - Returns typed responses

## Usage Example

```typescript
import { api, apiService } from "@/lib/axios-client";

// Using predefined API endpoints
const userInfo = await api.IAM.getUserInfo();

// Using generic API methods
const data = await apiService.get("/api/v1/path/to/resource", {
  param1: "value1",
});
const result = await apiService.post("/api/v1/path/to/resource", {
  field: "value",
});
```
