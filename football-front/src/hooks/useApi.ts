import { useState, useEffect } from 'react';
import axios from 'axios';

export const useApi = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const url = "http://localhost:3000/"
        const response = await axios.get<T>(`${url}${endpoint}`);
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, [endpoint]);

  return { data, loading, error };
};