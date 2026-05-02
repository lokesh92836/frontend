import { useState } from 'react'
import axios from 'axios'
import './Login.css'

const API_BASE = import.meta.env.VITE_API_URL


function Login({ onSwitchToRegister, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(`${API_BASE}/auth/login`, { username, password });

      
      localStorage.setItem('token', response.data.access_token);

      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      if (err.response) {
        setError(err.response.data.detail || 'Login failed')
      } else {
        setError('Server not running on port 8000')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='register-form'>
        <h3>Sign In your Account</h3>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        
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
          {loading ? 'Signing in... ' : 'Sign In'}
        </button>
      </form>

      <p>Don't have an account?</p>
      
      <button onClick={onSwitchToRegister}>
        Register here
      </button>
    </>
  );
}

export default Login;
