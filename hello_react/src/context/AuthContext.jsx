import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance'; // 너가 쓰는 axios 인스턴스 경로
import { getMyInfo } from '../api/memberApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [member, setMember] = useState(null);

  const login = (response) => {
    const { token, name, memberId } = response.data;
    localStorage.setItem('token', token);
    setMember({ name, memberId });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setMember(null);
  };

  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await getMyInfo(); 
          const { name, id } = res.data;
          setMember({ name, memberId: id });
        } catch (err) {
          console.error('자동 로그인 실패', err);
          localStorage.removeItem('token');
        }
      }
    };

    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ member, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
