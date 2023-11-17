"use client";

import React, { useState } from "react";

export default function useFetch(url: string) {
  const init = { isError: false, text: "" };

  const [isloader, setIsLoader] = useState(false);
  const [error, setError] = useState(init);

  const handleFetch = async (data: object, method?: string) => {
    try {
      setIsLoader(true);

      const response = await fetch(`api/${url}`, {
        method: method ?? "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const _data = await response.json();

      setIsLoader(false);
      return _data;
    } catch (err) {
      setError({ isError: true, text: err });
    }
  };

  const handleGetFetch = async () => {
    try {
      setIsLoader(true);

      const response = await fetch(`api/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const _data = await response.json();

      setIsLoader(false);
      return _data;
    } catch (err) {
      alert("catch");
      setError({ isError: true, text: err });
    }
  };

  return [isloader, handleFetch, handleGetFetch, error];
}
