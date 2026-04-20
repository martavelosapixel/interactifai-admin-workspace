import { useState, useEffect } from 'react'
import AdminPortal from './components/AdminPortal'

const PASSWORD = 'interactifAIworkspace2026'
const SESSION_KEY = 'app_unlocked'

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      onUnlock()
    } else {
      setError(true)
      setShake(true)
      setValue('')
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#060708',
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          animation: shake ? 'shake 0.4s ease' : undefined,
        }}
      >
        {/* Logo mark */}
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #615fff 0%, #0283ff 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 4,
        }}>
          <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="4.5" stroke="white" strokeWidth="1.5" />
            <path d="M8 3.5V5M8 11V12.5M3.5 8H5M11 8H12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#fafaf9', fontSize: 18, fontWeight: 600, margin: 0, fontFamily: 'system-ui, sans-serif' }}>
            Protected preview
          </p>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, margin: '6px 0 0', fontFamily: 'system-ui, sans-serif' }}>
            Enter the password to continue
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
          <input
            autoFocus
            type="password"
            placeholder="Password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false) }}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: `1px solid ${error ? 'rgba(239,68,68,0.6)' : 'rgba(255,255,255,0.1)'}`,
              background: 'rgba(255,255,255,0.05)',
              color: '#fafaf9',
              fontSize: 14,
              fontFamily: 'system-ui, sans-serif',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
          />
          {error && (
            <p style={{ color: 'rgba(239,68,68,0.9)', fontSize: 12, margin: 0, fontFamily: 'system-ui, sans-serif' }}>
              Incorrect password. Try again.
            </p>
          )}
          <button
            type="submit"
            style={{
              padding: '10px 14px',
              borderRadius: 8,
              border: 'none',
              background: 'linear-gradient(135deg, #615fff 0%, #0283ff 100%)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'system-ui, sans-serif',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Continue
          </button>
        </div>
      </form>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}

function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      setScale(Math.min(window.innerWidth / 1440, window.innerHeight / 900))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#060708',
      overflow: 'hidden',
    }}>
      <div style={{
        width: 1440,
        height: 900,
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        flexShrink: 0,
      }}>
        <AdminPortal />
      </div>
    </div>
  )
}

export default App
