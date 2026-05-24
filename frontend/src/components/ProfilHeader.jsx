import React, { useRef, useState } from 'react'
import { useauthstore } from '../store/useauthstore'
import { usechatstore } from '../store/usechatstore';
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

const mouseclick = new Audio("sounds/mouse-click.mp3")

const ProfilHeader = () => {

  const { loggedout, authuser, getprofile, onlineuser } = useauthstore();
  const { issoundenable, togglesound } = usechatstore();

  const [selectedimg, setselectedimg] = useState(null);

  const reffile = useRef(null);

  const imghandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const img = reader.result;
      setselectedimg(img);
      await getprofile({ profilepic: img });
    }
  }

  return (
    <div className='p-4 border-b border-slate-700/50'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          {/* Avatar */}
          <div className={`avatar ${onlineuser.includes(authuser._id) ? "online" : ""}`}>
            <button className='size-14 rounded-full overflow-hidden relative group'
              onClick={() => reffile.current.click()}>

              <img src={selectedimg || authuser.profilepic || "/avatar.png"} alt="user image"
                className='size-full object-cover' />

              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
              flex items-center justify-center transition-opacity'>
                <span className='text-white text-xs'>Change</span>
              </div>

            </button>
            <input type="file"
              ref={reffile}
              accept="image/*"
              onChange={imghandler}
              className='hidden' />
          </div>
          {/* User Name */}
          <div>
            <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
              {authuser.name}
            </h3>

            <p className='text-slate-400 text-xs'>
              Online</p>
          </div>
        </div>
        {/* buttons */}
        <div className='flex flex-row max-[450px]:flex-col items-center gap-4'>          {/*Logout btn */}
          <button className='text-slate-400 hover:text-slate-200 transition-colors'
            onClick={loggedout}>

            <LogOutIcon className='size-5' />
          </button>
          {/*sound button */}
          <button className='text-slate-400 hover:text-slate-200 transition-colors'
            onClick={() => {
              mouseclick.currentTime = 0;
              mouseclick.play().catch((error) => console.log("audio play failed", error));
              togglesound();
            }}>
            {issoundenable ? <Volume2Icon className='size-5' /> : <VolumeOffIcon className='size-5' />}

          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfilHeader
