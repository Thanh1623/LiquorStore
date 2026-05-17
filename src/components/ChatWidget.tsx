'use client';
import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, User } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export function ChatWidget() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; sender: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('chat_session_id');
    if (stored) {
      setSessionId(stored);
    } else {
      const newId = `web_${Date.now()}`;
      localStorage.setItem('chat_session_id', newId);
      setSessionId(newId);
    }
  }, []);

  const { refetch } = useQuery({
    queryKey: ['web-chat', sessionId],
    queryFn: async () => {
      if (!sessionId) return [];
      const res = await axios.get(`/api/admin/chat/messages?sessionId=${sessionId}`);
      setMessages(res.data.data);
      return res.data.data;
    },
    enabled: isOpen && !!sessionId,
    refetchInterval: 3000
  });

  const sendMessage = async () => {
    if (!input.trim()) return;
    await axios.post('/api/chat/user', { sessionId, message: input });
    setInput('');
    refetch();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-yellow-600 p-4 rounded-full text-white shadow-2xl hover:bg-yellow-700 transition-all transform hover:scale-105"
        >
          <MessageSquare size={24} />
        </button>
      )}
      
      {isOpen && (
        <div className="w-80 h-[500px] bg-slate-950 shadow-2xl rounded-2xl flex flex-col border border-slate-800 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex justify-between items-center border-b border-slate-800">
            <span className="font-serif text-yellow-600 tracking-widest">LuxeSupport</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition">
              <X size={20}/>
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'admin' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.sender === 'admin' ? 'bg-slate-800 text-slate-200 rounded-bl-none' : 'bg-yellow-600 text-white rounded-br-none'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input Area */}
          <div className="p-3 border-t border-slate-800 bg-slate-900">
            <div className="flex gap-2">
              <input 
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:border-yellow-600 transition-colors"
                placeholder="Message LuxeSupport..."
                value={input} 
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button 
                className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-xl transition-colors" 
                onClick={sendMessage}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
