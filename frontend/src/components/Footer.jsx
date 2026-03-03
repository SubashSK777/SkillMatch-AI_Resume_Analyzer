import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            borderTop: '1px solid var(--glass-border)',
            background: 'rgba(5,5,5,0.8)',
            position: 'relative',
            overflow: 'hidden'
        }} className="interactive">
            {/* Animated Gradient Line */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                animation: 'slideLine 3s infinite linear'
            }}></div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }} className="text-gradient">SkillMatch AI</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>The Future of Neural Resume Analysis</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                {['Github', 'Documentation', 'Privacy', 'Contact'].map(link => (
                    <a key={link} href="#" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', transition: 'color 0.3s' }}
                        onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                        onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        {link}
                    </a>
                ))}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)' }}>
                © 2026 SkillMatch AI Protocol. All rights reserved.
            </p>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes slideLine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
        </footer>
    );
};

export default Footer;
