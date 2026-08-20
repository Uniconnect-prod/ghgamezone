const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.ghgamezone.com";

export const getToken = () => localStorage.getItem("ghgz_token");
export const setToken = (token) => localStorage.setItem("ghgz_token", token);
export const clearToken = () => localStorage.removeItem("ghgz_token");

export const authFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (res.status === 204) return null;

  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: "Invalid server response" };
  }

  if (!res.ok) {
    const err = new Error(data?.message || `API Error ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
};

export const publicFetch = async (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  let data;
  try {
    data = await res.json();
  } catch {
    data = { message: "Invalid server response" };
  }

  if (!res.ok) {
    const err = new Error(data?.message || `API Error ${res.status}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
};
