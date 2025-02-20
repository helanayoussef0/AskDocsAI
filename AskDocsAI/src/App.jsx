import { useState } from 'react'
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import AIChat from './components/AIChat/AIChat';
import './App.scss';

function App() {
  const [documentContent, setDocumentContent] = useState(null);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = (content) => {
    setDocumentContent(content);
    setIsAnalyzed(false);
    setShowSuccess(false);
  };

  const handleAnalyze = async (content) => {
    try {
      console.log('Analyzing document:', content.slice(0, 100) + '...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsAnalyzed(true);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error analyzing document:', error);
    }
  };

  return (
    <div className="app">
      <h1>AskDocsAI</h1>
      <DragAndDrop 
        onFileUpload={handleFileUpload}
        onAnalyze={handleAnalyze} 
      />
      {showSuccess && (
        <div className="success-message">
          <div className="success-content">
            <svg 
              className="success-icon"
              viewBox="0 0 24 24" 
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
            Document analyzed successfully!
          </div>
        </div>
      )}
      {documentContent && isAnalyzed && <AIChat />}
    </div>
  );
}

export default App;
