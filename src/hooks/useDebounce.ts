import { useEffect, useState } from "react";

/**
 * A hook that debounces the value by the delay passed
 * @param value The value to debounce
 * @param delay The delay in ms
 * @returns T
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}
