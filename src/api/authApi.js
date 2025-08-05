import axios from 'axios';

const API_BASE = 'https://loginmicro.somee.com/api/Auth';

export const registerUser = (data) => axios.post(`${API_BASE}/register`, data);

export const loginUser = (data) => axios.post(`${API_BASE}/login`, data);

export const resetPassword = (data) => axios.post(`${API_BASE}/reset-password`, data);

export const getSecurityQuestion = (username) => axios.get(`${API_BASE}/security-question/${username}`);
