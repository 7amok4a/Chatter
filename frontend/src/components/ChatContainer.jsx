import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import { LoaderIcon } from "lucide-react";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  

  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser, getMessagesByUserId, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  const getImageUrl = (imagePath) => {
 
    if (imagePath && imagePath.startsWith('blob:')) {
      return imagePath;
    }
    console.log(`${import.meta.env.VITE_API_BASE_URL}/${imagePath}`) ; 
    return `http://localhost:3000/${imagePath}` ; 
};

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  } ${msg.isOptimistic ? 'opacity-70' : ''}`}
                >
                  {msg.image && (
                    <div className="relative">
                     
                      {imageLoading[msg._id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-lg">
                          <LoaderIcon className="w-6 h-6 animate-spin text-cyan-400" />
                        </div>
                      )}
                      
                      
                      <img
                        src={getImageUrl(msg.image)}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover"
                        onLoadStart={() => setImageLoading(prev => ({ ...prev, [msg._id]: true }))}
                        onLoad={() => setImageLoading(prev => ({ ...prev, [msg._id]: false }))}
                        onError={(e) => {
                          setImageLoading(prev => ({ ...prev, [msg._id]: false }));
                          e.target.src = '/image-placeholder.png'; 
                        }}
                      />
                    </div>
                  )}
                  
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    
                    {msg.isOptimistic && (
                      <span className="text-xs opacity-50">• Sending...</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;