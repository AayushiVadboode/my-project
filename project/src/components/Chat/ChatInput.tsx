import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';
import { Mood } from '../../types';

interface ChatInputProps {
  onSendMessage: (message: string, mood?: Mood) => void;
  disabled?: boolean;
}

const moods: { value: Mood; emoji: string; color: string }[] = [
  { value: 'happy', emoji: '😊', color: 'bg-yellow-500' },
  { value: 'sad', emoji: '😢', color: 'bg-blue-500' },
  { value: 'anxious', emoji: '😰', color: 'bg-orange-500' },
  { value: 'stressed', emoji: '😤', color: 'bg-red-500' },
  { value: 'calm', emoji: '😌', color: 'bg-green-500' },
  { value: 'excited', emoji: '🤗', color: 'bg-purple-500' },
  { value: 'angry', emoji: '😠', color: 'bg-red-600' },
  { value: 'neutral', emoji: '😐', color: 'bg-gray-500' },
];

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>();
  const [showMoods, setShowMoods] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), selectedMood);
      setMessage('');
      setSelectedMood(undefined);
      setShowMoods(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      {/* Mood Selector */}
      {showMoods && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">How are you feeling?</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <button
                key={mood.value}
                onClick={() => {
                  setSelectedMood(selectedMood === mood.value ? undefined : mood.value);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedMood === mood.value
                    ? `${mood.color} text-white shadow-lg transform scale-105`
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{mood.emoji}</span>
                <span className="capitalize">{mood.value}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Mood Display */}
      {selectedMood && !showMoods && (
        <div className="mb-2 flex items-center space-x-2">
          <span className="text-sm text-gray-600">Mood:</span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            moods.find(m => m.value === selectedMood)?.color || 'bg-gray-500'
          } text-white`}>
            <span>{moods.find(m => m.value === selectedMood)?.emoji}</span>
            <span className="capitalize">{selectedMood}</span>
          </div>
          <button
            onClick={() => setSelectedMood(undefined)}
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        <div className="flex-1">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '50px', maxHeight: '120px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 120) + 'px';
            }}
          />
        </div>

        <button
          type="button"
          onClick={() => setShowMoods(!showMoods)}
          className={`p-3 rounded-full transition-all duration-200 ${
            showMoods || selectedMood
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          disabled={disabled}
        >
          <Smile className="w-5 h-5" />
        </button>

        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 disabled:transform-none"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};