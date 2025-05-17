import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import './App.css';

function App() {
  const examples = {
    'If-Else': `x = 10\nif x > 5:\n    print("x is greater than 5")\nelse:\n    print("x is 5 or less")`,
    'Loops': `for i in range(5):\n    print("Loop iteration", i)`,
    'Functions': `def greet(name):\n    print("Hello", name)\n\ngreet("Alice")`
  };

  const [code, setCode] = useState('print("Hello, young coder!")');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleRun = async () => {
    try {
      const response = await axios.post('https://code-editor-backend-xyst.onrender.com/api/execute/', {
        code,
        input,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  const handleClear = () => {
    setCode('');
  };

  const handleExampleChange = (e) => {
    const selected = e.target.value;
    if (examples[selected]) {
      setCode(examples[selected]);
    }
  };

  return (
    <div className="container">
      <h1>🧑‍💻 Code Playground</h1>

      {/* Example Selector */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Select an Example: </label>
        <select onChange={handleExampleChange} defaultValue="">
          <option value="" disabled>Select...</option>
          {Object.keys(examples).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Editor */}
      <Editor
        height="300px"
        language="python"
        value={code}
        onChange={(value) => setCode(value)}
      />

      {/* Input Area */}
      <textarea
        placeholder="Enter input (if needed)..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Buttons */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleRun}>Run Code</button>
        <button onClick={handleClear} style={{ marginLeft: '10px' }}>Clear Code</button>
      </div>

      {/* Output */}
      <div className="output-box">
        <strong>Output:</strong>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
