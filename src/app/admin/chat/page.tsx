'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type ChatSession = { id: string; senderId: string; lastMessage: string };

export default function ChatPage() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const { data: sessions } = useQuery({
    queryKey: ['chat-sessions'],
    queryFn: async () => {
      const res = await axios.get('/api/admin/chat/sessions');
      return res.data.data as ChatSession[];
    }
  });

  return (
    <div className="flex h-screen">
      {/* Sessions List */}
      <div className="w-1/3 border-r p-4">
        <h1 className="text-xl font-bold mb-4">Conversations</h1>
        {sessions?.map(s => (
          <div 
            key={s.id} 
            className={`p-3 cursor-pointer border-b ${selectedSessionId === s.id ? 'bg-gray-100' : ''}`}
            onClick={() => setSelectedSessionId(s.id)}
          >
            <div className="font-semibold">{s.senderId}</div>
            <div className="text-sm text-gray-500 truncate">{s.lastMessage}</div>
          </div>
        ))}
      </div>
      
      {/* Chat Area */}
      <div className="w-2/3 p-4">
        {selectedSessionId ? (
          <ChatDetail sessionId={selectedSessionId} />
        ) : (
          <div>Select a conversation</div>
        )}
      </div>
    </div>
  );
}

function ChatDetail({ sessionId }: { sessionId: string }) {
  const { data: messages } = useQuery({
    queryKey: ['chat-messages', sessionId],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/chat/messages?sessionId=${sessionId}`);
      return res.data.data as { id: string; sender: string; content: string }[];
    }
  });
  
  // Basic reply logic
  const [reply, setReply] = useState('');
  
  const handleReply = async () => {
    await axios.post('/api/admin/chat/reply', { sessionId, message: reply });
    setReply('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages?.map(m => (
          <div key={m.id} className={`mb-2 ${m.sender === 'admin' ? 'text-right' : 'text-left'}`}>
            <span className={`p-2 rounded ${m.sender === 'admin' ? 'bg-blue-100' : 'bg-gray-200'}`}>
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input 
          className="flex-1 border p-2" 
          value={reply} 
          onChange={e => setReply(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2" onClick={handleReply}>Send</button>
      </div>
    </div>
  );
}
