// src/components/ChatbotToggle.js

import React, { useState } from 'react';
import Chatbot from './Chatbot';

const ChatbotToggle = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggleChatbot}>
        {isChatbotOpen ? 'Close Chatbot' : 'Open Chatbot'}
      </button>
      {isChatbotOpen && <Chatbot onClose={toggleChatbot} />}
    </div>
  );
};

export default ChatbotToggle;
