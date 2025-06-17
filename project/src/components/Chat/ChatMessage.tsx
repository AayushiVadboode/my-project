import React from 'react';
import { Message } from '../../types';
import { Bot, User, Heart, Wind, Quote, Activity } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isTyping }) => {
  const isUser = message.sender === 'user';

  const getTypeIcon = (type?: Message['type']) => {
    switch (type) {
      case 'tip':
        return <Heart className="w-4 h-4" />;
      case 'exercise':
        return <Wind className="w-4 h-4" />;
      case 'quote':
        return <Quote className="w-4 h-4" />;
      case 'activity':
        return <Activity className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const formatMessageText = (text: string) => {
    // Convert markdown-style formatting to HTML
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
    
    return { __html: formatted };
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
              : 'bg-gradient-to-br from-green-500 to-teal-600'
          }`}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>
        </div>

        {/* Message Bubble */}
        <div className={`relative px-4 py-3 rounded-2xl shadow-sm ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md'
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
        }`}>
          {/* Message Type Indicator */}
          {!isUser && message.type && (
            <div className="flex items-center mb-2 text-gray-500">
              {getTypeIcon(message.type)}
              <span className="ml-1 text-xs font-medium capitalize">{message.type}</span>
            </div>
          )}

          {/* Mood Indicator */}
          {message.mood && (
            <div className="mb-2">
              <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                isUser ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                Mood: {message.mood}
              </span>
            </div>
          )}

          {/* Message Content */}
          <div 
            className={`${isUser ? 'text-white' : 'text-gray-800'} leading-relaxed`}
            dangerouslySetInnerHTML={formatMessageText(message.text)}
          />

          {/* Timestamp */}
          <div className={`text-xs mt-2 opacity-70 ${
            isUser ? 'text-white' : 'text-gray-500'
          }`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center space-x-1 mt-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};