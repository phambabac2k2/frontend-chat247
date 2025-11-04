import { create } from "zustand";
import { toast } from "sonner";
import type { AuthState } from "@/types/store";
import { authService } from "@/services/authService";
export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,
  setAccessToken: (accessToken) => set({ accessToken }),
  clearState: () => set({ accessToken: null, user: null }),
  signUp: async (firstName, lastName, username, email, password) => {
    try {
      set({ loading: true });
      await authService.signUp(firstName, lastName, username, email, password);
      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển sang trang đăng nhập."
      );
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
  signIn: async (username, password) => {
    try {
      set({ loading: true });
      const { accessToken } = await authService.signIn(username, password);
      console.log("accessToken2: ", accessToken);
      get().setAccessToken(accessToken);
      await get().fetchMe();
      toast.success("Đăng nhập thành công!");
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();

      set({ user });
    } catch (error: any) {
      console.error(error.message);
      set({ user: null, accessToken: null });
      toast.error(error.message);
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  logOut: async () => {
    try {
      set({ loading: true });
      get().clearState();
      await authService.logOut();
      toast.success("Đăng xuất thành công!");
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },

  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();
      const accessToken = await authService.refresh();

      setAccessToken(accessToken);

      if (!user) {
        await fetchMe();
      }
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
      get().clearState();
      throw new Error(error.message);
    } finally {
      set({ loading: false });
    }
  },
}));
