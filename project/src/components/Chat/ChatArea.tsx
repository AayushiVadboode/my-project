import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { BreathingExercise } from './BreathingExercise';
import { Chat, Mood } from '../../types';
import { Brain, Sparkles } from 'lucide-react';
import { mentalHealthContent } from '../../data/mentalHealthContent';

interface ChatAreaProps {
  chat: Chat | undefined;
  isTyping: boolean;
  onSendMessage: (message: string, mood?: Mood) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, isTyping, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages, isTyping]);

  const getRandomExercise = () => {
    return mentalHealthContent.exercises[Math.floor(Math.random() * mentalHealthContent.exercises.length)];
  };

  if (!chat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Mental Health Companion</h2>
          <p className="text-gray-600 mb-8">I'm here to support your mental wellness journey. Share your thoughts, feelings, or ask for guidance anytime.</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Sparkles className="w-6 h-6 text-blue-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Personalized Tips</h3>
              <p className="text-gray-600">Get mental health advice based on your mood</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <Brain className="w-6 h-6 text-purple-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Breathing Exercises</h3>
              <p className="text-gray-600">Guided breathing sessions to reduce stress</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-blue-50/30 to-purple-50/30">
        <div className="max-w-4xl mx-auto">
          {chat.messages.map((message) => (
            <div key={message.id}>
              <ChatMessage message={message} />
              
              {/* Show breathing exercise for exercise type messages */}
              {message.sender === 'ai' && message.type === 'exercise' && (
                <div className="mb-6">
                  <BreathingExercise exercise={getRandomExercise()} />
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <ChatMessage 
              message={{
                id: 'typing',
                text: '',
                sender: 'ai',
                timestamp: new Date()
              }} 
              isTyping={true}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={onSendMessage} disabled={isTyping} />
    </div>
  );
};