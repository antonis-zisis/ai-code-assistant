import { useState, useRef, useEffect } from 'react';

import { ChatInput } from './components/ChatInput';
import { CodeBlock } from './components/CodeBlock';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { parseResponse } from './utils/utils';

export function App() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'ai'; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
      <Header />

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

          {isLoading ? <Loading /> : null}

          <div ref={chatEndRef} />
        </div>
      </main>

      <ChatInput
        isLoading={isLoading}
        prompt={prompt}
        setIsLoading={setIsLoading}
        setMessages={setMessages}
        setPrompt={setPrompt}
      />
    </div>
  );
}
