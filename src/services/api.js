import axios from "axios";

const PRODUCTION_API_URL = "https://local-mart-11yd.onrender.com";
const LOCAL_API_URL = "http://localhost:8000";
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const browserHostname = globalThis.location?.hostname || "";
const pageIsLocal = browserHostname === "localhost" || browserHostname === "127.0.0.1";
const configuredUrlIsLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredApiUrl || "");

// Never allow a deployed browser build to call its own localhost, even if a
// stale Vercel environment variable was configured before deployment.
export const API_URL = (
  !pageIsLocal && configuredUrlIsLocal
    ? PRODUCTION_API_URL
    : configuredApiUrl || (import.meta.env.PROD ? PRODUCTION_API_URL : LOCAL_API_URL)
).replace(/\/$/, "");

export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
  headers: { Accept: "application/json" },
});

let refreshRequest = null;

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refreshToken = localStorage.getItem("refresh");
    const isRefreshRequest = original?.url?.includes("token/refresh");

    if (error.response?.status === 401 && refreshToken && !original?._retried && !isRefreshRequest) {
      original._retried = true;
      refreshRequest ||= axios
        .post(`${API_URL}/api/token/refresh/`, { refresh: refreshToken })
        .then(({ data }) => {
          localStorage.setItem("access", data.access);
          if (data.refresh) localStorage.setItem("refresh", data.refresh);
          return data.access;
        })
        .finally(() => {
          refreshRequest = null;
        });
      try {
        const token = await refreshRequest;
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      } catch {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("auth:logout"));
      }
    }
    return Promise.reject(error);
  },
);

export const listData = (payload) => (Array.isArray(payload) ? payload : payload?.results || []);

export const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  const data = error?.response?.data;
  if (typeof data?.error === "string") return data.error;
  if (data?.error?.message) return data.error.message;
  if (data?.detail) return data.detail;
  if (error?.code === "ECONNABORTED") return "The request timed out. Please try again.";
  if (error?.code === "ERR_NETWORK") return `Could not reach the Local Mart API at ${API_URL}.`;
  return fallback;
};

export const imageUrl = (value) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_URL}${value.startsWith("/") ? "" : "/"}${value}`;
};
