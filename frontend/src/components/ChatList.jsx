import React, { useEffect } from 'react'
import { usechatstore } from '../store/usechatstore'
import UserLoandingSkeleton from "../components/UserLoadingSkeleton"
import NoChatsFound from "../components/NoChatsFound"
import { useauthstore } from '../store/useauthstore'

const ChatList = () => {

  const { chats, getmychatpartner, isuserloading, setselecteduser } = usechatstore();
  const { onlineuser } = useauthstore();

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
          className="flex items-center gap-4 p-3 
      bg-gray-800 hover:bg-gray-700 
      rounded-2xl cursor-pointer 
      transition-all duration-200 shadow-md
      mt-2"
          onClick={() => setselecteduser(chat)}
        >
          {/* Profile Image */}
          <div
            className={`avatar ${onlineuser.includes(chat._id) ? "online" : ""
              }`}
          >
            <div className="w-12 rounded-full">
              <img
                src={chat.profilepic || "/avatar.png"}
                alt={chat.name}
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <p className="text-white font-semibold text-sm">
              {chat.name}
            </p>

            <p className="text-gray-400 text-xs">
              {onlineuser.includes(chat._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList
