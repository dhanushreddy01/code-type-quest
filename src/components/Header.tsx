
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, BarChart2, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="glass border-b border-white/10 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <motion.h1 
              className="text-xl font-semibold text-gradient"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              CodeTypr
            </motion.h1>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <NavLink to="/" active={isActive('/')}>
              <Home className="h-4 w-4 mr-1" />
              Home
            </NavLink>
            <NavLink to="/practice" active={isActive('/practice')}>
              <Code className="h-4 w-4 mr-1" />
              Practice
            </NavLink>
            <NavLink to="/dashboard" active={isActive('/dashboard')}>
              <BarChart2 className="h-4 w-4 mr-1" />
              Stats
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200 ${
        active 
          ? 'text-primary bg-primary/10' 
          : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5'
      }`}
    >
      {children}
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full mx-2"
          layoutId="activeTab"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </Link>
  );
};

export default Header;
