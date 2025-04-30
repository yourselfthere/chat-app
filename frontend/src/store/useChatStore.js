import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      //   toast.error(error.response.data.message);
      const message =
        error.response?.data?.message || "Something went wrong in chatStore";
      toast.error(message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    // we would need to tell the userId which message we want
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong in chatStore";
      toast.error(message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  // todo: optimize it later
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
