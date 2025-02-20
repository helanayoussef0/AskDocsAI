import React, { useState } from 'react';
import './AIChat.scss';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: inputText, 
      isUser: true 
    }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: 'This is a sample AI response based on the document content...',
        isUser: false 
      }]);
    }, 1000);

    setInputText('');
  };

  return (
    <div className="ai-chat">
      <div className="chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`message ${message.isUser ? 'user' : 'ai'}`}
          >
            {message.text}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a question about the document..."
        />
        <button type="submit">Ask</button>
      </form>
    </div>
  );
};

export default AIChat;