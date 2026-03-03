import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileSearch, Sparkles, FileText } from 'lucide-react';
import Cursor from './components/Cursor';
import Analyzer from './components/Analyzer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [extractedData, setExtractedData] = useState(null);

  // Framer motion variants for page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    out: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <Cursor />

      {/* Decorative Background Elements */}
      <div style={{ position: 'fixed', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }}></div>
      <div style={{ position: 'fixed', bottom: '10%', right: '5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: -1 }}></div>

      <Navbar />

      <main style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.div
          variants={pageVariants}
          initial="initial"
          animate="in"
          className="w-full"
          style={{ maxWidth: '1000px', width: '100%' }}
        >
          <Analyzer onDataExtracted={setExtractedData} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
