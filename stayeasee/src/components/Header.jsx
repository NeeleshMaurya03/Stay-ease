import {
    FaSearch,
    FaHome,
    FaInfoCircle,
    FaMale,
    FaEnvelope,
  } from 'react-icons/fa';
  import { MdLocationPin } from 'react-icons/md';
  import {
    SignedIn,
    SignedOut,
    UserButton,
    SignInButton,
  } from '@clerk/clerk-react';
  import { Link, NavLink, useNavigate } from 'react-router-dom';
  import { motion } from 'framer-motion';
  import { useEffect, useState } from 'react';
  
  const Header = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleScroll = () => setIsScrolled(window.scrollY > 10);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      }
    };
  
    return (
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 shadow-lg backdrop-blur-md border-b border-gray-100'
            : 'bg-gradient-to-b from-white to-green-50/50'
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 -z-10 pattern-dots pattern-green-100 pattern-bg-transparent 
          pattern-size-4 pattern-opacity-20" />
  
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg bg-green-100 group-hover:bg-green-200 transition-colors">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-500 
                  bg-clip-text text-transparent">
                  StayEase
                </h1>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full 
                border border-green-200">
                Budget Stays
              </span>
            </Link>
          </motion.div>
  
          {/* Desktop Search Bar */}
          <motion.form 
            onSubmit={handleSubmit}
            className="hidden md:flex items-center rounded-full px-6 py-3 flex-1 max-w-xl mx-8 
              bg-white shadow-sm ring-1 ring-gray-100 hover:shadow-md transition-all"
          >
            <MdLocationPin className="text-green-600 mr-2 text-lg" />
            <input
              type="text"
              placeholder="Search for budget stays near..."
              className="bg-transparent w-full focus:outline-none text-sm text-gray-700 
                placeholder-green-500/80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.button
              type="submit"
              className="ml-2 text-green-600 hover:text-green-700 p-2 rounded-full 
                hover:bg-green-50"
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch className="text-lg" />
            </motion.button>
          </motion.form>
  
          {/* Navigation */}
          <nav className="flex items-center gap-4 sm:gap-6">
            {[
              { to: '/', icon: <FaHome />, label: 'Home' },
              { to: '/host', icon: <FaMale />, label: 'Host' },
              { to: '/contact', icon: <FaEnvelope />, label: 'Contact' },
            ].map(({ to, icon, label }) => (
              <motion.div key={to} whileHover={{ scale: 1.05 }}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${
                      isActive
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <span className="text-lg">{icon}</span>
                  <span className="hidden sm:inline text-sm font-medium">
                    {label}
                  </span>
                </NavLink>
              </motion.div>
            ))}
  
            {/* User Section */}
            <div className="flex items-center gap-2 ml-2">
              <SignedIn>
                <div className="border-2 border-green-200 rounded-full p-0.5">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: 'h-8 w-8',
                      },
                    }}
                  />
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <motion.button
                    className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 
                      transition-colors flex items-center gap-1.5"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm font-medium">Sign In</span>
                  </motion.button>
                </SignInButton>
              </SignedOut>
            </div>
  
            {/* Mobile Search Button */}
            <motion.button
              className="md:hidden text-gray-600 hover:text-green-700 p-2 rounded-full 
                hover:bg-gray-100"
              onClick={() => navigate('/search')}
              aria-label="Search"
              whileTap={{ scale: 0.9 }}
            >
              <FaSearch className="text-lg" />
            </motion.button>
          </nav>
        </div>
  
        {/* Mobile Search Bar */}
        {isScrolled && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white py-2 px-4 border-t border-gray-100"
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-white rounded-lg px-4 py-2 shadow-sm ring-1 ring-gray-100"
            >
              <MdLocationPin className="text-green-600 mr-2 text-lg" />
              <input
                type="text"
                placeholder="Search budget stays..."
                className="bg-transparent w-full focus:outline-none text-sm text-gray-700 
                  placeholder-green-500/80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit" 
                className="ml-2 text-green-600 hover:text-green-700 p-1 rounded-full 
                  hover:bg-green-50"
              >
                <FaSearch className="text-lg" />
              </button>
            </form>
          </motion.div>
        )}
      </motion.header>
    );
  };
  
  export default Header;