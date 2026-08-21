import axios from "axios";
import { useState } from "react";
import { useAuthStore } from "../store/AuthStore";

export const useMethods = <T>(endpoint: string) => {

  const url = import.meta.env.VITE_API_URL;

  const login = useAuthStore((state)=> state.login)

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (payload: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post<T>(`${url}${endpoint}`, payload);

      setData(response.data);
      console.log("Team Creado:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error en la petición:", err);
      setError(err.message || "Error al crear");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async(payload: any, exactEndpoint: string)=>{
    setLoading(true);
    setError(null);

    try {
      const response = await axios.patch(`${url}${exactEndpoint}`, payload);

      setData(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error en la petición:", err);
    } finally {
      setLoading(false);
    }
  }

    const handleDelete = async(exactEndpoint: string)=>{
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(`${url}${exactEndpoint}`);

      setData(response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error en la petición:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = async(payload: any, exactEndpoint: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${url}${exactEndpoint}`, payload);
      const {access_token, user} = response.data
      login({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }, access_token);
      return response.data

    } catch (err: any) {
      console.log("Error en la petición: ", err)
      throw err
    }
    finally{
      setLoading(false)
    }
  }

  const handleRegister = async(payload: any, exactEndpoint: string)=>{
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${url}${exactEndpoint}`, payload);
      setData(response.data);

      return response.data

    } catch (err: any) {
      console.log("Error en la petición: ", err)
    } 
    finally{
      setLoading(false)
    }
  }

  return { handleCreate, handleEdit, handleDelete, handleLogin, handleRegister, loading, data, error };
};