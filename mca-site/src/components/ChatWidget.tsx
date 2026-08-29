"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content: "Hi, dealing with MCA payments that feel like too much? I can get some quick info and have a consultant call you. What's your business called?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const conversationId = useRef<string>(crypto.randomUUID());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  // Proactive nudge: most visitors never notice a static chat bubble.
  // Surface a short invite a few seconds in, dismissible, gone for good
  // once they've opened the chat once.
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(t);
  }, []);

  async function send() {
    const text = input.trim();
    if (!text || sending) return;

    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, conversationId: conversationId.current }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((m) => [
          ...m,
          { role: "assistant", content: data.error || "Something went wrong, try the form below instead." },
        ]);
      } else {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
        if (data.leadCaptured) setLeadCaptured(true);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection hiccup, mind trying again?" },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      {!open && showTooltip && (
        <div className="fixed bottom-24 right-5 z-50 flex max-w-[220px] items-start gap-2 rounded-xl bg-white px-4 py-3 text-sm text-ink shadow-[0_10px_30px_-10px_rgba(11,18,32,0.3)] animate-[popIn_0.2s_ease-out] sm:bottom-28">
          <span>👋 Dealing with MCA payments? I can help, just ask.</span>
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss"
            className="text-ink/40 hover:text-ink"
          >
            <X size={14} />
          </button>
        </div>
      )}
      <button
        onClick={() => {
          setOpen((o) => !o);
          setShowTooltip(false);
        }}
        aria-label={open ? "Close chat" : "Open chat"}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber text-ink shadow-[0_10px_30px_-10px_rgba(11,18,32,0.5)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-3 focus-visible:outline-ink sm:h-16 sm:w-16 ${
          open ? "" : "chat-bubble-pulse"
        }`}
      >
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-ink" />
        )}
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 4h16v12H8l-4 4V4z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 flex h-[520px] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-20px_rgba(11,18,32,0.45)]">
          <div className="flex items-center justify-between border-b border-line bg-ink px-4 py-3.5 text-white">
            <div>
              <div className="display text-sm font-semibold">Funding Assistant</div>
              <div className="text-xs text-white/60">Usually replies instantly</div>
            </div>
            {leadCaptured && (
              <span className="rounded-full bg-amber px-2.5 py-1 text-[11px] font-semibold text-ink">
                Got it ✓
              </span>
            )}
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-amber text-ink"
                    : "bg-paper-2 text-ink"
                }`}
              >
                {m.content}
              </div>
            ))}
            {sending && (
              <div className="max-w-[60%] rounded-xl bg-paper-2 px-3.5 py-2.5 text-sm text-ink/50">
                typing…
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-line p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              maxLength={2000}
              className="flex-1 rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-white disabled:opacity-40"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
