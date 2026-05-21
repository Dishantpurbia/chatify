import { create } from 'zustand';
import axiosinstance from "../lib/axios";
import signup from '../page/signup';
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const baseurl = import.meta.env.MODE === "development" ? "http://localhost:4000" : "/";

export const useauthstore = create((set,get) => ({
    authuser: null,
    ischeckingauth: true,
    issigningup: false,
    islogin: false,
    isloggedout: false,
    socket: null,
    onlineuser: [],

    checkauth: async () => {
        try {
            const res = await axiosinstance.get("/auth/check");
            set({ authuser: res.data });
            get().socketconnecton();
        } catch (error) {
            console.log("error in authcheck", error);
            set({ authuser: null })
        } finally {
            set({ ischeckingauth: false })
        }
    },

    signup: async (data) => {
        set({ issigningup: true })
        try {
            const res = await axiosinstance.post("/auth/signup", data);
            set({ authuser: res.data });

            toast.success('SignUp successfully');

            get().socketconnecton();

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            set({ issigningup: false })
        }
    },

    login: async (data) => {
        set({ islogin: true })
        try {
            const res = await axiosinstance.post('/auth/login', data);
            set({ authuser: res.data })
            toast.success("Login successfully");
            get().socketconnecton();
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            set({ islogin: false })
        }
    },

    loggedout: async () => {
        set({ isloggedout: true })
        try {
            const res = await axiosinstance.post("/auth/logout");
            set({ authuser: null });

            toast.success('loggedout successfully')

            get().socketdisconnet();

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            set({ isloggedout: false })
        }
    },

    getprofile: async (profilepic) => {
        try {
            const res = await axiosinstance.put("/auth/profile-update", profilepic)
            set({ authuser: res.data.updatedUser });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    },

    socketconnecton: () => {
        const { authuser } = get();
        if (!authuser || get().socket?.connected) return;

        const socket = io(baseurl, {
            withCredentials: true
        });

        socket.connect();

        set({ socket: socket })

        socket.on("getonlineuer", (userids) => {
            set({ onlineuser: userids })
        });
    },

    socketdisconnet: ()=>{
        if(get().socket?.connected) get().socket.disconnect();
    }
}));