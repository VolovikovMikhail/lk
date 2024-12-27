import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false); // Флаг для переключения между формами
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useUser(); // Предполагаем наличие функции register в контексте UserContext
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);


  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('https://registration-fastapi.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                hash_password: password,
            }),
            credentials: 'include', // Для отправки и получения куки
        });

        if (response.ok) {
            const data = await response.json();
            // Сохраняем refresh_token в localStorage
            localStorage.setItem('refresh_token', data.refresh);
            console.log('Login successful');
            console.log(data);
            
        } else {
            console.error('Login failed:', response.status);
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
};


  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
        <form onSubmit={handleLogin}>
          
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold mb-2">Пароль</label>
                <input
                  id="password"
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
           
              <br/>
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              >
            Войти
          </button>
          </form>
            
          
          
          <p className="mt-4 text-center">
            Нет аккаунта?
            <span
              role="link"
              tabIndex={0}
              onClick={() => navigate('/register')}
              className="cursor-pointer underline text-blue-600"
            >
               Зарегистрируйтесь
            </span>
          </p>
        
      </div>
    </div>
  );
};

export default Login;