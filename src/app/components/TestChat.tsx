/* TEST-CHAT (removable) -------------------------------------------------------
 *
 * Floating chat panel wired to the backend POST /api/chat (LLM chat completion).
 * Built for manual testing of the chat-completion gateway.
 *
 * TO REMOVE AFTER TESTING:
 *   1. delete this file (src/app/components/TestChat.tsx)
 *   2. delete the two lines marked "TEST-CHAT" in src/app/App.tsx
 * --------------------------------------------------------------------------- */
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';

type Msg = { role: 'user' | 'assistant'; content: string };

// Dev (vite @5173) talks to the backend @8000; in the single-image build the
// API is same-origin so the base is empty. Override with VITE_CHAT_API if needed.
const API_BASE =
  (import.meta.env.VITE_CHAT_API as string | undefined) ??
  // In the Vite dev server (any port) talk to the backend on :8000.
  // In the production single-image build the API is same-origin (empty base).
  (import.meta.env.DEV ? 'http://localhost:8000' : '');

export function TestChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setError('');
    const next = [...messages, { role: 'user', content: text } as Msg];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'request failed');
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open test chat"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col w-[360px] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-indigo-600 text-white">
        <span className="font-medium">Test Chat</span>
        <button onClick={() => setOpen(false)} aria-label="Close chat" className="hover:opacity-80">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-sm text-gray-400 text-center mt-8">Ask the model anything…</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
              m.role === 'user'
                ? 'ml-auto bg-indigo-600 text-white rounded-br-sm'
                : 'mr-auto bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
            }`}
          >
            {m.content}
          </div>
        ))}
        {loading && (
          <div className="mr-auto flex items-center gap-2 text-gray-400 text-sm px-3 py-2">
            <Loader2 className="w-4 h-4 animate-spin" /> thinking…
          </div>
        )}
        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message…"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 transition"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
