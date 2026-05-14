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

  const { activetab,selecteduser } = usechatstore();

  return (
    <div className='relative w-full max-w-6xl h-[800px]'>
      <BorderAnimatedContainer>
        {/*left side*/}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
          <ProfilHeader />
          <ActiveTabSwitch />

          <div className='flex-1 overflow-y-auto h-screen hide-scrollbar p-4 space-y-2'>
            {activetab === "Chats" ? <ChatList /> :
              <ContactList />}
          </div>
        </div>
        {/* right side */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
        {selecteduser ? <ChatContainer/>
        :<NoConversationPlaceholder/>}
        </div>
      </BorderAnimatedContainer>
    </div>
  )
}

export default Chat