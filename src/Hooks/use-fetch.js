import { useState, useCallback } from "react";
const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDetails = useCallback(async (url, resultData) => {
    setLoading(true);
    try {
      const result = await fetch(url, {
        method: "GET",
      });
      if (!result.ok) {
        throw new Error("Request failed!");
      }

      let data = await result.json();
      if (data != null) {
        setLoading(false);
        setError(null);
      } else if (data.length === 0) {
        throw new Error("Centers Not Available!");
      }
      resultData(data);
    } catch (error) {
      setError(error.message + "");
      setLoading(false);
    }
  }, []);
  return [loading, fetchDetails, error];
};

export default useFetch;
