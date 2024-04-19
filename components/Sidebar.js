import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faHome, faTags } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const router = useRouter();  // Hook to get access to the router object

  // Function to determine if the current route matches the link
  const isActive = (path) => {
    return router.pathname === path;
  }

  return (
    <div className="h-full w-64 bg-gray-200 p-5 fixed border-r-4 border-green-600 mt-24">
      <ul className="space-y-2">
        <li>
          <Link href="/adminHome">
            <span className={`block p-3 text-gray-700 hover:bg-blue-500 hover:text-white ${isActive('/adminHome') ? 'bg-green-600 text-white font-bold' : ''} border-2 border-green-600 rounded-lg`}>
              Home
              <FontAwesomeIcon icon={faHome} className="ml-2" />
            </span>
            
          </Link>
        </li>
        <li>
          <Link href="/products">
            <span className={`block p-3 text-gray-700 hover:bg-blue-500 hover:text-white ${isActive('/products') ? 'bg-green-600 text-white font-bold' : ''} border-2 border-green-600 rounded-lg`}>
              Products
              <FontAwesomeIcon icon={faBasketShopping} className="ml-2" />
            </span>
          </Link>
        </li>
        <li>
          <Link href="/sales">
            <span className={`block p-3 text-gray-700 hover:bg-blue-500 hover:text-white ${isActive('/sales') ? 'bg-green-600 text-white font-bold' : ''} border-2 border-green-600 rounded-lg`}>
              Sales
              <FontAwesomeIcon icon={faTags} className="ml-2" />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
