'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { Send, User, Loader2, ArrowLeft } from 'lucide-react';

type ChatSession = { id: string; senderId: string; lastMessage: string };

export default function ChatPage() {
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  const { data: sessions, isLoading } = useQuery({
    queryKey: ['chat-sessions'],
    queryFn: async () => {
      const res = await axios.get('/api/admin/chat/sessions');
      return res.data.data as ChatSession[];
    }
  });

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sessions List */}
      <div className="w-80 border-r border-slate-800 flex flex-col bg-slate-950">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <Link href="/admin" className="text-slate-500 hover:text-yellow-600 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-serif text-yellow-600 tracking-wider">Conversations</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 flex justify-center"><Loader2 className="animate-spin text-yellow-600" /></div>
          ) : (
            sessions?.map(s => (
              <div 
                key={s.id} 
                className={`p-5 cursor-pointer border-b border-slate-900 transition-all ${selectedSessionId === s.id ? 'bg-slate-900 border-l-4 border-l-yellow-600' : 'hover:bg-slate-900'}`}
                onClick={() => setSelectedSessionId(s.id)}
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-yellow-600">
                    <User size={16} />
                  </div>
                  <div className="font-medium text-slate-200 text-sm tracking-wide truncate">{s.senderId}</div>
                </div>
                <div className="text-xs text-slate-500 truncate ml-11">{s.lastMessage || 'No messages yet'}</div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-950">
        {selectedSessionId ? (
          <ChatDetail sessionId={selectedSessionId} />
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-600 font-light italic">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}

function ChatDetail({ sessionId }: { sessionId: string }) {
  const { data: messages, refetch } = useQuery({
    queryKey: ['chat-messages', sessionId],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/chat/messages?sessionId=${sessionId}`);
      return res.data.data as { id: string; sender: string; content: string }[];
    }
  });
  
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  
  const handleReply = async () => {
    if (!reply.trim()) return;
    setSending(true);
    await axios.post('/api/admin/chat/reply', { sessionId, message: reply });
    setReply('');
    setSending(false);
    refetch();
  };

  return (
    <>
      {/* Chat Header */}
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-yellow-600/10 flex items-center justify-center text-yellow-600">
          <User size={20} />
        </div>
        <h2 className="font-medium text-slate-200">Customer Support</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages?.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${m.sender === 'admin' ? 'bg-yellow-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex gap-2">
          <input 
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-yellow-600 transition-colors"
            placeholder="Type your reply..."
            value={reply} 
            onChange={e => setReply(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleReply()}
          />
          <button 
            className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50" 
            onClick={handleReply}
            disabled={sending}
          >
            {sending ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </>
  );
}
