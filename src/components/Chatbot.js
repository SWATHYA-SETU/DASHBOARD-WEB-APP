import React, { useState, useEffect, useRef } from 'react';
import { fetchGeminiAnswer } from './Gemini.js';
import ReactMarkdown from 'react-markdown';
import doctors from '../assets/doctors.json'; // Import your doctors list
import './Chatbot.css'; 

const Chatbot = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationType, setConversationType] = useState(null); // Track conversation type
  const [assignedDoctor, setAssignedDoctor] = useState(null); // Track assigned doctor
  const messagesEndRef = useRef(null); 

  // Automatically send a welcome message when the chatbot is loaded
  useEffect(() => {
    const welcomeMessage = {
      text: `**Welcome!** Please choose an option: \n\n - **Speak to a Doctor** \n - **Search Information**`,
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

  // Assign random doctor when "Speak to a Doctor" is selected
  const assignRandomDoctor = () => {
    const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
    setAssignedDoctor(randomDoctor);
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: `You are now connected with **${randomDoctor.name}**, a **${randomDoctor.specialty}**. How can I assist you today?`, sender: 'bot' },
    ]);
  };

  const handleConversationChoice = (choice) => {
    if (choice.toLowerCase() === 'speak to a doctor') {
      setConversationType('doctor');
      assignRandomDoctor();
    } else if (choice.toLowerCase() === 'search information') {
      setConversationType('info');
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'You can now ask me about any disease!', sender: 'bot' },
      ]);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Please choose either "Speak to a Doctor" or "Search Information".', sender: 'bot' },
      ]);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    // If conversation type is not selected yet, handle choice
    if (!conversationType) {
      handleConversationChoice(input);
    } else {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: 'user' },
      ]);

      try {
        if (conversationType === 'info') {
          const response = await fetchGeminiAnswer(input);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: response, sender: 'bot' },
          ]);
        } else if (conversationType === 'doctor') {
          // Simulate doctor response
          const doctorResponse = `Dr. ${assignedDoctor.name}: Based on your question, here's my advice...`;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: doctorResponse, sender: 'bot' },
          ]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error fetching response.', sender: 'bot' },
        ]);
      }
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
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              msg.text
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
