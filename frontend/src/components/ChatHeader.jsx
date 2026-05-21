import React, { useEffect } from 'react'
import { usechatstore } from '../store/usechatstore'
import { XIcon } from "lucide-react";

const ChatHeader = () => {

    const{message,selecteduser,setselecteduser,ismessageloading} = usechatstore();

    useEffect(()=>{
        const handlresc = (e)=>{
            if( e.key ==="Escape"){
                setselecteduser(null);
            }
        };

        window.addEventListener("keydown",handlresc);

        return ()=>{
            window.removeEventListener("keydown",handlresc)
        }
    },[setselecteduser])

  return (
    <div className='p-4 border-b border-slate-700/50'>
     <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
            {/*avatar */}
            <div className='avatar online'>
                <div className='size-11 rounded-full overflow-hidden' >
                    <img src={selecteduser.profilepic || "avatar.png"} alt="chatpartner image"
                    className='size-full object-cover'/>
                </div>
            </div>
            <div className='size-15'>
                <h3 className='text-slate-200 font-medium text-base max-w-[120px] truncate'>{selecteduser.name}</h3>
                <p className='text-slate-400 text-xs'>online</p>
            </div>
        </div>
        <button onClick={()=>setselecteduser(null)}>
            <p className='cursor-pointer text-slate-500 hover:text-white transition-colors duration-200'><XIcon/></p>
        </button>
     </div>
    </div>
  )
}

export default ChatHeader
