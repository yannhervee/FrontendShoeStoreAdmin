import Sidebar from './Sidebar';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const AdminLayout = ({ children }) => {

  const[user, setUser] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userId = sessionStorage.getItem('user');
    if (token && userId) {
      setUser({ token, userId });
    } else {
      setUser(null);
      router.push('/login'); // Redirect to login if no token or userId
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    router.push('/login'); // Redirect to login page on logout
  };

  return (

    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
  {/* Content Area + Nav Bar */}
  <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Navigation Bar */}
        <header className="bg-green-600 shadow py-4 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Logo here  EFS - Admin</h1>
            {user && (
              <div className="flex items-center">
                <span className="text-white mr-6 font-bold">
                  <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                  Admin
                </span>
                <button onClick={handleLogout} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-6 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
