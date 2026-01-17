import { useEffect } from "react";


const useDebounceEffect = (text, delay, callback) => {
    useEffect(() => {
        // Set a timer to run callback after delay
        const timer = setTimeout(() => {
            callback(text); // call API or any function here
        }, delay);

        return () => clearTimeout(timer);
    }, [text, delay, callback]);
}

export default useDebounceEffect;