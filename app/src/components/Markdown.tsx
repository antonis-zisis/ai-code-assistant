import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownProps = {
  content: string;
};

export function Markdown({ content }: MarkdownProps) {
  return (
    <div className="text-base leading-relaxed space-y-2">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ children }) {
            return <h1 className="text-3xl font-bold mt-6 mb-2">{children}</h1>;
          },
          h2({ children }) {
            return (
              <h2 className="text-2xl font-semibold mt-6 mb-2">{children}</h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="text-lg font-medium mt-4 mb-2">{children}</h4>
            );
          },
          h5({ children }) {
            return (
              <h5 className="text-base font-medium mt-4 mb-2">{children}</h5>
            );
          },
          h6({ children }) {
            return (
              <h6 className="text-sm font-medium mt-4 mb-2">{children}</h6>
            );
          },
          code({ children }) {
            return (
              <code className="bg-gray-800 px-1 py-0.5 rounded text-sm text-gray-100 font-mono">
                {children}
              </code>
            );
          },
          ul({ children }) {
            return <ul className="list-disc pl-5">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-5">{children}</ol>;
          },
          li({ children }) {
            return <li className="mb-0">{children}</li>;
          },
          p({ children }) {
            return <p className="mb-2">{children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
