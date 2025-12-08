// src/hooks/useApi.js
import { useState } from "react";
import api from "../services/api";

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function request(method, url, data = null) {
    try {
      setLoading(true);
      setError(null);

      const response = await api({
        method,
        url,
        data,
      });

      return response.data;

    } catch (err) {
      const backendError = err.response?.data || "Erro inesperado";
      setError(backendError);
      throw backendError;
    } finally {
      setLoading(false);
    }
  }

  return { request, loading, error };
}
