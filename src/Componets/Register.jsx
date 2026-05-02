import { useState } from 'react'
import axios from 'axios'
import './Register.css'

const API_BASE = import.meta.env.VITE_API_URL

function Register({ onSwitchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setLoading(true)
    setSuccess('')

    try {
      await axios.post(`${API_BASE}/auth/register`, { username, password });

      setSuccess('Account created! Redirecting to login...');
      
      setTimeout(() => onSwitchToLogin(), 1500);

    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || 'Registration failed');
      } else {
        setError('Server not reachable');
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='register-form'>
        <h3>Register Your Account</h3>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <div className='input-group'>
          <label>Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter username" 
          />
        </div>

        <div className='input-group'>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter password" 
          />
        </div>
        <br />
        
        <button type="submit" disabled={loading || !username || !password}>
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p>Already have an account?</p>
      
      <button onClick={onSwitchToLogin}>
        Login here
      </button>
    </>
  );
}

export default Register;
