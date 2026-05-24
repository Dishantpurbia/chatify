import React, { useEffect } from 'react'
import { usechatstore } from '../store/usechatstore'
import UserLoadingSkeleton from './UserLoadingSkeleton';
import { useauthstore } from '../store/useauthstore';

const ContactList = () => {
  const { allcontact, getallcontact, setselecteduser, isuserloading } = usechatstore();
  const {onlineuser} = useauthstore();

  useEffect(() => {
    getallcontact();
  }, [getallcontact])

  if (isuserloading) return <UserLoadingSkeleton />

  return (
    <div>
      {allcontact.map((contact) => (
        <div
          key={contact._id}
          className="flex items-center gap-4 p-3 
      bg-gray-800 hover:bg-gray-700 
      rounded-2xl cursor-pointer 
      transition-all duration-200 shadow-md
      mb-2 scrollbar-hide"
          onClick={() => setselecteduser(contact)}
        >
          {/* Profile Image */}
          <div
            className={`avatar ${onlineuser.includes(contact._id) ? "online" : ""
              }`}
          >
            <div className="w-12 rounded-full">
              <img
                src={contact.profilepic || "/avatar.png"}
                alt={contact.name}
              />
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <p className="text-white font-semibold text-sm">
              {contact.name}
            </p>

            <p className="text-gray-400 text-xs">
              {onlineuser.includes(contact._id)
                ? "Online"
                : "Tap to chat"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ContactList
