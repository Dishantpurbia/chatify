import React, { useEffect } from 'react'
import { usechatstore } from '../store/usechatstore'
import UserLoadingSkeleton from './UserLoadingSkeleton';

const ContactList = () => {
  const { allcontact, getallcontact,setselecteduser, isuserloading } = usechatstore();

  useEffect(() => {
    getallcontact();
  }, [getallcontact])

  if (isuserloading) return <UserLoadingSkeleton />

  return (
    <div>
      {allcontact.map((contact) => (
        <div
          key={contact._id}
          className='flex items-center gap-4 p-3 
          bg-gray-800 hover:bg-gray-700 
          rounded-2xl cursor-pointer 
          transition-all duration-200 shadow-md
          mb-2 scrollbar-hide'
          onClick={()=>setselecteduser(contact)}
        >
          {/* Profile Image */}
          <div className='relative'>
            <img
              src={contact.profilepic || '/avatar.png'}
              alt={contact.name}
              className='w-12 h-12 rounded-full object-cover border-2 border-gray-600'
            />

            {/* Online Dot */}
            <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full'></span>
          </div>

          {/* User Info */}
          <div className='flex flex-col'>
            <p className='text-white font-semibold text-sm'>
              {contact.name}
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

export default ContactList
