
import React, { useState, useRef, useEffect } from 'react';
import { Message, ChatState } from '../types';
import { getChatResponse } from '../services/geminiService';

const SUGGESTED_PROMPTS = [
  "What therapy types do you have?",
  "How much are the sessions?",
  "Tell me about the counselors",
  "Is the environment friendly?"
];

export const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hi there! I'm Maya. I'm so glad you reached out to HealthyMind today. How can I support you in finding the right care for your journey?",
        timestamp: new Date()
      }
    ],
    isLoading: false,
    error: null
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatState.messages, chatState.isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || chatState.isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg],
      isLoading: true,
      error: null
    }));
    setInput('');

    try {
      const { text: aiResponse, sources } = await getChatResponse(text, chatState.messages);
      
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
        sources
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMsg],
        isLoading: false
      }));
    } catch (err: any) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: err.message || "I'm having a bit of trouble answering. Mind trying again?"
      }));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-rose-100/50">
      {/* Humanized Chat Header */}
      <div className="px-6 py-4 bg-white border-b border-rose-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-rose-100 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150" 
                alt="Maya" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="text-rose-950 font-bold text-sm leading-tight">Maya</h3>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] text-rose-400 font-semibold uppercase tracking-wider">Online Now</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
           <button className="p-2 text-rose-300 hover:text-rose-500 transition-colors"><i className="fas fa-phone-alt"></i></button>
           <button className="p-2 text-rose-300 hover:text-rose-500 transition-colors"><i className="fas fa-ellipsis-h"></i></button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-[#fffafa]/30"
      >
        {chatState.messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-rose-100 hidden md:block">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className={`max-w-[85%] md:max-w-[75%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-rose-600 text-white rounded-br-none shadow-lg shadow-rose-100' 
                  : 'bg-white text-gray-800 border border-rose-100 rounded-bl-none shadow-sm'
              }`}>
                <p className="text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-rose-50">
                    <p className="text-[11px] font-bold text-rose-700 mb-2 flex items-center italic">
                      <i className="fas fa-link mr-1.5"></i> Useful Resources:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {msg.sources.map((source, idx) => (
                        <a 
                          key={idx} 
                          href={source.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-rose-50/50 text-rose-600 px-3 py-1.5 rounded-lg border border-rose-100 hover:bg-rose-100 transition-all text-[11px] font-semibold flex items-center"
                        >
                          {source.title} <i className="fas fa-external-link-alt ml-1.5 opacity-50"></i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-rose-300 mt-2 uppercase tracking-widest font-bold px-1">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {chatState.isLoading && (
          <div className="flex justify-start items-end space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-rose-100 hidden md:block">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-none shadow-sm border border-rose-100 flex items-center space-x-1.5">
              <span className="text-[11px] text-rose-400 font-bold mr-1 italic">Maya is typing</span>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-rose-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {chatState.error && (
          <div className="flex justify-center">
            <div className="bg-white text-rose-600 px-6 py-3 rounded-2xl text-sm border border-rose-100 shadow-sm font-semibold flex items-center">
              <i className="fas fa-heart-crack mr-3 text-lg"></i>
              {chatState.error}
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      {!chatState.isLoading && (
        <div className="px-6 py-4 bg-white/80 backdrop-blur-sm flex flex-wrap gap-2 border-t border-rose-50/50">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-xs font-semibold bg-white text-rose-600 px-4 py-2.5 rounded-xl border border-rose-100 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 shadow-sm hover:shadow-rose-100 active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-rose-50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Maya..."
            className="w-full pl-6 pr-16 py-4.5 bg-rose-50/30 border border-rose-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-200 focus:bg-white transition-all text-gray-800 placeholder-rose-200"
          />
          <button
            type="submit"
            disabled={!input.trim() || chatState.isLoading}
            className={`absolute right-3 p-3 rounded-xl transition-all ${
              !input.trim() || chatState.isLoading 
                ? 'text-rose-200 cursor-not-allowed' 
                : 'text-rose-600 hover:bg-rose-50 active:scale-90 shadow-sm'
            }`}
          >
            <i className="fas fa-paper-plane text-xl"></i>
          </button>
        </form>
        <div className="flex items-center justify-center space-x-2 mt-4">
           <span className="w-1 h-1 bg-rose-200 rounded-full"></span>
           <p className="text-[10px] text-rose-300 font-bold uppercase tracking-widest">
             Compassionate Care & Professional Support
           </p>
           <span className="w-1 h-1 bg-rose-200 rounded-full"></span>
        </div>
      </div>
    </div>
  );
};
