import axios from 'axios';
import { useState } from 'react';

import { CodeBlock } from './components/CodeBlock';
import { parseResponse } from './utils/utils';

export function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/ai', {
        prompt: trimmedPrompt,
      });

      console.log(res.data);
      setResponse(res.data.choices[0].message.content);
      setPrompt('');
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="Enter your coding question..."
          className="w-full h-32 p-4 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={!prompt.trim() || loading}
          className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            !prompt.trim() || loading
              ? 'bg-gray-300 text-gray-700 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Loading...' : 'Ask AI'}
        </button>
      </form>

      {loading && (
        <div className="flex justify-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {response &&
        parseResponse(response).map((block, idx) =>
          block.type === 'code' ? (
            <CodeBlock key={idx} code={block.content} language="javascript" />
          ) : (
            <p key={idx} className="mb-4 text-gray-800 whitespace-pre-wrap">
              {block.content}
            </p>
          ),
        )}
    </div>
  );
}
