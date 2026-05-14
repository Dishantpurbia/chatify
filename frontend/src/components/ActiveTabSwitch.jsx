import React from 'react'
import { usechatstore } from '../store/usechatstore'

const ActiveTabSwitch = () => {
  const {activetab, setactivetab} = usechatstore();
  return (
    <div className='tabs tabs-box bd-transparent p-2 m-2'>
      <button onClick={()=>setactivetab("Chats")} 
        className={`tab rounded-[5px] ${activetab === "Chats"? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}>Chats</button>
      <button onClick={() => setactivetab("Contacts")}
        className={`tab rounded-[5px] ${activetab === "Contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}>Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch
