import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
  key: string,
): [T[], (value: T[] | ((value: T[]) => T[])) => void] {
  const [state, setState] = useState<T[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const value = window.localStorage.getItem(key);
        if (value) {
          setState(JSON.parse(value));
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [key]);

  function setValue(value: T[] | ((value: T[]) => T[])) {
    setState((prevState) => {
      const newState = value instanceof Function ? value(prevState) : value;

      window.localStorage.setItem(key, JSON.stringify(newState));
      return newState;
    });
  }

  return [state, setValue];
}
