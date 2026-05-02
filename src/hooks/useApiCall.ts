import { useState } from 'react';

type ApiCallOptions = {
  saving?: boolean;
};

export const useApiCall = <T,>() => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (
    callback: () => Promise<T>,
    options?: ApiCallOptions
  ) => {
    setLoading(!options?.saving);
    setSaving(!!options?.saving);
    setRejected(false);
    setError(null);

    try {
      const result = await callback();
      return result;
    } catch (err: unknown) {
      setRejected(true);
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
      setSaving(false);
    }
  };

  return { loading, saving, rejected, error, execute };
};
