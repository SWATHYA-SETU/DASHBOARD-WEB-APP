import React, { useState, useEffect, useRef } from 'react';
import { fetchGeminiAnswer } from './Gemini.js';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css'; // Add your styles here

const Chatbot = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Reference to the end of the messages list

  // Automatically send a welcome message when the chatbot is loaded
  useEffect(() => {
    const welcomeMessage = {
      text: `**Welcome!** I'm here to assist you with disease information, symptoms, and treatment suggestions. Please ask me anything about a disease, and I'll provide a summary of common symptoms, precautions and disease details.`,
      sender: 'bot',
    };
    setMessages([welcomeMessage]);
  }, []);

  // Function to scroll to the bottom of the chatbox
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    try {
      const response = await fetchGeminiAnswer(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response, sender: 'bot' },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Error fetching response.', sender: 'bot' },
      ]);
    }

    setInput(''); // Clear the input after sending the message
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Chatbot</h2>
        <button onClick={onClose}>X</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.sender === 'bot' ? (
              // Render bot messages with Markdown
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text // Render user messages as plain text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* This div marks the end of the chat */}
      </div>
      <form onSubmit={sendMessage} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
