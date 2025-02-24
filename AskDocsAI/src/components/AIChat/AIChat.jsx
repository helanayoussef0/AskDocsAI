import React, { useState, useEffect } from 'react';
import './AIChat.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_ENDPOINT = `${API_URL}/api/chat`;

const AIChat = ({ documentContent }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState('unchecked');

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          setServerStatus('connected');
        } else {
          setServerStatus('error');
        }
      } catch (error) {
        console.error('Server connection error:', error);
        setServerStatus('error');
      }
    };
    checkServer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      isUser: true
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!documentContent) {
        throw new Error('No document content available');
      }

      console.log('Sending request to:', API_ENDPOINT);
      console.log('Payload:', {
        message: inputText,
        documentContent: documentContent.slice(0, 100) + '...' 
      });

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          documentContent,
          context: messages
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: data.response,
        isUser: false
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      let errorMessage = `Server connection failed. Please check that the backend server is running on ${API_URL}.`;
      
      if (error.message.includes('No document content')) {
        errorMessage = 'Document content is missing. Please try uploading the document again.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = `Could not connect to the server. Please make sure the backend is running on ${API_URL}`;
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: errorMessage,
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsLoading(false);
      setInputText('');
    }
  };

  if (serverStatus === 'error') {
    return (
      <div className="ai-chat">
        <div className="server-error">
          Backend server not detected. Please make sure the server is running on {API_URL}.
        </div>
      </div>
    );
  }

  return (
    <div className="ai-chat">
      <div className="chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`message ${message.isUser ? 'user' : 'ai'} ${message.isError ? 'error' : ''}`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="message ai loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question about the document..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputText.trim()}>
          {isLoading ? 'Processing...' : 'Ask'}
        </button>
      </form>
    </div>
  );
};

export default AIChat;