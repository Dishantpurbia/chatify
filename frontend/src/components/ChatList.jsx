import React, { useEffect } from 'react'
import { usechatstore } from '../store/usechatstore'
import UserLoandingSkeleton from "../components/UserLoadingSkeleton"
import NoChatsFound from "../components/NoChatsFound"

const ChatList = () => {

  const { chats, getmychatpartner, isuserloading } = usechatstore();

  useEffect(() => {
    getmychatpartner();
  }, [getmychatpartner])

  if (isuserloading) return <UserLoandingSkeleton />
  if (chats.length === 0) return <NoChatsFound />

  return (
    <div>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className='flex items-center gap-4 p-3 
          bg-gray-800 hover:bg-gray-700 
          rounded-2xl cursor-pointer 
          transition-all duration-200 shadow-md
          mt-2'
        >
          {/* Profile Image */}
          <div className='relative'>
            <img
              src={chat.profilepic || '/avatar.png'}
              alt={chat.name}
              className='w-12 h-12 rounded-full object-cover border-2 border-gray-600'
            />

            {/* Online Dot */}
            <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full'></span>
          </div>

          {/* User Info */}
          <div className='flex flex-col'>
            <p className='text-white font-semibold text-sm'>
              {chat.name}
            </p>

            <p className='text-gray-400 text-xs'>
              Tap to chat
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList
