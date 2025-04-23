import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  code: string;
  language?: string;
};

export function CodeBlock({ code, language }: CodeBlockProps) {
  const match = code.match(/^(\w+)\n([\s\S]*)/);

  let detectedLanguage = language || 'text';
  let formattedCode = code;

  if (match) {
    detectedLanguage = match[1];
    formattedCode = match[2];
  }

  return (
    <div className="my-4 rounded overflow-hidden border border-gray-700 bg-gray-900">
      <div className="bg-gray-800 text-gray-300 text-xs font-mono px-3 py-1">
        {detectedLanguage}
      </div>

      <SyntaxHighlighter
        language={detectedLanguage}
        style={atomDark}
        showLineNumbers
        customStyle={{ margin: 0, background: 'transparent' }}
      >
        {formattedCode}
      </SyntaxHighlighter>
    </div>
  );
}
