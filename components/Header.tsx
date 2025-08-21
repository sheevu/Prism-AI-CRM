import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useLocalization } from '../hooks/useLocalization';
import { Sun, Moon, Menu } from 'lucide-react';

const NavItem: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <NavLink 
        to={to} 
        className={({ isActive }) => 
            `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive 
                ? 'text-white bg-white/20' 
                : 'text-gray-200 hover:bg-white/10'
            }`
        }
    >
        {children}
    </NavLink>
);

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, language, toggleLanguage } = useLocalization();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
      { to: '/dashboard', label: t('dashboard') },
      { to: '/contacts', label: t('contacts') },
      { to: '/leads', label: t('leads') },
      { to: '/tasks', label: t('tasks') },
      { to: '/ledger', label: t('ledger') },
      { to: '/reports', label: t('reports') },
      { to: '/settings', label: t('settings') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-header-gradient shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white tracking-wide">
              {t('greeting')}
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map(link => (
              <NavItem key={link.to} to={link.to}>{link.label}</NavItem>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-black/10 hover:bg-black/20 backdrop-blur-sm transition-colors"
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-white bg-black/10 hover:bg-black/20 backdrop-blur-sm transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-full text-white bg-black/10 hover:bg-black/20">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
       {isMenuOpen && (
        <nav className="md:hidden bg-black/20 backdrop-blur-sm px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'text-white bg-white/25' : 'text-gray-200 hover:bg-white/15'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;