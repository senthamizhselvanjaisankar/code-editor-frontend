import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './App.css';

function App() {
  const [code, setCode] = useState('print("Hello, young coder!")');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/execute/', {
        code,
        input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>🧑‍💻 Code Playground</h1>
      
      <Editor
        height="300px"
        language="python"
        value={code}
        onChange={(value) => setCode(value)}
      />

      <textarea
        placeholder="Enter input (if needed)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleRun}>Run Code</button>

      <div className="output-box">
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
