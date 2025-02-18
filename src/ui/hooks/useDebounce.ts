import { useEffect, useRef, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const handlerRef = useRef<NodeJS.Timeout | null>(null);
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (handlerRef.current) {
      clearTimeout(handlerRef.current);
    }

    handlerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (handlerRef.current) {
        clearTimeout(handlerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
