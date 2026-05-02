import { useEffect, useState } from 'react';
import './App.css';
import First from './Componets/First';
import Login from './Componets/Login';
import Dashboard from './Componets/Dashboard';
import Register from './Componets/Register';


function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) setIsAuth(true);
  }, []);

  if (isAuth) {
    return <Dashboard onLogout={() => setIsAuth(false)} />;
  }

  return (
    <div className="form-section">
      <First />
      {isLogin ? (
        <Login
          onSwitchToRegister={() => setIsLogin(false)}
          onLoginSuccess={() => setIsAuth(true)}
        />
      ) : (
        <Register onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;
