import { useState } from 'react';

export const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [rejected, setRejected] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (
    callback,
    options
  ) => {
    setLoading(!options?.saving);
    setSaving(!!options?.saving);
    setRejected(false);
    setError(null);

    try {
      const result = await callback();
      return result;
    } catch (err) {
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