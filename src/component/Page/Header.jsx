import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Auth/Action';
import LoginDropdown from '../Auth/LoginDropdown';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false); // State to manage login popup visibility

  const isLoggedIn = useSelector((state) => !!state.auth.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  const handleLoginClick = () => {
    setIsLoginPopupOpen(prevState => !prevState); // Toggle the login popup state
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown') && isProfileDropdownOpen) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-16 py-8 bg-white shadow-lg">
      <div className="">
        <Link to="/">
          <a href="#">online food delivery</a>
        </Link>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex flex-col space-y-4 px-6 py-16">
          <Link to="/" className="hover:text-gray-500" onClick={toggleMobileMenu}>Restaurants</Link>
          <Link to="/find-company" className="hover:text-gray-500" onClick={toggleMobileMenu}>Drinks</Link>
          <Link to="/blog" className="hover:text-gray-500" onClick={toggleMobileMenu}>Market</Link>
          <Link to="/contact-us" className="hover:text-gray-500" onClick={toggleMobileMenu}>More</Link>
          {isLoggedIn ? (
            <>
              <button className="hover:text-gray-500 text-left" onClick={toggleProfileDropdown}>Profile</button>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md absolute right-0 w-40 flex flex-col items-center justify-center">
                  <Link to="/profile" className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center">View Profile</Link>
                  <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center">Logout</button>
                </div>
              )}
            </>
          ) : (
            <button onClick={handleLoginClick} className="hover:text-gray-500">Login</button>
          )}
        </nav>
      </div>

      <nav className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-gray-500">Find Job</Link>
        <Link to="/find-company" className="hover:text-gray-500">Find Company</Link>
        <Link to="/blog" className="hover:text-gray-500">Blog</Link>
        <Link to="/contact-us" className="hover:text-gray-500">Contact Us</Link>
      </nav>

      <div className="hidden md:flex items-center space-x-4">
        {isLoggedIn ? (
          <>
          <button className="hover:text-gray-500 text-left" onClick={toggleProfileDropdown}>Profile</button>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md absolute right-0 w-40 flex flex-col items-center justify-center">
              <Link to="/profile" className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center">View Profile</Link>
              <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center">Logout</button>
            </div>
          )}
        </>
        ) : (
          <button onClick={handleLoginClick} className="hover:text-gray-500">Login</button>
        )}
      </div>

      {/* Login Popup */}
      {isLoginPopupOpen && (
        <div className="absolute top-16 right-0 z-50">
          <LoginDropdown setIsTyping={() => { }} />
        </div>
      )}
    </header>
  );
}

export default Header;
