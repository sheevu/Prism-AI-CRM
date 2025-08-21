import React from 'react';
import { useLocalization } from '../hooks/useLocalization';

interface LoginProps {
  onLogin: () => void;
}

// Custom 3D-style Gem Logo component
const GemLogo: React.FC = () => (
    <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#ff9a9e', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#fad0c4', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#a18cd1', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#fbc2eb', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#84fab0', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#8fd3f4', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#f6d365', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#fda085', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="rgba(255,255,255,0.1)"/>
        <path d="M50 0 L100 50 L50 50 Z" fill="url(#grad1)"/>
        <path d="M50 50 L100 50 L50 100 Z" fill="url(#grad2)"/>
        <path d="M50 100 L0 50 L50 50 Z" fill="url(#grad3)"/>
        <path d="M50 50 L0 50 L50 0 Z" fill="url(#grad4)"/>
    </svg>
);


const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useLocalization();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 font-sans overflow-hidden">
      <div className="flex flex-col items-center text-center max-w-xl w-full animate-fadeInUp" style={{ animationDelay: '0.2s', opacity: 0 }}>
        
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s', opacity: 0 }}>
          <GemLogo />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mt-8 leading-tight animate-fadeInUp" style={{ textShadow: '0px 3px 15px rgba(0,0,0,0.3)', animationDelay: '0.5s', opacity: 0 }}>
          {t('mainTagline')}
        </h1>
        
        <h2 className="text-3xl font-semibold mt-4 opacity-90 animate-fadeInUp" style={{textShadow: '0px 2px 10px rgba(0,0,0,0.2)', animationDelay: '0.7s', opacity: 0 }}>
          {t('hindiTagline')}
        </h2>

        <div className="w-full max-w-sm mt-12 space-y-4 animate-fadeInUp" style={{ animationDelay: '0.9s', opacity: 0 }}>
          <button
            onClick={onLogin}
            className="w-full py-4 text-lg font-bold rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 hover:scale-105 transition-transform duration-200 ease-in-out shadow-lg"
          >
            {t('getStarted')}
          </button>
          <button
            onClick={onLogin}
            className="w-full py-4 text-lg font-bold rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors duration-200"
          >
            {t('signIn')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;