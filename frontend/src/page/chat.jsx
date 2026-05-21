import React from 'react'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { usechatstore } from '../store/usechatstore';
import ProfilHeader from '../components/ProfilHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder';

const Chat = () => {

  const { activetab, selecteduser } = usechatstore();

  return (
    <div className="relative w-full max-w-6xl h-[550px] [@media(min-height:700px)]:h-[700px]">
      <BorderAnimatedContainer>

        {/* Left Side */}
        <div
          className={`
        w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col
        ${selecteduser ? "hidden md:flex" : "flex"}
      `}
        >
          <ProfilHeader />
          <ActiveTabSwitch />

          <div className='flex-1 overflow-y-auto hide-scrollbar p-4 mb-2 space-y-2'>
            {activetab === "Chats" ? <ChatList /> : <ContactList />}
          </div>
        </div>

        {/* Right Side */}
        <div
          className={`
        flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm
        ${selecteduser ? "flex" : "hidden md:flex"}
      `}
        >
          {selecteduser ? (
            <ChatContainer />
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>

      </BorderAnimatedContainer>
    </div>
  )
}

export default Chat