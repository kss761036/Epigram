import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const value = window.localStorage.getItem(key);
        setState(value ? (JSON.parse(value) as T) : initialValue);
      } catch (err) {
        console.error(err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setValue = (value: T | ((prev: T) => T)) => {
    setState((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;

      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (err) {
        console.error(err);
      }

      return newValue;
    });
  };

  return [state, setValue];
}
