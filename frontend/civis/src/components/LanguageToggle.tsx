import { useLanguage } from '../context/LanguageContext';
import './LanguageToggle.css';

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button 
      className="lang-toggle-float" 
      onClick={toggleLanguage}
      aria-label="Toggle Language"
    >
      <div className="lang-toggle-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      </div>
      <span className="lang-toggle-text" data-lang={language}>
        {language === 'en' ? 'English' : 'हिंदी'}
      </span>
    </button>
  );
}
