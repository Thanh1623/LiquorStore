'use client';
import { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';

export function ChatWidget() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ id: string; sender: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [sessionId] = useState(() => `web_${Date.now()}`); // Simple session ID

  const { refetch } = useQuery({
    queryKey: ['web-chat', sessionId],
    queryFn: async () => {
      const res = await axios.get(`/api/admin/chat/messages?sessionId=${sessionId}`);
      setMessages(res.data.data);
      return res.data.data;
    },
    enabled: isOpen,
    refetchInterval: 3000 // Polling for new messages
  });

  const sendMessage = async () => {
    if (!input.trim()) return;
    await axios.post('/api/chat/user', { sessionId, message: input });
    setInput('');
    refetch();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-yellow-600 p-4 rounded-full text-white shadow-lg hover:bg-yellow-700 transition"
        >
          <MessageSquare />
        </button>
      )}
      {isOpen && (
        <div className="w-80 h-96 bg-white shadow-2xl rounded-lg flex flex-col border">
          <div className="p-4 bg-slate-950 text-white flex justify-between items-center">
            <span>Support</span>
            <button onClick={() => setIsOpen(false)}><X size={20}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map(m => (
              <div key={m.id} className={`p-2 rounded ${m.sender === 'admin' ? 'bg-gray-200' : 'bg-yellow-100 text-right'}`}>
                {m.content}
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex gap-2">
            <input className="flex-1 border p-2" value={input} onChange={e => setInput(e.target.value)} />
            <button onClick={sendMessage}><Send size={20}/></button>
          </div>
        </div>
      )}
    </div>
  );
}
