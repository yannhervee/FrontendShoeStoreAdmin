import Sidebar from './Sidebar';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Content Area + Nav Bar */}
      <div className="flex-1 flex flex-col overflow-y-auto ">
        {/* Navigation Bar */}
        <header className="bg-green-600 shadow py-4 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-white">Logo here  EFS - Admin</h1>
            <div className="flex items-center">
              <span className="text-white mr-6 font-bold">
              <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                Admin</span>
              <button onClick={() => console.log('Logout')} className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </div>
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
