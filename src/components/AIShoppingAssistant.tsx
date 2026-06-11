import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, RefreshCw, MessageCircle, Info } from 'lucide-react';
import { Product, PRODUCTS } from '../data/products';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIShoppingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (id: string) => void;
  setActiveView: (view: string) => void;
}

export default function AIShoppingAssistant({
  isOpen,
  onClose,
  onProductClick,
  setActiveView
}: AIShoppingAssistantProps) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome to Fashionbar's Atelier. I am your sophisticated AI Stylist. Allow me to recommend perfect drapes, style cocktails, or design heritage bridal capsules. \n\nTell me: What kind of look are you desiring today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // User message
    const userMsg: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Setup payload history mapped for endpoint
      const payloadHistory = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: payloadHistory
        })
      });

      const data = await res.json();
      
      if (res.ok && data.text) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.text,
          timestamp: new Date()
        }]);
      } else {
        throw new Error(data.error || "Styling engine offline");
      }
    } catch (e: any) {
      console.error(e);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I apologize, the Atelier styling engines are currently undergoing deep curation. Please feel free to browse our magnificent [PRODUCT:trad-saree-1] or [PRODUCT:acc-jewelry-1] in the meantime!",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Helper to parse text for product blocks e.g. [PRODUCT:trad-saree-1]
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\[PRODUCT:[a-zA-Z0-9_-]+\])/g);
    
    return (
      <div className="space-y-3">
        <p className="whitespace-pre-line text-xs leading-relaxed font-sans">
          {parts.map((part, i) => {
            const isProductMatch = part.match(/\[PRODUCT:([a-zA-Z0-9_-]+)\]/);
            if (isProductMatch) {
              const prodId = isProductMatch[1];
              const product = PRODUCTS.find(p => p.id === prodId);
              if (product) {
                return (
                  <button
                    key={i}
                    onClick={() => {
                      onProductClick(product.id);
                      setActiveView('detail');
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 bg-gold/15 text-gold-dark hover:bg-gold hover:text-luxury-black font-semibold rounded px-1.5 py-0.5 my-0.5 border border-gold/30 transition-all text-left text-[11px]"
                    title={`View ${product.name}`}
                  >
                    ✨ {product.name} (${product.price})
                  </button>
                );
              }
              return part;
            }
            return part;
          })}
        </p>

        {/* Check if any active products are embedded to render matching preview cards */}
        {parts.map((part, index) => {
          const match = part.match(/\[PRODUCT:([a-zA-Z0-9_-]+)\]/);
          if (match) {
            const prodId = match[1];
            const product = PRODUCTS.find(p => p.id === prodId);
            if (product) {
              return (
                <div 
                  key={`card-${index}`} 
                  onClick={() => {
                    onProductClick(product.id);
                    setActiveView('detail');
                    onClose();
                  }}
                  className="flex gap-3 bg-[#161616] p-2.5 rounded-xl border border-white/10 hover:border-gold shadow-sm cursor-pointer transition-all hover:-translate-y-0.5 mt-2 overflow-hidden group"
                >
                  <img src={product.images[0]} alt={product.name} className="w-12 h-16 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[11px] font-bold text-white group-hover:text-gold transition truncate">{product.name}</h4>
                      <p className="text-[10px] text-white/50 capitalize">{product.fabric || product.material}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] font-bold text-white">${product.price}</span>
                      <span className="text-[9px] font-bold text-gold tracking-widest uppercase group-hover:underline">View Spec</span>
                    </div>
                  </div>
                </div>
              );
            }
          }
          return null;
        })}
      </div>
    );
  };  return (
    <div className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm z-53 flex justify-end animate-fadeIn">
      
      {/* Side Panel Drawer Frame */}
      <div 
        className="w-full max-w-md bg-[#111111] h-full flex flex-col border-l border-white/10 shadow-2xl relative overflow-hidden animate-slideLeft"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Glamour Header design with Gold sparkles */}
        <div className="bg-[#0c0c0c] text-white p-5 border-b border-white/10 flex justify-between items-center relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(212,175,55,0.08)_0%,transparent_50%)] pointer-events-none"></div>
          <div className="flex items-center gap-2.5 z-10">
            <div className="h-9 w-9 rounded-full bg-gold/15 border border-gold/50 flex items-center justify-center text-gold animate-pulse">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="font-serif text-sm font-bold tracking-widest uppercase text-white">Atelier AI Stylist</h2>
              <p className="text-[10px] text-gold tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span> Live Grounding Enabled
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 h-8 w-8 rounded-full bg-white/5 hover:bg-gold hover:text-luxury-black transition text-gray-400 z-10 flex items-center justify-center"
          >
            <X size={16} />
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-gold-cream border-b border-white/10 py-2 px-4 flex items-center gap-2 text-[10px] text-gold font-sans font-medium">
          <Info size={12} className="flex-shrink-0" />
          <span>Ask me for holiday looks, jewelry co-ordinates, or sizing!</span>
        </div>

        {/* Message Container Flow */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-4"
        >
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex gap-2.5 max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {/* Profile Orb */}
              <div className={`h-7 w-7 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] border ${
                m.role === 'user' 
                  ? 'bg-neutral-800 text-white border-neutral-700' 
                  : 'bg-gold/10 text-gold border-gold/30'
              }`}>
                {m.role === 'user' ? <User size={13} /> : <Sparkles size={13} />}
              </div>

              {/* Text Bubble */}
              <div className={`p-3.5 rounded-2xl ${
                m.role === 'user'
                  ? 'bg-gold-dark text-white rounded-tr-none'
                  : 'bg-[#1a1a1a] text-white border border-white/10 rounded-tl-none shadow-sm'
              }`}>
                {m.role === 'user' ? (
                  <p className="text-xs leading-relaxed whitespace-pre-wrap font-sans">{m.content}</p>
                ) : (
                  renderMessageContent(m.content)
                )}
                <span className="text-[8px] text-white/40 block text-right mt-1.5">
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Typing State Loader */}
          {isTyping && (
            <div className="flex gap-2.5 max-w-[80%]">
              <div className="h-7 w-7 rounded-full bg-gold/10 text-gold border border-gold/30 flex items-center justify-center">
                <Sparkles size={12} className="animate-spin" />
              </div>
              <div className="bg-[#1a1a1a] border border-white/10 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-1.5 py-4 px-5">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-150"></span>
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-300"></span>
              </div>
            </div>
          )}
        </div>

        {/* Conversational Starter suggestion taps */}
        <div className="p-3 bg-[#111111] border-t border-white/10">
          <p className="text-[9px] font-bold text-gold tracking-widest uppercase mb-1.5 px-1">Stylist Recommendations:</p>
          <div className="flex flex-wrap gap-1.5">
            <button 
              onClick={() => handleQuickPrompt("What matches well with the Monaco Pleated Silk Dress?")}
              className="px-2.5 py-1 text-[10px] font-sans font-medium rounded-full bg-[#1e1e1e] border border-white/10 hover:border-gold transition-colors text-white/80 hover:text-white"
            >
              👗 Monaco Style Match
            </button>
            <button 
              onClick={() => handleQuickPrompt("Show me some royal Varanasi sarees for weddings.")}
              className="px-2.5 py-1 text-[10px] font-sans font-medium rounded-full bg-[#1e1e1e] border border-white/10 hover:border-gold transition-colors text-white/80 hover:text-white"
            >
              🌸 Royal Varanasi Sarees
            </button>
            <button 
              onClick={() => handleQuickPrompt("I need lifestyle gifting ideas.")}
              className="px-2.5 py-1 text-[10px] font-sans font-medium rounded-full bg-[#1e1e1e] border border-white/10 hover:border-gold transition-colors text-white/80 hover:text-white"
            >
              🕯️ Gifting Ideas
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#141414] border-t border-white/10 flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your design question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="flex-1 bg-[#1a1a1a] border border-white/10 text-white placeholder-white/30 rounded-xl py-2 px-4 text-xs font-sans focus:outline-none focus:border-gold"
            disabled={isTyping}
            id="assistant-chat-input"
          />
          <button 
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="h-9 w-9 bg-gold hover:bg-gold-dark text-black rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
