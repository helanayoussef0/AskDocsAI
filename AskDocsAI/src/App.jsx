import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import AIChat from './components/AIChat/AIChat';
import './App.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [documentContent, setDocumentContent] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [error, setError] = useState(null);

  const handleFileUpload = (content, fileName) => {
    setDocumentContent(content);
    setUploadedFileName(fileName);
    setIsAnalyzed(false);
    setShowSuccess(false);
    setError(null);
  };

  const handleAnalyze = async (content) => {
    try {
      setError(null);
      console.log('Analyzing document:', content.slice(0, 100) + '...');
      
      const response = await fetch(`${API_URL}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          filename: uploadedFileName
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze document');
      }

      const data = await response.json();
      
      if (data.success) {
        setIsAnalyzed(true);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error analyzing document:', error);
      setError(error.message);
      setIsAnalyzed(false);
    }
  };

  return (
    <div className="app">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        AskDocsAI
      </motion.h1>

      <DragAndDrop 
        onFileUpload={handleFileUpload}
        onAnalyze={handleAnalyze} 
      />

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            className="success-message"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="success-content">
              <svg 
                className="success-icon"
                viewBox="0 0 24 24" 
              >
                <path d="M20 6L9 17L4 12" />
              </svg>
              Document analyzed successfully!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && (
          <motion.div 
            className="error-message"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0, transition: { duration: 0.3 } }}
          >
            <div className="error-content">
              <svg 
                className="error-icon"
                viewBox="0 0 24 24" 
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {documentContent && isAnalyzed && <AIChat documentContent={documentContent} />}
    </div>
  );
}

export default App;
