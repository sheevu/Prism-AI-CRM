import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocalizationProvider } from './contexts/LocalizationContext';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Leads from './pages/Leads';
import Tasks from './pages/Tasks';
import Ledger from './pages/Ledger';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';

const App: React.FC = () => {
  // Simulate auth state. In a real app, this would be in a context.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => setIsLoggedIn(true);

  return (
    <ThemeProvider>
      <LocalizationProvider>
        <HashRouter>
          {isLoggedIn ? (
            // Main App Layout
            <div className="min-h-screen bg-slate-50 dark:bg-[#0D1117] text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
              <Header />
              <main className="p-4 sm:p-6 lg:p-8">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/leads" element={<Leads />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="/ledger" element={<Ledger />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
              </main>
            </div>
          ) : (
            // Login Layout
            <div className="bg-login-gradient animate-gradient">
              <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
          )}
        </HashRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;