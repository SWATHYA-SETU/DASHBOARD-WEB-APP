// src/components/Chatbot.js
import React, { useState, useEffect, useRef } from 'react';
import { fetchGeminiAnswer } from './Gemini.js';
import ReactMarkdown from 'react-markdown';
import './Chatbot.css'; // Add your styles here
import doctorsList from '../assets/doctors.json'; // Mock list of doctors for now

const Chatbot = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatMode, setChatMode] = useState(null); // Track chat mode (doctor or search)
  const [assignedDoctor, setAssignedDoctor] = useState(null); // Store assigned doctor
  const [chatLocked, setChatLocked] = useState(false); // Prevent switching modes
  const messagesEndRef = useRef(null); // Reference to the end of the messages list

  // Automatically send a welcome message when the chatbot is loaded
  useEffect(() => {
    const welcomeMessage = {
      text: `**Welcome!** Please choose one of the following options to continue:`,
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

  const handleOptionSelect = (option) => {
    if (chatLocked) return; // Prevent changing the option once selected

    if (option === 'doctor') {
      // Assign a random doctor
      const randomDoctor = doctorsList[Math.floor(Math.random() * doctorsList.length)];
      setAssignedDoctor(randomDoctor);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `You are now connected with Dr. ${randomDoctor.name}. Please wait until the doctor accepts your request.`, sender: 'bot' },
      ]);
      setChatMode('doctor');
      setChatLocked(true); // Lock chat mode
    } else if (option === 'info') {
      // Proceed with information search
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `You have selected "Search Information". Ask me anything about diseases, symptoms, and treatments!`, sender: 'bot' },
      ]);
      setChatMode('info');
      setChatLocked(true); // Lock chat mode
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: 'user' },
    ]);

    // Handle response based on selected chat mode
    if (chatMode === 'doctor') {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: `Your message has been sent to Dr. ${assignedDoctor.name}. Waiting for a response...`, sender: 'bot' },
      ]);
    } else if (chatMode === 'info') {
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
        <div ref={messagesEndRef} />
      </div>

      {/* Display options only at the start */}
      {chatMode === null && (
        <div className="options">
          <button className = 'option-button' onClick={() => handleOptionSelect('doctor')}>Speak to a Doctor</button>
          <button className = 'option-button' onClick={() => handleOptionSelect('info')}>Search Information</button>
        </div>
      )}

      {/* Input form appears only when an option has been selected */}
      {chatMode && (
        <form onSubmit={sendMessage} className="chatbot-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            required
            disabled={chatMode === 'doctor'} // Disable input when in doctor mode until backend integration
          />
          <button type="submit" disabled={chatMode === 'doctor'}>
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default Chatbot;
