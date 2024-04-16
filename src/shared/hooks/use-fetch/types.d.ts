declare namespace UseFetchTypes {
  type ApiRequest<R, I> = (data?: I) => Promise<R>;

  type ReturnType<R, I> = {
    data: R | null;
    loading: boolean;
    error: Error | null;
    fetchData: (data?: I) => void;
  };

  type RetryOptions = {
    delay?: number;
  };
}
