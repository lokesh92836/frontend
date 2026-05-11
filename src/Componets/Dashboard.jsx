import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API_BASE = import.meta.env.VITE_API_URL;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

function Dashboard({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', age: '', email: '', city: '' });
  
  // --- Chatbot State ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", text: "Hello! I am the Kuppam Student Portal Assistant. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/students/`, authHeader());
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isChatOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addStudent = async () => {
    try {
      await axios.post(`${API_BASE}/students/`, form, authHeader());
      setForm({ name: '', age: '', email: '', city: '' });
      fetchStudents();
    } catch (error) {
      console.error("Failed to add student", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_BASE}/students/${id}`, authHeader());
      fetchStudents();
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  // --- Chatbot Logic ---
  const sendMessage = async () => {
    if (!chatMessage.trim()) return;

    const userMessage = { role: "user", text: chatMessage };
    setChatHistory(prev => [...prev, userMessage]);
    setChatMessage("");
    setIsTyping(true);

    try {
      const res = await axios.post(`${API_BASE}/ai/ask`, { question: userMessage.text }, authHeader());
      const aiResponse = { role: "ai", text: res.data.answer };
      setChatHistory(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("AI Request Failed", error);
      const errorMsg = { role: "ai", text: "Sorry, I am having trouble connecting right now." };
      setChatHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleChatKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="dashboard">
      
      {/* Navbar */}
      <div className="navbar">
        <h2>Student Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Add Student Form */}
      <div className="form-box">
        <h3>Add Student</h3>
        <div className="inputs-row">
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="city" placeholder="City" value={form.city} onChange={handleChange} />
          <button onClick={addStudent} className="add-btn">Add Student</button>
        </div>
      </div>

      {/* Student Cards */}
      <div className="card-container">
        {students.map(s => (
          <div className="card" key={s.id}>
            <h3 className="card-title">{s.name}</h3>
            <div className="card-details">
              <p><b>ID:</b> {s.id}</p>
              <p><b>Age:</b> {s.age}</p>
              <p><b>Email:</b> {s.email}</p>
              <p><b>City:</b> {s.city}</p>
            </div>
            <button className="delete-btn" onClick={() => deleteStudent(s.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* --- AI Chatbot Widget --- */}
      <div className={`chat-widget ${isChatOpen ? 'open' : ''}`}>
        {isChatOpen ? (
          <div className="chat-window">
            <div className="chat-header">
              <h4>Kuppam AI Assistant</h4>
              <button className="close-chat" onClick={() => setIsChatOpen(false)}>✖</button>
            </div>
            <div className="chat-body">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
              {isTyping && <div className="chat-message ai typing">Typing...</div>}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input-area">
              <input 
                type="text" 
                placeholder="Ask about students or SQLite..." 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={handleChatKeyPress}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <button className="chat-fab" onClick={() => setIsChatOpen(true)}>
            ✨ Ask AI
          </button>
        )}
      </div>

    </div>
  );
}

export default Dashboard;