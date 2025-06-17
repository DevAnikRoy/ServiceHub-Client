import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, Home, Wrench, LogIn, User, Plus, Settings, BookOpen, CheckSquare, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import toast from 'react-hot-toast';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const dashboardLinks = [
    { to: '/add-service', label: 'Add Service', icon: Plus },
    { to: '/manage-services', label: 'Manage Services', icon: Settings },
    { to: '/booked-services', label: 'Booked Services', icon: BookOpen },
    { to: '/service-todo', label: 'Service To-Do', icon: CheckSquare },
  ];

  const publicLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/services', label: 'Services', icon: Wrench },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg"
            >
              <Wrench className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              ServiceHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {publicLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span>Dashboard</span>
                </button>

                {isDashboardOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
                  >
                    {dashboardLinks.map(({ to, label, icon: Icon }) => (
                      <Link
                        key={to}
                        to={to}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => setIsDashboardOpen(false)}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Info & Logout */}
            {currentUser && (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  {currentUser.imageUrl && (
                    <img
                      src={currentUser.imageUrl}
                      alt={currentUser.name || currentUser.email}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {currentUser.displayName || currentUser.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 pb-4 space-y-4"
          >
            {publicLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}

            {currentUser ? (
              <>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex items-center space-x-2 mb-4">
                    {currentUser.photoURL && (
                      <img
                        src={currentUser.photoURL}
                        alt={currentUser.displayName}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {currentUser.displayName || currentUser.email}
                    </span>
                  </div>
                  {dashboardLinks.map(({ to, label, icon: Icon }) => (
                    <Link
                      key={to}
                      to={to}
                      className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}