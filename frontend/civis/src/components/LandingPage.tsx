import { useState } from 'react'
import './LandingPage.css'

type Lang = 'en' | 'hi'

const t = {
  en: {
    badge: 'Civic Complaint Portal',
    title1: 'Your City.',
    title2: 'Your Voice.',
    subtitle: 'Report broken street lights, damaged roads, water issues, and more — directly to the people responsible for fixing them.',
    cta1: 'Report an Issue',
    cta2: 'How It Works',
    trust1: 'Free to use',
    trust2: 'Anonymous option',
    trust3: 'Real-time tracking',
    categoriesTitle: 'Browse by Category',
    categoriesSub: 'Select the type of issue affecting your neighbourhood.',
    ctaTitle: 'Spotted a problem in your area?',
    ctaSub: "Don't wait — file a complaint now and let the local authorities know. Every report counts toward a better, safer city.",
    ctaBtn: 'File a Complaint Now',
    footerTagline: 'Empowering citizens. Improving cities.',
    helpline: 'Helpline',
    tollfree: 'Toll-Free',
  },
  hi: {
    badge: 'नागरिक शिकायत पोर्टल',
    title1: 'आपका शहर।',
    title2: 'आपकी आवाज़।',
    subtitle: 'टूटी स्ट्रीट लाइट, खराब सड़क, पानी की समस्या और अन्य मुद्दे सीधे जिम्मेदार अधिकारियों तक पहुँचाएं।',
    cta1: 'शिकायत दर्ज करें',
    cta2: 'यह कैसे काम करता है',
    trust1: 'बिल्कुल मुफ्त',
    trust2: 'गुमनाम विकल्प',
    trust3: 'रियल-टाइम ट्रैकिंग',
    categoriesTitle: 'श्रेणी के अनुसार देखें',
    categoriesSub: 'अपने क्षेत्र को प्रभावित करने वाली समस्या का प्रकार चुनें।',
    ctaTitle: 'आपके क्षेत्र में कोई समस्या दिखी?',
    ctaSub: 'देर मत करें — अभी शिकायत दर्ज करें और स्थानीय प्रशासन को सूचित करें।',
    ctaBtn: 'अभी शिकायत दर्ज करें',
    footerTagline: 'नागरिकों को सशक्त बनाना। शहरों को बेहतर बनाना।',
    helpline: 'हेल्पलाइन',
    tollfree: 'टोल-फ्री',
  },
}

const categories = [
  { icon: '🛣', label: 'Roads & Potholes', count: '1.2k' },
  { icon: '💡', label: 'Street Lights', count: '843' },
  { icon: '🚰', label: 'Water Supply', count: '675' },
  { icon: '🗑', label: 'Garbage & Sanitation', count: '920' },
  { icon: '🌳', label: 'Parks & Trees', count: '412' },
  { icon: '🚧', label: 'Drainage & Flooding', count: '560' },
  { icon: '🏗', label: 'Footpaths & Bridges', count: '318' },
  { icon: '📶', label: 'Public WiFi & Signals', count: '240' },
]

const steps = [
  {
    step: '01',
    title: 'Describe the Issue',
    desc: 'Tell us what the problem is — pothole, broken street light, clogged drain, or anything else affecting your area.',
  },
  {
    step: '02',
    title: 'Pin the Location',
    desc: 'Use the map to mark the exact spot so the right authority can act on it quickly.',
  },
  {
    step: '03',
    title: 'Submit & Track',
    desc: 'Submit your complaint and get a unique ID to track its status in real time.',
  },
]

const stats = [
  { value: '18,400+', label: 'Complaints Filed' },
  { value: '12,900+', label: 'Issues Resolved' },
  { value: '340+', label: 'Municipalities Connected' },
  { value: '70%', label: 'Avg. Resolution Rate' },
]

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('en')
  const tx = t[lang]

  return (
    <main className="landing">

      {/* Language toggle */}
      <div className="lang-bar">
        <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')}>English</button>
        <button className={`lang-btn ${lang === 'hi' ? 'active' : ''}`} onClick={() => setLang('hi')}>हिन्दी</button>
      </div>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-badge">{tx.badge}</span>
          <h1 className="hero-title">
            {tx.title1} <span className="highlight">{tx.title2}</span>
          </h1>
          <p className="hero-subtitle">{tx.subtitle}</p>
          <div className="hero-actions">
            <a href="#report" className="btn-primary">{tx.cta1}</a>
            <a href="/how-it-works" className="btn-outline">{tx.cta2}</a>
          </div>
          <div className="hero-trust">
            <span>✔ {tx.trust1}</span>
            <span>✔ {tx.trust2}</span>
            <span>✔ {tx.trust3}</span>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="city-card">
            <div className="city-icon">🏙</div>
            <p>Better cities start with informed citizens.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar" id="stats">
        {stats.map((s) => (
          <div className="stat-item" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>Three simple steps to get your complaint noticed and resolved.</p>
        </div>
        <div className="steps-grid">
          {steps.map((s) => (
            <div className="step-card" key={s.step}>
              <span className="step-number">{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="categories" id="categories">
        <div className="section-header">
          <h2>{tx.categoriesTitle}</h2>
          <p>{tx.categoriesSub}</p>
        </div>
        <div className="categories-grid">
          {categories.map((c) => (
            <button className="category-card" key={c.label}>
              <span className="cat-icon">{c.icon}</span>
              <span className="cat-label">{c.label}</span>
              <span className="cat-count">{c.count} reports</span>
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="report">
        <div className="cta-box">
          <h2>{tx.ctaTitle}</h2>
          <p>{tx.ctaSub}</p>
          <a href="/register" className="btn-primary btn-large">{tx.ctaBtn}</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand-block">
              <div className="footer-logo-icon">
                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="white" fillOpacity="0.2"/>
                  <path d="M20 8C13.4 8 8 13.4 8 20s5.4 12 12 12 12-5.4 12-12S26.6 8 20 8zm0 4c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 17c-3 0-5.7-1.5-7.3-3.8.03-2.4 4.9-3.7 7.3-3.7 2.4 0 7.3 1.3 7.3 3.7C25.7 27.5 23 28 20 28z" fill="white"/>
                </svg>
              </div>
              <span className="footer-brand-name">Civis</span>
            </div>
            <p className="footer-tagline">{tx.footerTagline}</p>

            <div className="footer-contact">
              <div className="footer-contact-item">
                <span className="fc-label">{tx.tollfree}</span>
                <a href="tel:1800-123-4567" className="fc-value">📞 1800-123-4567</a>
              </div>
              <div className="footer-contact-item">
                <span className="fc-label">{tx.helpline} Email</span>
                <a href="mailto:varunbali47@gmail.com" className="fc-value">✉ varunbali47@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Contact Us</a>
              <a href="#">Accessibility</a>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} Civis. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </main>
  )
}
