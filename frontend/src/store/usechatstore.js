import { create } from 'zustand'
import axiosinstance from '../lib/axios';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useauthstore } from './useauthstore';

export const usechatstore = create((set, get) => ({
    allcontact: [],
    chats: [],
    message: [],
    activetab: 'Chats',
    selecteduser: null,
    isuserloading: false,
    ismessageloading: false,
    issoundenable: localStorage.getItem("issoundenable") === "true",

    togglesound: () => {
        localStorage.setItem("issoundenable", !get().issoundenable);
        set({ issoundenable: !get().issoundenable });
    },

    setactivetab: (tab) => set({ activetab: tab }),
    setselecteduser: (selecteduser) => set({ selecteduser: selecteduser }),

    getallcontact: async () => {
        set({ isuserloading: true })
        try {
            const res = await axiosinstance.get("/message/contacts");
            set({ allcontact: res.data.user });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            set({ isuserloading: false })
        }
    },

    getmychatpartner: async () => {
        set({ isuserloading: true })
        try {
            const res = await axiosinstance.get("/message/chats");
            set({ chats: res.data.user });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            set({ isuserloading: false });
        }
    },

    sendmessage: async (data) => {
        const { message, selecteduser } = get();
        try {
            const res = await axiosinstance.post(`/message/send/${selecteduser._id}`, data)
            set({ message: message.concat(res.data?.newmessage) })
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    },

    getmessage: async (partnerid) => {
        set({ ismessageloading: true });
        try {
            const res = await axiosinstance.get(`/message/${partnerid}`);
            set({ message: res.data.message });
        } catch (error) {
            console.log(error)
            toast(error.response.data.message);
        } finally {
            set({ ismessageloading: false })
        }
    },

    socketmessage: () => {
        const { selecteduser, message } = get();
        const socket = useauthstore.getState().socket;
        if (!selecteduser || !socket) return;

        socket.on("sendmessage", (newmessage) => {
            const selectedrecieverid = newmessage.senderid === selecteduser._id;

            if (!selectedrecieverid) return;

            set({ message: get().message.concat(newmessage) })
        })
    },

    unsocketmessage: () => {
        const socket = useauthstore.getState().socket;
        socket?.off("sendmessage")
    }

}))