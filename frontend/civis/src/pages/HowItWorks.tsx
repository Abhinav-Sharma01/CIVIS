import { Link } from 'react-router-dom'
import './HowItWorks.css'

const steps = [
  {
    number: '01',
    icon: '📝',
    title: 'Create Your Account',
    desc: 'Sign up with your mobile number or Gmail in seconds. No paperwork, no queues — just a quick verification and you are ready.',
    note: 'Your identity is kept private. Only the assigned authority sees your contact details.',
  },
  {
    number: '02',
    icon: '📍',
    title: 'Locate the Problem',
    desc: 'Use the built-in map to drop a pin at the exact location of the issue — a broken street light, a pothole, a clogged drain, or anything else.',
    note: 'GPS auto-location is supported so you can pin in one tap.',
  },
  {
    number: '03',
    icon: '🖊',
    title: 'Describe & Attach Proof',
    desc: 'Write a short description of the issue and optionally attach a photo or video. Clear evidence helps authorities prioritise and act faster.',
    note: 'Photos under 10 MB are accepted. Videos up to 30 seconds.',
  },
  {
    number: '04',
    icon: '📤',
    title: 'Submit the Complaint',
    desc: 'Hit Submit and your complaint is instantly routed to the correct municipal department based on category and location.',
    note: 'You receive a unique Complaint ID by SMS or email.',
  },
  {
    number: '05',
    icon: '🔔',
    title: 'Track in Real Time',
    desc: 'Use your Complaint ID or log in to your dashboard to watch status updates — Received, Under Review, Work in Progress, Resolved.',
    note: 'Push notifications and SMS alerts are sent at every status change.',
  },
  {
    number: '06',
    icon: '✅',
    title: 'Rate the Resolution',
    desc: 'Once the issue is marked resolved, you can confirm the fix and rate the response. Your feedback shapes service quality in your city.',
    note: 'Unresolved? You can escalate with one click.',
  },
]

const faqs = [
  {
    q: 'Is Civis free to use?',
    a: 'Yes, completely free for every citizen. There are no hidden charges.',
  },
  {
    q: 'Who acts on my complaint?',
    a: 'Complaints are automatically routed to the relevant municipal or civic authority based on the category and pinned location.',
  },
  {
    q: 'Can I submit anonymously?',
    a: 'Yes. You can choose to hide your identity while filing. The assigned department will not see your name or contact.',
  },
  {
    q: 'How long does it take to resolve an issue?',
    a: 'Resolution time depends on the authority. Most complaints are acknowledged within 24 hours. You can track progress live.',
  },
  {
    q: 'What if my complaint is not resolved?',
    a: 'You can escalate the complaint to a higher authority directly from your dashboard if it stays unresolved beyond the expected timeframe.',
  },
]

export default function HowItWorks() {
  return (
    <div className="hiw-page">

      {/* Header */}
      <section className="hiw-hero">
        <span className="hiw-badge">Simple. Transparent. Effective.</span>
        <h1>How Civis Works</h1>
        <p>
          Reporting a civic issue takes less than two minutes. Here is exactly
          what happens from the moment you spot a problem to the day it gets fixed.
        </p>
        <Link to="/login" className="hiw-cta-btn">Get Started — It's Free</Link>
      </section>

      {/* Step-by-step */}
      <section className="hiw-steps">
        <div className="steps-container">
          {steps.map((s, i) => (
            <div className="hiw-step" key={s.number}>
              <div className="step-left">
                <div className="step-num">{s.number}</div>
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
              <div className="step-body">
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="step-tip">💡 {s.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complaint lifecycle */}
      <section className="hiw-lifecycle">
        <h2>Complaint Lifecycle</h2>
        <p className="lifecycle-sub">Every complaint moves through these stages automatically.</p>
        <div className="lifecycle-track">
          {['Submitted', 'Acknowledged', 'Under Review', 'In Progress', 'Resolved'].map(
            (stage, i, arr) => (
              <div className="lifecycle-item" key={stage}>
                <div className="lifecycle-dot" />
                <span>{stage}</span>
                {i < arr.length - 1 && <div className="lifecycle-line" />}
              </div>
            )
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="hiw-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((f) => (
            <details className="faq-item" key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="hiw-bottom-cta">
        <h2>Ready to make your city better?</h2>
        <div className="hiw-bottom-actions">
          <Link to="/login" className="btn-primary">Sign Up Free</Link>
          <Link to="/" className="btn-ghost">Back to Home</Link>
        </div>
      </section>

    </div>
  )
}
