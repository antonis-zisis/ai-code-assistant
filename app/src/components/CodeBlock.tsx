import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeBlockProps = {
  code: string;
  language: string;
};

export function CodeBlock({ code, language }: CodeBlockProps) {
  return (
    <SyntaxHighlighter language={language} style={atomDark} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
}
