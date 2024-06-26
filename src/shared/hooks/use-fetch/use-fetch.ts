import { useNotificationStore } from '@store/notification';
import { DependencyList, useEffect, useState } from 'react';

const useFetch = <R, I>({
  apiRequest,
  onSuccess,
  onError,
  retryOptions,
  deps = [],
  fireOnload = true,
}: {
  apiRequest: UseFetchTypes.ApiRequest<R, I>;
  onSuccess?: (response: R) => void;
  onError?: (error?: any) => void;
  retryOptions?: UseFetchTypes.RetryOptions;
  deps?: DependencyList;
  fireOnload?: boolean;
}): UseFetchTypes.ReturnType<R, I> => {
  const { showNotification } = useNotificationStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<R | null>(null);
  const retryDelay = retryOptions?.delay;

  const fetchData = async (incomingData?: any) => {
    setLoading(true);
    setError(null);

    try {
      setError(null);
      const response = await apiRequest(incomingData);
      setData(response);
      setLoading(false);
      onSuccess && onSuccess(response);
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      const errorCode = err.response?.status;
      const errorMessage = err.response?.data?.detail || err.message; // varies based on api response
      showNotification(
        `${errorCode}: ${errorMessage ?? err.response?.data?.messages}`,
        'error',
      );
      onError && onError(err);
    }
  };

  useEffect(() => {
    let retryInterval: NodeJS.Timeout | undefined;
    if (retryDelay) {
      retryInterval = setInterval(fetchData, retryDelay);
    }

    if (fireOnload) {
      fetchData();
    }

    return () => {
      if (retryInterval) {
        clearTimeout(retryInterval);
      }
    };
  }, [...deps]);

  return { data, loading, error, fetchData };
};

export { useFetch };
