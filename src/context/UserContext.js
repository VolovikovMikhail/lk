import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const UserContext = createContext();

// Хук для использования контекста
export const useUser = () => useContext(UserContext);

// Провайдер для управления состоянием пользователя
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Метод для входа
  const login = (userData) => setUser(userData);
  
  // Метод для выхода
  const logout = () => setUser(null);

  // Метод для обновления данных пользователя
  const updateUser = (updatedUser) => setUser(updatedUser);

  return (
    <UserContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const login = async (username, password) => {
  const response = await fetch('https://registration-fastapi.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username, password }),
      credentials: 'include',
  });

  if (!response.ok) {
      throw new Error('Login failed');
  }

  return response.json();
};

export const register = async (userData) => {
  const response = await fetch('https://registration-fastapi.onrender.com/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
  });

  if (!response.ok) {
      throw new Error('Registration failed');
  }

  return response.json();
};

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');

  try {
      const response = await fetch('https://registration-fastapi.onrender.com/validate_refresh/jwt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Access token refreshed:', data.access_token);
      } else {
          console.error('Failed to refresh access token:', response.status);
      }
  } catch (error) {
      console.error('Error refreshing access token:', error);
  }
};
