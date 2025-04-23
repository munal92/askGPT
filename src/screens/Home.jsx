import { useState } from "react";
import {
  Paperclip,
  Globe,
  Lightbulb,
  MessageCircleQuestion,
} from "lucide-react";
import NotificationHandler from "../helpers/NotificationHandler";

function Home() {
  const [input, setInput] = useState("");
  const [apiAiResponse, setApiAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setApiAiResponse("");
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputText: input }),
      });

      const data = await res.json();
      if (data.reply === undefined) {
        throw new Error("No reply in response");
      }
      setApiAiResponse(data.reply);
    } catch (err) {
      console.error("Error:", err);
      setApiAiResponse("⚠️ Failed to get a response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="absolute top-4 left-4 text-lg font-semibold text-gray-800">
        AskGPT
      </div>

      <h1 className="text-2xl font-semibold mb-6">What can I help with?</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-4 rounded-3xl shadow-lg bg-white flex flex-col gap-3"
      >
        <div className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything"
            className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-28 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-4 py-2 rounded-xl flex items-center gap-1"
          >
            Ask
            <MessageCircleQuestion size={14} />
          </button>
        </div>

        <div className="flex gap-2 justify-start">
          <ActionButton
            icon={<Paperclip size={14} />}
            label="Attach"
            onClick={() => {
              setShowNotification(true);
            }}
          />
          <ActionButton
            icon={<Globe size={14} />}
            label="Search"
            onClick={() => {
              setShowNotification(true);
            }}
          />
          <ActionButton
            icon={<Lightbulb size={14} />}
            label="Reason"
            onClick={() => {
              setShowNotification(true);
            }}
          />
        </div>
      </form>

      {loading ? (
        <p className="mt-4 text-gray-500 italic">Thinking...</p>
      ) : apiAiResponse ? (
        <div className="mt-4 max-w-2xl bg-gray-50 border border-gray-200 rounded-xl p-4 shadow text-sm text-gray-700">
          <strong>GPT:</strong> {apiAiResponse}
        </div>
      ) : null}
      <NotificationHandler
        message="🚧 This feature is in progress. Stay tuned!"
        show={showNotification}
        onClose={() => setShowNotification(false)}
        type="info"
      />
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      className="flex items-center gap-1 border border-gray-300 text-sm px-3 py-1.5 rounded-full hover:bg-gray-100"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

export default Home;
