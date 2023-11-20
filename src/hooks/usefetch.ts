import React, { useState, useEffect } from "react";

export default function useFetch(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    // alert("effe: " + isLoading);
  }, [isLoading]);

  useEffect(() => {
    // alert("effe: " + fetchError);
  }, [fetchError]);

  const fetchData = async (
    data: object,
    method?: string,
  ): Promise<object | undefined> => {
    try {
      setIsLoading(true);

      const response = await fetch(new URL(url), {
        method: method?.toUpperCase() ?? "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resp = await response.json();

      setIsLoading(false);
      return resp;
    } catch (err) {
      setFetchError(err);
      setIsLoading(false);
      console.log("useFetch error: " + err);
    }
  };

  const getFetch = async (): Promise<object | undefined> => {
    try {
      setIsLoading(true);

      const response = await fetch(new URL(url), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const resp = await response.json();

      setIsLoading(false);
      return resp;
    } catch (err) {
      setFetchError(err);
      setIsLoading(false);
      console.log("useFetch error: " + err);
    }
  };

  return [isLoading, fetchError, fetchData, getFetch];
}
