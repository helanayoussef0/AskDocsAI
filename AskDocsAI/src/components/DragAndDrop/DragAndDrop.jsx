import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiFile, FiX } from 'react-icons/fi';
import './DragAndDrop.scss';

const DragAndDrop = ({ onFileUpload, onAnalyze }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {'text/plain': ['.txt']},
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      setUploadedFile({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        type: file.type
      });

      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        setFileContent(content);
        onFileUpload(content, file.name);
      };
      reader.readAsText(file);
    }
  });

  const handleRemove = () => {
    setUploadedFile(null);
    setFileContent(null);
    onFileUpload(null, null);
  };

  const handleAnalyze = async () => {
    if (!fileContent) return;
    
    try {
      setIsAnalyzing(true);
      await onAnalyze(fileContent);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="drag-drop">
      <div {...getRootProps({ 
        className: `dropzone ${isDragActive ? 'active' : ''} ${uploadedFile ? 'has-file' : ''}`
      })}>
        <input {...getInputProps()} />
        
        {uploadedFile ? (
          <div className="file-info">
            <FiFile className="file-icon" />
            <div className="file-details">
              <span className="file-name">{uploadedFile.name}</span>
              <span className="file-size">{uploadedFile.size}</span>
            </div>
            <button 
              type="button" 
              className="remove-button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <FiX />
            </button>
          </div>
        ) : (
          <p className="dropzone__prompt">
            {isDragActive ? 'Drop the file here' : 'Drag & drop document, or click to select'}
          </p>
        )}
      </div>
      <button 
        className="analyze-button" 
        disabled={!uploadedFile || isAnalyzing}
        onClick={handleAnalyze}
      >
        {isAnalyzing ? 'Analyzing...' : 'Analyze Document'}
      </button>
    </div>
  );
};

export default DragAndDrop;