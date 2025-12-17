import React, { useState, useEffect, useRef } from 'react';
import { Meal, ChefMode } from '../types';
import { askChefGemini } from '../services/ai';
import { Sparkles, Utensils, Wine, Lightbulb, Send, Bot, X, ChefHat } from 'lucide-react';

interface ChefAssistantProps {
  meal: Meal;
  isOpen: boolean;
  onClose: () => void;
}

const ChefAssistant: React.FC<ChefAssistantProps> = ({ meal, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset state when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
       // Initial greeting is handled by the UI empty state
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleAsk = async (mode: ChefMode, query?: string) => {
    setLoading(true);
    
    // Add user message to UI for better chat feel
    let userMsg = '';
    switch(mode) {
        case ChefMode.Nutrition: userMsg = "Show me nutrition facts."; break;
        case ChefMode.Pairing: userMsg = "What should I drink with this?"; break;
        case ChefMode.Tips: userMsg = "Give me some pro cooking tips."; break;
        case ChefMode.Chat: userMsg = query || ""; break;
    }
    
    if (userMsg) {
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    }

    try {
      const result = await askChefGemini(meal, mode, query);
      setMessages(prev => [...prev, { role: 'ai', content: result }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "I'm having a bit of trouble connecting to the kitchen server. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleAsk(ChefMode.Chat, input);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-scale-in border border-gray-100 dark:border-gray-800">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex justify-between items-center shadow-lg z-10">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm border border-white/20">
              <Sparkles className="text-yellow-300 animate-pulse" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif tracking-wide">Chef Gemini</h3>
              <p className="text-indigo-100 text-xs font-medium opacity-80">AI Culinary Expert • Online</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-950/50" ref={scrollRef}>
          
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="text-center space-y-6 py-8 animate-slide-up">
                <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat size={40} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Hi! I'm your AI Sous-Chef.
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-sm">
                    Ask me anything about <strong>{meal.strMeal}</strong> or choose a topic below to get started.
                </p>

                <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
                    <button
                        onClick={() => handleAsk(ChefMode.Nutrition)}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:shadow-lg transition-all text-left group"
                    >
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2.5 rounded-xl">
                            <Utensils size={20} />
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white block group-hover:text-indigo-600 transition-colors">Nutrition</span>
                            <span className="text-xs text-gray-500">Macros & calories</span>
                        </div>
                    </button>
                    
                    <button
                        onClick={() => handleAsk(ChefMode.Pairing)}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:shadow-lg transition-all text-left group"
                    >
                        <div className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 p-2.5 rounded-xl">
                            <Wine size={20} />
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white block group-hover:text-indigo-600 transition-colors">Pairings</span>
                            <span className="text-xs text-gray-500">Wine & drinks</span>
                        </div>
                    </button>

                    <button
                        onClick={() => handleAsk(ChefMode.Tips)}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-indigo-500 hover:shadow-lg transition-all text-left group"
                    >
                        <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-2.5 rounded-xl">
                            <Lightbulb size={20} />
                        </div>
                        <div>
                            <span className="font-bold text-gray-900 dark:text-white block group-hover:text-indigo-600 transition-colors">Pro Tips</span>
                            <span className="text-xs text-gray-500">Cooking hacks</span>
                        </div>
                    </button>
                </div>
            </div>
          )}

          {/* Chat Messages */}
          {messages.map((msg, idx) => (
             <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up-fade`}>
                 {msg.role === 'ai' && (
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 mr-3 mt-1 shadow-md">
                         <Bot size={16} />
                     </div>
                 )}
                 <div className={`
                    max-w-[80%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed
                    ${msg.role === 'user' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}
                 `}>
                     <div className="whitespace-pre-line">{msg.content}</div>
                 </div>
             </div>
          ))}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex justify-start animate-slide-up-fade">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 mr-3 mt-1">
                   <Bot size={16} />
               </div>
               <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-1.5 items-center h-12">
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                   <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
               </div>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
          <form onSubmit={handleCustomQuery} className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a specific question..."
              className="flex-1 bg-gray-100 dark:bg-gray-800 border-transparent rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all pr-14"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all flex items-center justify-center shadow-lg shadow-indigo-500/30"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChefAssistant;