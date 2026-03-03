import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, AlertTriangle, Briefcase, Zap, Star } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfExtractor';

const Analyzer = ({ onDataExtracted }) => {
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [results, setResults] = useState(null);
    const [activeResTab, setActiveResTab] = useState('summary');

    const handleUpload = async (e) => {
        const uploadedFile = e.target.files[0];
        if (!uploadedFile || uploadedFile.type !== 'application/pdf') {
            alert("Please upload a valid PDF file.");
            return;
        }

        setFile(uploadedFile);
        setIsProcessing(true);
        setResults(null);
        setProgress(10);

        try {
            // 1. Extract Text
            const text = await extractTextFromPDF(uploadedFile);
            setProgress(30);

            // 2. Puter AI for Summary
            const summaryPrompt = `Analyze the following resume and provide a detailed summary and conclusion:\n\n${text.substring(0, 15000)}`;
            const summaryResponse = await window.puter.ai.chat(summaryPrompt);
            const summary = summaryResponse.message.content;
            setProgress(50);

            // 3. Puter AI for Strengths
            const strengthPrompt = `Based on the following resume summary, what are the key strengths? Provide a detailed list.\n\n${summary}`;
            const strengthResponse = await window.puter.ai.chat(strengthPrompt);
            const strengths = strengthResponse.message.content;
            setProgress(70);

            // 4. Puter AI for Weaknesses and Real-time corrections (trending tech)
            const weaknessPrompt = `Analyze the weakness of this resume based on current trending tech skills, and suggest how to improve it. What should they learn based on their domain?:\n\n${text.substring(0, 15000)}`;
            const weaknessResponse = await window.puter.ai.chat(weaknessPrompt);
            const weaknesses = weaknessResponse.message.content;
            setProgress(85);

            // 5. Puter AI for Job Titles
            const jobsPrompt = `What are the top 5 most suitable job roles and career paths for this candidate? 
            Return a comma separated list of "Role Name | Why it fits". 
            Resume Text:\n\n${text.substring(0, 15000)}`;
            const jobsResponse = await window.puter.ai.chat(jobsPrompt);
            const jobs = jobsResponse.message.content;
            setProgress(100);

            const parsedResults = { summary, strengths, weaknesses, jobs };
            setResults(parsedResults);
            
            if (onDataExtracted) onDataExtracted(jobs);

        } catch (error) {
            console.error("Analysis Error:", error);
            alert("Error occurred during analysis. Make sure you are logged in to puter.js.");
        } finally {
            setIsProcessing(false);
            setProgress(0);
        }
    };

    const getIcon = (tab) => {
        if (tab === 'summary') return <FileText size={18} />;
        if (tab === 'strengths') return <CheckCircle size={18} />;
        if (tab === 'weaknesses') return <AlertTriangle size={18} />;
        if (tab === 'jobs') return <Star size={18} />;
    };

    return (
        <div className="glass-panel" style={{ padding: '3rem', minHeight: '60vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }} className="text-gradient">
                    AI Resume Intelligence
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                    Unlock deep insights into your career potential. Our AI identifies your core strengths and suggests the most high-impact career paths tailored to your experience.
                </p>
            </div>

            {!results && !isProcessing && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    role="button"
                    tabIndex={0}
                    style={{
                        border: '2px dashed var(--glass-border)',
                        borderRadius: '16px',
                        padding: '4rem',
                        textAlign: 'center',
                        background: 'rgba(0,0,0,0.2)',
                        cursor: 'pointer',
                        transition: 'border 0.3s, background 0.3s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(249, 115, 22, 0.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.background = 'rgba(0,0,0,0.2)'; }}
                    onClick={() => document.getElementById('resume-upload').click()}
                >
                    <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                    />
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        style={{ background: 'var(--accent)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 4px 20px rgba(249,115,22,0.4)' }}
                    >
                        <UploadCloud size={32} color="#fff" />
                    </motion.div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Upload Resume</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Identify your strengths and career fit instantly</p>
                </motion.div>
            )}

            {isProcessing && (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div className="spinner" style={{ margin: '0 auto 2rem', width: '48px', height: '48px', borderWidth: '4px' }}></div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>AI is analyzing your career DNA...</h3>
                    <div style={{ width: '100%', maxWidth: '400px', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', margin: '0 auto', overflow: 'hidden' }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                        style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent), #ff9c3a)' }}
            />
                    </div>
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{progress}% Complete</p>
                </div>
            )}

            {results && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', overflowX: 'auto' }}>
                        {['summary', 'strengths', 'weaknesses', 'jobs'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveResTab(tab)}
                                style={{
                                    background: activeResTab === tab ? 'var(--accent)' : 'transparent',
                                    color: activeResTab === tab ? '#fff' : 'var(--text-secondary)',
                                    border: '1px solid',
                                    borderColor: activeResTab === tab ? 'var(--accent)' : 'rgba(255,255,255,0.1)',
                                    boxShadow: activeResTab === tab ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {getIcon(tab)}
                                {tab === 'jobs' ? 'Recommended Roles' : tab}
                            </button>
                        ))}
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeResTab}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#e5e5e5' }}
                            >
                                {activeResTab === 'jobs' ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                        {results.jobs.split(',').map((jobStr, idx) => {
                                            const [role, reason] = jobStr.split('|').map(s => s.trim());
                                            return (
                                                <div 
                                                    key={idx}
                                                    style={{ 
                                                        padding: '1.5rem', 
                                                        background: 'rgba(255,255,255,0.03)',
                                                        border: '1px solid var(--glass-border)',
                                                        borderRadius: '16px'
                                                    }}
                                                >
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                                        <div style={{ color: 'var(--accent)' }}>
                                                            <Zap size={20} />
                                                        </div>
                                                        <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>{role}</h3>
                                                    </div>
                                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                                        {reason || 'This role matches your skill set and experience profile.'}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    results[activeResTab].split('\n').map((line, i) => {
                                        if (line.startsWith('#') || line.startsWith('**')) {
                                            return <strong key={i} style={{ color: '#fff', fontSize: '1.1rem', display: 'block', marginTop: '1rem' }}>{line.replace(/\*\*/g, '').replace(/#/g, '')}</strong>
                                        }
                                        return <React.Fragment key={i}>{line}<br /></React.Fragment>;
                                    })
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        <button className="secondary" onClick={() => setResults(null)}>
                            Upload New Resume
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Analyzer;
