import { useState, useEffect, useRef } from 'react';

/**
 * Hook that debounces a value - delays updating until after delay period of inactivity
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // Reference to timeout handler for cleanup
  const handler = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing timeout if value changes
    if (handler.current) clearTimeout(handler.current);

    // Set new timeout to update debounced value
    handler.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout on unmount or dependency change
    return () => {
      if (handler.current) clearTimeout(handler.current);
    };
  }, [value, delay]);

  return debouncedValue;
}
