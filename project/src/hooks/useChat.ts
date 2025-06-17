import { useState, useEffect } from 'react';
import { Chat, Message, Mood } from '../types';
import { mentalHealthContent, moodResponses } from '../data/mentalHealthContent';

export const useChat = (userId?: string) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (userId) {
      const storedChats = localStorage.getItem('chats');
      const storedCurrentChatId = localStorage.getItem('currentChatId');
      
      if (storedChats) {
        const parsedChats = JSON.parse(storedChats);
        setChats(parsedChats);
      }
      
      if (storedCurrentChatId) {
        setCurrentChatId(storedCurrentChatId);
      }
    } else {
      setChats([]);
      setCurrentChatId(null);
    }
  }, [userId]);

  const saveChats = (updatedChats: Chat[]) => {
    if (userId) {
      localStorage.setItem('chats', JSON.stringify(updatedChats));
    }
  };

  const createNewChat = (): string => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setCurrentChatId(newChat.id);
    saveChats(updatedChats);
    localStorage.setItem('currentChatId', newChat.id);

    return newChat.id;
  };

  const sendMessage = async (text: string, mood?: Mood) => {
    if (!currentChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      mood
    };

    // Add user message
    const updatedChats = chats.map(chat => {
      if (chat.id === currentChatId) {
        const updatedMessages = [...chat.messages, userMessage];
        const title = chat.messages.length === 0 ? text.slice(0, 30) + (text.length > 30 ? '...' : '') : chat.title;
        return {
          ...chat,
          messages: updatedMessages,
          title,
          updatedAt: new Date()
        };
      }
      return chat;
    });

    setChats(updatedChats);
    saveChats(updatedChats);
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(text, mood);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        type: aiResponse.type
      };

      const finalChats = updatedChats.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [...chat.messages, aiMessage],
            updatedAt: new Date()
          };
        }
        return chat;
      });

      setChats(finalChats);
      saveChats(finalChats);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Simulate AI thinking time
  };

  const generateAIResponse = (userText: string, mood?: Mood): { text: string; type: Message['type'] } => {
    const lowerText = userText.toLowerCase();

    // Check for specific requests
    if (lowerText.includes('breathing') || lowerText.includes('breath')) {
      const exercise = mentalHealthContent.exercises[Math.floor(Math.random() * mentalHealthContent.exercises.length)];
      return {
        text: `I'd recommend trying the **${exercise.name}** breathing technique:\n\n${exercise.description}\n\n**Steps:**\n${exercise.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\nWould you like me to guide you through this exercise?`,
        type: 'exercise'
      };
    }

    if (lowerText.includes('quote') || lowerText.includes('motivation')) {
      const quote = mentalHealthContent.quotes[Math.floor(Math.random() * mentalHealthContent.quotes.length)];
      return {
        text: `Here's a meaningful quote for you:\n\n*"${quote}"*\n\nRemember, you have the strength within you to overcome any challenge. How does this resonate with you?`,
        type: 'quote'
      };
    }

    if (lowerText.includes('activity') || lowerText.includes('what should i do')) {
      const activity = mentalHealthContent.activities[Math.floor(Math.random() * mentalHealthContent.activities.length)];
      return {
        text: `Here's a helpful activity you might try:\n\n${activity}\n\nThis can help you feel more grounded and present. Would you like another suggestion?`,
        type: 'activity'
      };
    }

    // Mood-based responses
    if (mood && moodResponses[mood]) {
      const moodData = moodResponses[mood];
      const tip = mentalHealthContent.tips[Math.floor(Math.random() * mentalHealthContent.tips.length)];
      const suggestion = moodData.suggestions[Math.floor(Math.random() * moodData.suggestions.length)];
      
      return {
        text: `${moodData.greeting}\n\nHere's a personalized tip for you: ${tip}\n\n**Suggestion:** ${suggestion}\n\nHow can I support you further today?`,
        type: 'tip'
      };
    }

    // General supportive responses
    const supportiveResponses = [
      "I hear you, and I want you to know that your feelings are valid. It takes courage to reach out and share what you're going through.",
      "Thank you for sharing that with me. Remember that seeking support is a sign of strength, not weakness.",
      "I'm here to listen and support you. Everyone goes through difficult times, and you don't have to face this alone.",
      "It sounds like you're dealing with a lot right now. Let's work together to find some strategies that might help.",
      "Your mental health matters, and I'm glad you're taking steps to care for yourself. How are you feeling in this moment?"
    ];

    const response = supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)];
    const tip = mentalHealthContent.tips[Math.floor(Math.random() * mentalHealthContent.tips.length)];

    return {
      text: `${response}\n\nHere's something that might help: ${tip}\n\nWould you like me to suggest a breathing exercise or share a motivational quote?`,
      type: 'tip'
    };
  };

  const deleteChat = (chatId: string) => {
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    saveChats(updatedChats);

    if (currentChatId === chatId) {
      const newCurrentChat = updatedChats[0]?.id || null;
      setCurrentChatId(newCurrentChat);
      if (newCurrentChat) {
        localStorage.setItem('currentChatId', newCurrentChat);
      } else {
        localStorage.removeItem('currentChatId');
      }
    }
  };

  const currentChat = chats.find(chat => chat.id === currentChatId);

  return {
    chats,
    currentChat,
    currentChatId,
    isTyping,
    createNewChat,
    sendMessage,
    deleteChat,
    setCurrentChatId: (id: string) => {
      setCurrentChatId(id);
      localStorage.setItem('currentChatId', id);
    }
  };
};