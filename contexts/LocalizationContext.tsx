
import React, { createContext, useState, useMemo, useCallback } from 'react';
import { translations, TranslationKey } from '../locales/translations';

type Language = 'en' | 'hi';

interface LocalizationContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

export const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'hi' : 'en'));
  };

  const t = useCallback((key: TranslationKey): string => {
    return translations[key][language] || key;
  }, [language]);

  const value = useMemo(() => ({ language, toggleLanguage, t }), [language, t]);

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};
