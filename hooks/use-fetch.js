// Importing useState hook from React
import { useState } from "react";

// Importing toast notification from sonner library
import { toast } from "sonner";

// Custom reusable hook for handling async API calls
const useFetch = (cb) => {

    // State to store response data
    const [data, setData] = useState(undefined);

    // State to store any error that occurs
    const [error, setError] = useState(null);

    // State to track loading status
    const [loading, setLoading] = useState(false);

    // Function that executes the callback (API call)
    const fn = async (...args) => {

        // Set loading true before request starts
        setLoading(true);

        // Reset previous error
        setError(null);

        try {
            // Execute callback function with passed arguments
            const response = await cb(...args);

            // Store response data
            setData(response);

            // Clear any previous error
            setError(null);

        } catch (error) {

            // Store error in state
            setError(error);

            // Show error notification
            toast.error(error.message);

        } finally {

            // Stop loading after request completes (success or fail)
            setLoading(false);
        }
    };

    // Returning states and function to use inside components
    return { data, error, loading, fn, setData };
};

// Exporting custom hook
export default useFetch;