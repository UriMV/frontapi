import axios from 'axios';
import { refreshToken } from './api/authApi';

let navigateRef = null;

export const setNavigate = (navigate) => {
  navigateRef = navigate;
};

const setupAxiosInterceptors = () => {
  // Interceptor para añadir token a las peticiones
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => Promise.reject(error));

  // Interceptor para manejar respuestas
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      
      // Si el error es 401 (no autorizado) y no es una solicitud de refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Intentar refrescar el token
          const { token: newToken, refreshToken: newRefreshToken } = await refreshToken();
          
          // Actualizar los tokens
          localStorage.setItem('token', newToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          // Reintentar la solicitud original con el nuevo token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          // Si falla el refresh, redirigir al login
          clearAuthData();
          redirectToLogin();
          return Promise.reject(refreshError);
        }
      }
      
      // Para otros errores 401 (sin intentar refresh)
      if (error.response?.status === 401) {
        clearAuthData();
        redirectToLogin();
      }
      
      return Promise.reject(error);
    }
  );
};

const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('username');
};

const redirectToLogin = () => {
  if (navigateRef) {
    navigateRef('/', { replace: true });
  } else {
    window.location.href = '/';
  }
};

export default setupAxiosInterceptors;