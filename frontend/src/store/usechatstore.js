import {create} from 'zustand'
import axiosinstance from '../lib/axios';
import toast from 'react-hot-toast';

export const usechatstore = create((set,get) => ({
    allcontact: [],
    chats: [],
    message: [],
    activetab: 'chat',
    selecteduser: null,
    isuserloading: false,
    ismessageloading: false,
    issoundenable: localStorage.getItem("issoundenable") === true,
    
    togglesound : () => {
        localStorage.setItem("issoundenable",!get().issoundenable);
        set({issoundenable: !get().issoundenable});
    },

    setactivetab: (tab) => set({activetab:tab}),
    setselecteduser: (selecteduser) => set({selecteduser:selecteduser}),

    getallcontact: async() => {
        set({isuserloading:true})
        try {
            const res = await axiosinstance.get("/message/contacts");
            set({allcontact: res.data});
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }finally{
            set({isuserloading:false})
        }
    },

    getmychatpartner: async() => {
        set({isuserloading:true})
        try {
            const res = await axiosinstance.get("/message/chats");
            set({chats: res.data});
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }finally {
            set({isuserloading:false});
        }
    },
    
}))