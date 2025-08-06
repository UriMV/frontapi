// authApi.js
import axios from 'axios';

const API_URL = 'https://authapi.somee.com/api/Auth';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/`, credentials);
  // Guardar tokens en localStorage
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response;
};

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const resetPassword = async (resetData) => {
  return await axios.post(`${API_URL}/reset-password`, resetData);
};

export const refreshToken = async () => {
  const accessToken = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!accessToken || !refreshToken) {
    throw new Error('Tokens no disponibles');
  }

  try {
    const response = await axios.post(`${API_URL}/refresh-token`, {
      accessToken,
      refreshToken
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.data.token || !response.data.refreshToken) {
      throw new Error('Respuesta inválida del servidor');
    }

    return response.data;
  } catch (error) {
    console.error('Error al refrescar token:', error);
    throw error;
  }
};

