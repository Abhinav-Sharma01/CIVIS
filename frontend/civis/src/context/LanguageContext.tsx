import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type LanguageContextType = {
  language: 'en' | 'hi';
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize from cookie or default to 'en'
  const getInitialLang = () => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/googtrans=\/en\/(hi|en)/);
      if (match && match[1] === 'hi') return 'hi';
    }
    return 'en';
  };
  
  const [language, setLanguage] = useState<'en' | 'hi'>(getInitialLang);

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
    
    // Set cookie to remember language preference
    document.cookie = `googtrans=/en/${nextLang}; path=/;`;
    
    // Programmatically trigger the hidden Google Translate dropdown
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      if (nextLang === 'en') {
        // To properly clear translation, sometimes we need to restore
        const iframe = document.querySelector('iframe.goog-te-banner-frame') as HTMLIFrameElement;
        if (iframe) {
          const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
          const restoreBtn = innerDoc?.querySelector('.goog-te-button button') as HTMLButtonElement | null;
          if (restoreBtn) restoreBtn.click();
        }
      }
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

// React Router SPA navigation observer
export function TranslateRouteObserver() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    if (language === 'hi') {
      // Re-trigger translation slightly after DOM updates
      const trigger = () => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
        if (select) {
          // Toggle to EN then back to HI to force a re-pass of the DOM
          select.value = 'en';
          select.dispatchEvent(new Event('change'));
          setTimeout(() => {
            select.value = 'hi';
            select.dispatchEvent(new Event('change'));
          }, 50);
        }
      };
      
      const timer = setTimeout(trigger, 150);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, language]);

  return null;
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
