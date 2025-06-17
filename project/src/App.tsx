import { useState } from 'react';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { ChatSidebar } from './components/Chat/ChatSidebar';
import { ChatArea } from './components/Chat/ChatArea';
import { useAuth } from './hooks/useAuth';
import { useChat } from './hooks/useChat';

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const { user, isLoading: authIsLoading, signIn, signUp, signOut } = useAuth();
  const { 
    chats, 
    currentChat, 
    currentChatId, 
    isTyping, 
    createNewChat, 
    sendMessage, 
    deleteChat, 
    setCurrentChatId 
  } = useChat(user?.id);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    setIsAuthLoading(true);
    try {
      const success = await signIn(email, password);
      return success;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignup = async (email: string, password: string, name: string): Promise<boolean> => {
    setIsAuthLoading(true);
    try {
      const success = await signUp(email, password, name);
      return success;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleNewChat = () => {
    createNewChat();
  };

  const handleSendMessage = (message: string, mood?: any) => {
    if (!currentChatId) {
      createNewChat();
      // The message will be sent after the chat is created
      setTimeout(() => sendMessage(message, mood), 100);
    } else {
      sendMessage(message, mood);
    }
  };

  if (authIsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your mental health companion...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {authMode === 'login' ? (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToSignup={() => setAuthMode('signup')}
              isLoading={isAuthLoading}
            />
          ) : (
            <SignupForm
              onSignup={handleSignup}
              onSwitchToLogin={() => setAuthMode('login')}
              isLoading={isAuthLoading}
            />
          )}

          {/* Demo Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-sm text-blue-700">
              <strong>Demo App:</strong> Use any email and password to sign in and start your mental wellness journey.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-white">
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={handleNewChat}
        onDeleteChat={deleteChat}
        user={user}
        onSignOut={signOut}
      />
      <ChatArea
        chat={currentChat}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;