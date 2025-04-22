import axios from 'axios';
import { useState } from 'react';

export function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await axios.post('http://localhost:3001/api/ai', { prompt });
    setResponse(res.data.choices[0].message.content);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Enter your coding question..."
        />

        <button type="submit">Ask AI</button>
      </form>

      <pre>{response}</pre>
    </div>
  );
}
