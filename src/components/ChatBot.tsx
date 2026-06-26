import React, { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:8000/api/chat/";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{
    role: "assistant",
    content: "Salam! I'm your Physical AI textbook tutor. Ask me anything about the course!",
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          session_id: sessionId,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setSessionId(data.session_id);
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't reach the AI tutor. Make sure the backend is running." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "360px",
            height: "500px",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            border: "1px solid #e0e0e0",
          }}
        >
          <div
            style={{
              padding: "12px 16px",
              background: "var(--ifm-color-primary, #0056b3)",
              color: "#fff",
              borderRadius: "12px 12px 0 0",
              fontWeight: 600,
            }}
          >
            AI Textbook Tutor
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  background: msg.role === "user" ? "var(--ifm-color-primary, #0056b3)" : "#f0f0f0",
                  color: msg.role === "user" ? "#fff" : "#333",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  maxWidth: "85%",
                  fontSize: "14px",
                  lineHeight: 1.4,
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", color: "#999", fontSize: "14px" }}>
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: "8px 12px", borderTop: "1px solid #e0e0e0", display: "flex", gap: "8px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about the textbook..."
              disabled={loading}
              style={{
                flex: 1,
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "20px",
                outline: "none",
                fontSize: "14px",
              }}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              style={{
                background: "var(--ifm-color-primary, #0056b3)",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "var(--ifm-color-primary, #0056b3)",
          color: "#fff",
          border: "none",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>
    </>
  );
}
