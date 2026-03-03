import React, { useEffect, useRef } from 'react';

const NeuralFooter = () => {
    return (
        <footer style={{ 
            padding: '2rem 1rem', 
            marginTop: 'auto',
            textAlign: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            background: '#050505',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Minimal Pulse Line */}
            <div style={{ 
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '150px',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                animation: 'pulseGlow 2s infinite ease-in-out'
            }}></div>

            <div style={{ position: 'relative', zIndex: 1 }}>
                <p style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--text-secondary)', 
                    letterSpacing: '3px', 
                    textTransform: 'uppercase',
                    opacity: 0.6,
                    margin: 0
                }}>
                    Neural Interface Protocol // Sequence Terminated
                </p>
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes pulseGlow {
                    0% { width: 50px; opacity: 0.2; }
                    50% { width: 250px; opacity: 0.8; }
                    100% { width: 50px; opacity: 0.2; }
                }
            `}} />
        </footer>
    );
};

export default NeuralFooter;
