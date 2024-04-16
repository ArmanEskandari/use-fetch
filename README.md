## Core Dependencies

This project is currently extended with the following packages:

| Package     | Usage            |
| ----------- |------------------|
| Axios       | HTTP Client      |
| Zustand     | State Management |
| Material-UI | UI Library       |

## Features of `useFetch` Hook

- **Data Fetching**: Simplifies the process of fetching data from an API in React components.
- **Loading State Management**: Handles loading state internally, allowing components to respond accordingly during data fetching.
- **Error Handling**: Manages errors that occur during data fetching and displays notifications to the user using a notification store.
- **Retry Mechanism**: Provides an optional retry mechanism with customizable delay to retry failed API requests.
- **Customizable Callbacks**: Supports `onSuccess` and `onError` callback functions to execute custom logic upon successful data fetching or error occurrence.
- **Dependency-based Fetching**: Allows specifying dependencies to trigger a refetch when they change.
- **Automatic Fetch on Component Mount**: Optionally fetches data automatically when the component mounts.
- Abort incomplete/redundant requests thanks to axios cancel token.

These features combined provide a robust and flexible solution for handling data fetching in React applications, promoting cleaner and more maintainable code.

## Implementation of `useFetch` Hook

The implementation of the `useFetch` hook mentioned in this document can be found under the following directory path:
`src/shared/hooks/use-fetch`.
This directory contains the source code for the `useFetch` hook.


### `httpRequest` Function

#### Functionality

- Provides a generic function for making HTTP requests using Axios.
- Allows customization of request configuration and response transformation.
- Handles API errors and logs them to the console.

#### Type Safety

- Utilizes TypeScript generics to define the type of the returned data.
- Allows specifying a response transformer function to transform the response data into a specific type.

#### Dependencies

- `axios`: Instance of Axios with configured interceptors for handling requests and responses.

#### Implementation

```typescript
import { axios, AxiosRequestConfig, AxiosResponse } from 'axios';

const handleApiError = (error: any) => {
  console.error('API Error:', error);
  throw error;
};

const httpRequest = async <T>({
  config,
  responseTransformer,
}: {
  config: AxiosRequestConfig;
  responseTransformer?: (res: AxiosResponse<any>['data']) => T;
}): Promise<T> => {
  try {
    const response: AxiosResponse<any> = await axios(config);
    const responseData = responseTransformer
      ? responseTransformer(response?.data)
      : response?.data;
    return responseData;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export { httpRequest };
```

## Example Usage of `useFetch` with `httpRequest`

```typescript
const getDataFromAPI = async (): Promise<MyData[]> => {
  const apiUrl = 'https://api.example.com/data';

  return httpRequest<MyData[]>({
    config: {
      method: 'GET',
      url: apiUrl,
    },
    responseTransformer: (res): MyData[] => {
      // Transform the response data into custom type `MyData`
      return res.map((item: any) => ({
        id: item.id,
        name: item.name,
        // Map other properties as needed
      }));
    },
  });
};

export { getDataFromAPI };
```

Now we can combine it with our useFetch hook:

```typescript
import { type FC } from 'react';
import { useFetch } from '@hooks/use-fetch';

const MyComponent: FC = () => {
   const { loading, data, error, fetchData } = useFetch({
      apiRequest: getDataFromAPI,
      fireOnload: true,
      onError: (error => {
        console.error(error)
      }),
      onSuccess: (res) => {
         console.log('Response:', res)
      },
      retryOptions: {
         delay: 5000
      },
      deps: [...retryDepsArray]
   })
   
   return (
     <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {data.map((item) => (
          <div key={item.id}>
           <p>{item.name}</p>
           {/* Render other properties as needed */}
          </div>
        ))}
     </div>
   )
}
```

## How to Run the Project

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the project repository:

   ```bash
   git clone https://github.com/ArmanEskandari/use-fetch.git
   ```

2. Navigate to the project directory:

   ```bash
   cd use-fetch-hook
   ```

3. Install dependencies using npm or yarn:

   ```bash
   yarn install
   ```

### Running the Development Server

To start the development server with Vite, run the following command:

   ```bash
   yarn dev
   ```

This will start the server and open your default web browser to preview the application. Any changes you make to the code will be automatically reflected in the browser.
