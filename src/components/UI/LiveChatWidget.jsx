import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon } from 'lucide-react';

/**
 * Live Chat Widget with AI Bot
 * Interactive chat with automated responses
 */
const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Show widget after page loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize with welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "👋 Hello! Welcome to Neverland Store!\n\nI'm your virtual assistant. I'm ready to help with:\n\n• Game top-ups\n• Promos & discounts\n• Payment methods\n• Transaction status\n\nHow can I help you today?"
        );
      }, 500);
    }
  }, [isOpen]);

  // Bot knowledge base
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Greeting
    if (msg.match(/^(hai|halo|hi|hello|hey)/)) {
      return "Hello! 👋 Happy to help you today. What can I do for you?";
    }

    // Top up related
    if (msg.includes('top up') || msg.includes('topup') || msg.includes('recharge') || msg.includes('how to')) {
      return "📱 Topping up at Neverland Store is super easy!\n\n1. Select the game you want to top up\n2. Enter your User ID/Player ID\n3. Choose the amount you want\n4. Select payment method\n5. Complete payment\n6. Diamonds/UC credited instantly!\n\nProcess takes only 1-5 minutes! ⚡\n\nWhich game would you like to top up?";
    }

    // Promo
    if (msg.includes('promo') || msg.includes('discount') || msg.includes('sale') || msg.includes('deal')) {
      return "🎉 Today's Promotions:\n\n⚡ FLASH SALE - Up to 30% off!\n💎 Buy 2 get 10% cashback\n🎁 First order? Use code: WELCOME10\n\nDon't miss out! Limited time offers! 🔥";
    }

    // Payment methods
    if (msg.includes('payment') || msg.includes('pay') || msg.includes('method') || msg.includes('how to pay')) {
      return "💳 Available payment methods:\n\n📱 E-Wallets:\n• GoPay, OVO, DANA, ShopeePay\n\n🏦 Bank Transfer:\n• BCA, Mandiri, BNI, BRI\n\n🛒 Retail:\n• Indomaret, Alfamart\n\nAll methods are safe & trusted! 🔒";
    }

    // Transaction status
    if (msg.includes('transaction') || msg.includes('order') || msg.includes('status') || msg.includes('check')) {
      return "📦 To check transaction status:\n\n1. Check your confirmation email\n2. View 'My Orders' page (if logged in)\n3. Or contact our CS with your order number\n\nProcess usually takes 1-5 minutes. If more than 10 minutes, please contact CS! 😊";
    }

    // Games
    if (msg.includes('game') || msg.includes('ml') || msg.includes('mobile legends') || msg.includes('pubg') || msg.includes('free fire')) {
      return "🎮 Available games:\n\n• Mobile Legends (ML)\n• PUBG Mobile\n• Free Fire\n• Genshin Impact\n• Valorant\n• Honkai Star Rail\n• And many more!\n\nAll games with cheapest prices & fastest process! 🚀";
    }

    // Contact
    if (msg.includes('cs') || msg.includes('admin') || msg.includes('customer service') || msg.includes('contact') || msg.includes('support')) {
      return "📞 Contact our Customer Service:\n\n💬 WhatsApp: +62 812-3456-7890\n📧 Email: support@neverlandstore.com\n⏰ Available 24/7\n\nOur CS team is ready to help anytime! 🙌";
    }

    // Problem
    if (msg.includes('problem') || msg.includes('issue') || msg.includes('error') || msg.includes('failed') || msg.includes('not received')) {
      return "😔 Sorry to hear you're having issues.\n\nFor quick resolution:\n\n1. Screenshot payment proof\n2. Note your order number\n3. Contact CS via WhatsApp: +62 812-3456-7890\n\nOur CS will help ASAP! 💪";
    }

    // Thank you
    if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx')) {
      return "You're welcome! 😊 Happy to help!\n\nIf you have any other questions, feel free to chat again! 💬";
    }

    // Default response
    return "Hmm, I'm not sure I understand your question. 🤔\n\nCould you explain in more detail? Or try asking:\n\n• How to top up\n• Today's promos\n• Payment methods\n• Available games\n\nOr contact our CS directly for personal assistance! 😊";
  };

  const addBotMessage = (text) => {
    const botMsg = {
      id: Date.now(),
      text,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const addUserMessage = (text) => {
    const userMsg = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
  };

  const handleSend = () => {
    if (!message.trim()) return;

    // Add user message
    addUserMessage(message);
    const userQuestion = message;
    setMessage('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate bot thinking and respond
    setTimeout(() => {
      setIsTyping(false);
      const response = getBotResponse(userQuestion);
      addBotMessage(response);
    }, 1000 + Math.random() * 1000); // Random delay 1-2s
  };

  // Quick reply buttons
  const quickReplies = [
    'How to top up?',
    'Today\'s promos',
    'Payment methods',
    'Available games'
  ];

  const handleQuickReply = (reply) => {
    setMessage(reply);
    setTimeout(() => handleSend(), 100);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-80 sm:w-96 bg-white rounded-3xl border-2 border-cyan-300 shadow-2xl shadow-cyan-400/20 z-[90] animate-scale-in flex flex-col max-h-[600px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-sky-500 p-4 rounded-t-3xl flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                    <Bot className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white">Neverland Assistant</h3>
                  <p className="text-xs text-cyan-100">🤖 AI Bot - Always Active</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in-up`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === 'bot' ? 'bg-cyan-100' : 'bg-sky-100'
                }`}>
                  {msg.sender === 'bot' ? (
                    <Bot className="w-4 h-4 text-cyan-600" />
                  ) : (
                    <UserIcon className="w-4 h-4 text-sky-600" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
                  <div className={`rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'bot'
                      ? 'bg-white border-2 border-gray-200 rounded-tl-none shadow-sm'
                      : 'bg-gradient-to-r from-cyan-500 to-sky-500 rounded-tr-none shadow-md'
                  }`}>
                    <p className={`text-sm whitespace-pre-line ${msg.sender === 'bot' ? 'text-gray-800' : 'text-white'}`}>{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 animate-fade-in">
                <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-cyan-600" />
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies (shown when no messages) */}
          {messages.length <= 1 && !isTyping && (
            <div className="px-4 pb-3 flex-shrink-0">
              <div className="grid grid-cols-2 gap-2">
                {quickReplies.map((reply, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs px-3 py-2 bg-white hover:bg-cyan-50 border-2 border-gray-200 hover:border-cyan-400 rounded-lg text-gray-700 hover:text-cyan-700 transition-all shadow-sm"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t-2 border-gray-200 flex-shrink-0 bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/40 flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💬 Powered by Neverland AI
            </p>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-16 h-16 bg-gradient-to-br from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-white rounded-full shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 flex items-center justify-center z-[100] transition-all duration-300 hover:scale-110 animate-bounce-subtle group"
        aria-label="Open live chat"
      >
        {isOpen ? (
          <X className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        )}
        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-emerald-500/50">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        )}

        {/* Ping Animation */}
        <div className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-20"></div>
      </button>

      {/* Tooltip */}
      {!isOpen && (
        <div className="fixed bottom-6 right-20 sm:right-24 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in z-[89] hidden sm:block">
          Need help? Chat with us! 💬
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-slate-900"></div>
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;
