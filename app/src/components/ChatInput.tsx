import axios from 'axios';

const systemPrompt = {
  sender: 'system',
  content: `
    You are a helpful AI assistant who answers coding questions clearly and
    concisely. Always respond using Markdown formatting. Use code blocks,
    bullet points, and other markdown syntax where appropriate.
  `,
};

type Message = {
  sender: 'user' | 'ai';
  content: string;
};

type ChatInputProps = {
  isLoading: boolean;
  messages: Array<Message>;
  prompt: string;
  setIsLoading: (arg: boolean) => void;
  setMessages: React.Dispatch<React.SetStateAction<Array<Message>>>;
  setPrompt: (arg: string) => void;
};

export function ChatInput({
  isLoading,
  messages,
  prompt,
  setIsLoading,
  setMessages,
  setPrompt,
}: ChatInputProps) {
  const handleSubmit = async () => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return;
    }

    const newUserMessage = { sender: 'user' as const, content: trimmedPrompt };

    setMessages((prev) => [...prev, newUserMessage]);
    setPrompt('');
    setIsLoading(true);

    try {
      const updatedMessages = [systemPrompt, ...messages, newUserMessage].map(
        (msg) => ({
          role: msg.sender === 'ai' ? 'assistant' : msg.sender,
          content: msg.content,
        }),
      );

      const res = await axios.post('http://localhost:3001/api/ai', {
        messages: updatedMessages,
      });

      const aiResponse = res.data.choices[0].message.content;

      setMessages((prev) => [...prev, { sender: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();

      if (!isLoading && prompt.trim()) {
        handleSubmit();
      }
    }
  };

  return (
    <footer className="px-4 py-4 flex justify-center">
      <form
        className="w-full max-w-3xl flex items-end gap-2"
        onSubmit={(event) => event.preventDefault()}
      >
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message and press Enter to send. Shift+Enter for newline."
          className="flex-1 p-3 border border-gray-600 bg-gray-700 text-white rounded resize-none h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </footer>
  );
}
