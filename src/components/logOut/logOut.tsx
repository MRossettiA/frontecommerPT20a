
"use client"; 

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import router, { useRouter } from 'next/navigation';

const LogoutButton: React.FC = () => {
  const { setUserData } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('userSession');
    setUserData(null);
    router.push('/');
    };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
      Logout
    </button>
  );
};

export default LogoutButton;
