import axios from 'axios';
import { useState, useRef, useEffect } from 'react';

import { CodeBlock } from './components/CodeBlock';
import { Header } from './components/Header';
import { parseResponse } from './utils/utils';

export function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    setMessages((prev) => [
      ...prev,
      { sender: 'user', content: trimmedPrompt },
    ]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/ai', {
        prompt: trimmedPrompt,
      });
      const aiResponse = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header />

      {/* Centered chat area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
        <div className="w-full max-w-3xl space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`p-4 rounded-lg max-w-full whitespace-pre-wrap break-words ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                {parseResponse(msg.content).map((block, idx) =>
                  block.type === 'code' ? (
                    <CodeBlock
                      key={idx}
                      code={block.content}
                      language="javascript"
                    />
                  ) : (
                    <p key={idx} className="mb-2">
                      {block.content}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-gray-700 text-gray-100">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-400 mx-auto"></div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Centered input */}
      <footer className="px-4 py-4 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl flex items-end gap-2"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-600 bg-gray-700 text-white rounded resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className={`h-10 px-4 rounded ${
              !prompt.trim() || loading
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
