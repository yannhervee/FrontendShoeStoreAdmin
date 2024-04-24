import Sidebar from './Sidebar';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const AdminLayout = ({ children }) => {

  const[user, setUser] = useState(false);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
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
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term as the user types
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Implement your search logic here, possibly setting up a route to display search results
   
      if (searchTerm.trim()) {
        router.push(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      }
    
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
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-2 py-1 rounded-md border border-green-800 focus:outline-none text-black"
              style={{ width: '316px' }}
              />
               <button type="submit" className="p-2 bg-white hover:bg-gray-200 text-black rounded">
    <FontAwesomeIcon icon={faSearch} />
  </button>
            </form>
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
