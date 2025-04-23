import axios from 'axios';

type Message = {
  sender: 'user' | 'ai';
  content: string;
};

type ChatInputProps = {
  isLoading: boolean;
  prompt: string;
  setIsLoading: (arg: boolean) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setPrompt: (arg: string) => void;
};

export function ChatInput({
  isLoading,
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

    setMessages((prev) => [
      ...prev,
      { sender: 'user', content: trimmedPrompt },
    ]);
    setPrompt('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/ai', {
        prompt: trimmedPrompt,
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
