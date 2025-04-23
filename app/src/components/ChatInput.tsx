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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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

  return (
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
          disabled={!prompt.trim() || isLoading}
          className={`h-10 px-4 rounded ${
            !prompt.trim() || isLoading
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Send
        </button>
      </form>
    </footer>
  );
}
