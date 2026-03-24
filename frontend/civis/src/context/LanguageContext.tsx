import React, { createContext, useContext, useEffect, useState } from 'react';

type LanguageContextType = {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  useEffect(() => {
    // Inject the Google Translate script into the DOM
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Expose the initialization function globally for the script to call
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,hi', autoDisplay: false },
        'google_translate_element'
      );
    };

    // Unconditionally hide all Google Translate default UI, popups, and highlights
    const style = document.createElement('style');
    style.innerHTML = `
      #google_translate_element { display: none !important; }
      .skiptranslate.goog-te-banner-frame { display: none !important; }
      body { top: 0px !important; }
      .goog-tooltip { display: none !important; }
      .goog-tooltip:hover { display: none !important; }
      .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
    `;
    document.head.appendChild(style);
  }, []);

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);

    // Programmatically trigger the hidden Google Translate dropdown
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = nextLang;
      select.dispatchEvent(new Event('change'));
    }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
