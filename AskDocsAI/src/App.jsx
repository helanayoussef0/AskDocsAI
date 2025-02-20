import { useState } from 'react'
import DragAndDrop from './components/DragAndDrop/DragAndDrop';
import AIChat from './components/AIChat/AIChat';
//import './App.css'

function App() {
  const [documentContent, setDocumentContent] = useState(null);

  return (
    <div className="app">
      <h1>DocumentQA Pro</h1>
      <DragAndDrop onFileUpload={setDocumentContent} />
      {documentContent && <AIChat />}
    </div>
  );
}

export default App;
