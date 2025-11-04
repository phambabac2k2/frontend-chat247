import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";

const api = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:4000/api"
      : "/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const { clearState, setAccessToken } = useAuthStore.getState();

    if (
      originalRequest.url.includes("/auth/signin") ||
      originalRequest.url.includes("/auth/signup") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      if (error.response) {
        error.message =
          error.response.data?.message ||
          error.response.data?.error ||
          "Đã xảy ra lỗi, vui lòng thử lại.";
      } else if (error.request) {
        error.message = "Không thể kết nối đến máy chủ.";
      } else {
        error.message = "Lỗi không xác định.";
      }
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount || 0;
    if (error.response?.status === 401 && originalRequest._retryCount < 1) {
      originalRequest._retryCount += 1;

      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;

        if (!newAccessToken) throw new Error("Không có accessToken mới");

        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearState();
        if (typeof window !== "undefined") {
          window.location.replace("/signin");
        }
        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      error.message =
        error.response.data?.message ||
        error.response.data?.error ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
    } else if (error.request) {
      error.message = "Không thể kết nối đến máy chủ.";
    } else {
      error.message = "Lỗi không xác định.";
    }

    return Promise.reject(error);
  }
);

export default api;
