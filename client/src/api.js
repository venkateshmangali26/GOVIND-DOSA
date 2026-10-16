// Centralized API configuration for local dev and cloud production (Vercel + Render)
export const API_BASE = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '') 
  : '';

export const SOCKET_URL = API_BASE || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5000');

export const apiFetch = (endpoint, options = {}) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = API_BASE ? `${API_BASE}${cleanEndpoint}` : cleanEndpoint;
  return fetch(url, options);
};
