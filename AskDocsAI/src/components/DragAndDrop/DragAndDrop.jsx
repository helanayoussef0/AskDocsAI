import React from 'react';
import { useDropzone } from 'react-dropzone';
import './DragAndDrop.scss';

const DragAndDrop = ({ onFileUpload }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {'text/plain': ['.txt']},
    onDrop: acceptedFiles => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => onFileUpload(reader.result);
      reader.readAsText(file);
    }
  });

  return (
    <div className="drag-drop">
      <div {...getRootProps({ className: `dropzone ${isDragActive ? 'active' : ''}` })}>
        <input {...getInputProps()} />
        <p className="dropzone__prompt">
          {isDragActive ? 'Drop the file here' : 'Drag & drop document, or click to select'}
        </p>
      </div>
      <button className="analyze-button" onClick={() => {}}>
        Analyze Document
      </button>
    </div>
  );
};

export default DragAndDrop;