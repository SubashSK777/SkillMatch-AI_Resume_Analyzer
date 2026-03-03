import React from 'react';
import { motion } from 'framer-motion';
import { Layers, FileSearch } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '1.5rem 3rem',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      background: 'rgba(5, 5, 5, 0.6)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ background: 'var(--accent)', padding: '0.5rem', borderRadius: '8px' }}>
          <Layers size={24} color="#fff" />
        </div>
        <h1 style={{ fontSize: '1.5rem', margin: 0, background: 'linear-gradient(90deg, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          SkillMatch AI
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
