import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder';
import { usechatstore } from '../store/usechatstore';
import { useauthstore } from '../store/useauthstore';
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton';
import MessageInput from './MessageInput';

const ChatContainer = () => {
  const { message, selecteduser, getmessage, ismessageloading, socketmessage, unsocketmessage} = usechatstore();
  const { authuser } = useauthstore();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selecteduser?._id) {
      getmessage(selecteduser._id);
      socketmessage();
       return ()=> unsocketmessage();
    }
  }, [selecteduser,socketmessage,unsocketmessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="flex flex-col h-full max-h-full">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-4">
        {ismessageloading ? (
          <MessagesLoadingSkeleton />
        ) : message.length === 0 ? (
          <NoChatHistoryPlaceholder name={selecteduser?.name} />
        ) : (
          message.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${msg.senderid === selecteduser._id.toString()
                ? "chat-start"
                : "chat-end"
                }`}
            >
              <div
                className={`max-w-[80%] sm:max-w-xs px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl shadow-md text-sm ${msg.senderid === selecteduser._id.toString()
                  ? "bg-slate-700 text-white"
                  : "bg-indigo-500 text-white"
                  }`}
              >
                {msg.text && <p className="whitespace-pre-wrap">{msg.text}</p>}
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="message"
                    className="mt-1.5 rounded-lg max-w-full"
                  />
                )}
                <p className="text-[10px] text-gray-300 text-right mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} className="h-px" />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;