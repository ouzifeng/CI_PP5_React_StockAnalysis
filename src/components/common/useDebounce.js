import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Set up a delay to update the debounced value
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timeout if the value or delay changes
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    // Return the debounced value
    return debouncedValue;
}

export default useDebounce;
