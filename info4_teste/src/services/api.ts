import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://localhost:8080/info4/api'; // Substitua pelo URL da sua API

export interface ApiResponse {
  email: string;
  password: string;
}

export const fetchUserCredentials = async (id: string): Promise<ApiResponse> => {
  const response: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(`${API_BASE_URL}/listar/${id}`);
  console.log(response);
  return response.data;
};