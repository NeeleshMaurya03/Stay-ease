import {
    FaSearch,
    FaHome,
    FaInfoCircle,
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
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          isScrolled ? 'shadow-xl bg-opacity-95 backdrop-blur-lg' : ''
        }`}
      >
        {/* Decorative Doodles */}
        <div className="absolute -top-10 left-0 w-40 h-40 bg-green-100 rounded-full blur-2xl opacity-30 z-0"></div>
        <div className="absolute -bottom-10 right-0 w-48 h-48 bg-green-200 rounded-full blur-3xl opacity-40 z-0"></div>
  
        <div className="container mx-auto px-4 py-3 flex justify-between items-center relative z-10">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="flex items-center gap-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
                StayEase
              </h1>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Budget Stays
              </span>
            </Link>
          </motion.div>
  
          {/* Search Bar */}
          <motion.form
            onSubmit={handleSubmit}
            className="hidden md:flex items-center rounded-full px-4 py-2 flex-1 max-w-md mx-6 bg-green-50 transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-green-400"
          >
            <MdLocationPin className="text-green-600 mr-2" />
            <input
              type="text"
              placeholder="Search for budget stays near..."
              className="bg-transparent w-full focus:outline-none text-sm text-gray-700 placeholder-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <motion.button
              type="submit"
              className="ml-2 text-green-600 hover:text-green-700"
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch />
            </motion.button>
          </motion.form>
  
          {/* Navigation */}
          <nav className="flex items-center gap-4 sm:gap-6">
            {[
              { to: '/', icon: <FaHome />, label: 'Home' },
              { to: '/about', icon: <FaInfoCircle />, label: 'About' },
              { to: '/contact', icon: <FaEnvelope />, label: 'Contact' },
            ].map(({ to, icon, label }) => (
              <motion.div key={to} whileHover={{ scale: 1.05 }}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1 ${
                      isActive
                        ? 'text-green-600'
                        : 'text-gray-700 hover:text-green-500'
                    }`
                  }
                >
                  {icon}
                  <span className="hidden sm:inline text-sm font-medium">
                    {label}
                  </span>
                </NavLink>
              </motion.div>
            ))}
  
            {/* User Section */}
            <div className="flex items-center gap-2">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox:
                        'h-8 w-8 border-2 border-green-300',
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <motion.button
                    className="text-green-600 hover:text-green-700 flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="hidden sm:inline text-sm font-medium">
                      Sign In
                    </span>
                  </motion.button>
                </SignInButton>
              </SignedOut>
            </div>
  
            {/* Mobile Search Button */}
            <motion.button
              className="md:hidden text-gray-700 hover:text-green-600"
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
            className="md:hidden bg-white py-2 px-4 shadow-sm"
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-green-50 rounded-full px-4 py-2"
            >
              <MdLocationPin className="text-green-600 mr-2" />
              <input
                type="text"
                placeholder="Search budget stays..."
                className="bg-transparent w-full focus:outline-none text-sm text-gray-700 placeholder-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="ml-2 text-green-600">
                <FaSearch />
              </button>
            </form>
          </motion.div>
        )}
      </motion.header>
    );
  };
  
  export default Header;
  