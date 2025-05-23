import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get) => ({
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
  sendMessages: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("Error in update profile:", error);
      const message =
        error.response?.data?.message ||
        "Something went wrong in the sendMessage chatStore";
      toast.error(message);
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    //optimize this one later
    socket.on("newMessage", (newMessage) => {
      // we call this (newMessage) anything (data) etc.
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  // todo: optimize it later
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
