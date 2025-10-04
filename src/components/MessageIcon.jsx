import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Copy } from "lucide-react";
import SiaImage from "../assets/Sia.jpeg";

const MessageIcon = ({ role }) => (
  <div
    className={`flex-shrink-0 ${
      role === "assistant" ? "bg-[#f97316]" : "bg-[#585c6c]"
    } rounded-full w-20 h-20 flex items-center justify-center shadow-lg ring-1 ring-white/10 overflow-hidden`}
  >
    {role === "assistant" ? (
      <img src={SiaImage} alt="SIA" className="w-full h-full object-cover" />
    ) : (
      <User className="w-5 h-5 text-white/90" />
    )}
  </div>
);

const CopyButton = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="opacity-0 group-hover:opacity-100 absolute top-0 right-0 text-gray-400 hover:text-gray-200 p-2 rounded-lg transition-all duration-200 hover:bg-gray-700/50"
      title={copied ? "Copied!" : "Copy message"}
    >
      <Copy className={`h-5 w-5 ${copied ? "text-green-400" : ""}`} />
    </button>
  );
};

const ChatMessage = ({ msg }) => {
  // Determine alignment based on role for the "LLM-like" fixed structure
  const isAssistant = msg.role === "assistant";
  const bgColor = isAssistant ? "bg-[#444654]" : "bg-[#343541]";

  return (
    <div
      className={`w-full ${bgColor} py-6 transition-all duration-200 hover:bg-opacity-90 group`}
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex gap-4 relative group">
          <MessageIcon role={msg.role} />
          <div className="flex-1 min-w-0 space-y-1">
            <div className="prose prose-invert max-w-none">
              <div
                className="text-gray-100 leading-7 text-[16px]"
                style={{
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {/* Logic to render bold text from **markdown** */}
                {msg.content.split("**").map((part, i) =>
                  i % 2 === 0 ? (
                    <span key={i}>{part}</span>
                  ) : (
                    <strong key={i} className="font-semibold text-white">
                      {part}
                    </strong>
                  )
                )}
              </div>
            </div>
            {/* Only show copy button for assistant messages */}
            {isAssistant && <CopyButton content={msg.content} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Chatbot Component ---

export default function AIDoctorChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm SIA. I provide concise, precise health information. Not a substitute for professional medical care. How can I help?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Prevent scroll propagation to parent elements
  const handleWheel = (e) => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isScrollingUp = e.deltaY < 0;
    const isScrollingDown = e.deltaY > 0;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // Prevent scroll bubbling when we can still scroll within the container
    if ((isScrollingUp && !isAtTop) || (isScrollingDown && !isAtBottom)) {
      e.stopPropagation();
    }
  };

  // Handle touch events for mobile scrolling
  const handleTouchStart = (e) => {
    e.stopPropagation();
  };

  const handleTouchMove = (e) => {
    e.stopPropagation();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // NOTE: Using a placeholder model, replace with a valid Groq or OpenAI model
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-120b", // Changed to a common Groq model, update as needed
            messages: [
              {
                role: "system",
                content: `You are an AI Medical Assistant providing concise, clear medical information in 5-7 lines. Only expand with details when specifically asked.

RESPONSE STRUCTURE:
1. First line: Direct answer to the question
2. Next 3-5 lines: Key points or brief explanation
3. Final line: Important medical disclaimer or advice

FORMAT RULES:
• Keep responses within 5-7 lines unless details are requested
• Use **bold** for medical terms
• Use simple language with medical terms explained
• No tables or complex formatting
• Add "🚨" before urgent warnings

MEDICAL FOCUS:
• Only answer medical/health questions
• For non-medical queries: "I'm a specialized Medical Assistant focused on health topics. I cannot assist with [topic], but I'm happy to help with medical questions."
• Emergency response: Immediate, clear direction to seek medical care

WHEN DETAILS REQUESTED:
• Organize with clear headers
• Break into digestible sections
• Maintain medical accuracy
• Keep explanations accessible

SAFETY:
• Never diagnose
• Encourage professional consultation
• Flag emergencies clearly
• Stay within medical scope

IMPORTANT: Default to concise 5-7 line responses unless specifically asked for more detail. Keep information accurate, clear, and actionable.`,
              },
              ...messages,
              userMessage,
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (!data.choices?.[0]?.message?.content) {
        throw new Error(
          "Invalid response from API: No message content received"
        );
      }

      const assistantMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = error.message.includes("API Error")
        ? "API connection failed. Please check your API key and try again."
        : "I apologize, but I encountered an error. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea logic
  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className="flex flex-col h-full bg-[#343541] antialiased chatbot-container">
      {/* Header (Fixed Position) */}
      <div className="bg-[#343541]/80 backdrop-blur-sm px-4 py-3 border-b border-gray-800/50 flex-shrink-0">
        <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="bg-[#f97316] rounded-full w-16 h-16 shadow-lg ring-1 ring-[#f97316]/20 overflow-hidden">
              <img
                src={SiaImage}
                alt="SIA"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-100">SIA</h1>
              <p className="text-xs text-gray-400 font-medium">
                Powered by Bharat cure +
              </p>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-gray-400 hover:text-gray-200 text-sm px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-all duration-200 font-medium"
          >
            New Chat
          </button>
        </div>
      </div>

      {/* Messages (Scrollable Body - Fixed Max Width) */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto scroll-smooth py-4 chatbot-messages"
        style={{ touchAction: "pan-y" }}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} msg={msg} />
        ))}
        {isLoading && (
          <div className="w-full bg-[#444654] py-6">
            <div className="max-w-3xl mx-auto px-4">
              <div className="flex gap-4">
                <div className="bg-[#f97316] rounded-full w-20 h-20 shadow-lg ring-1 ring-white/10 overflow-hidden">
                  <img
                    src={SiaImage}
                    alt="SIA"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Loader2 className="w-4 h-4 text-[#f97316] animate-spin" />
                  <span className="text-gray-300 text-sm font-medium">
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input (Fixed Position at Bottom - Fixed Max Width) */}
      <div className="bg-gradient-to-t from-[#343541] via-[#343541] to-transparent px-4 py-4 border-t border-gray-800/50 flex-shrink-0">
        <div className="max-w-3xl mx-auto w-full">
          <div className="relative">
            <div className="bg-[#40414f] rounded-xl shadow-lg border border-gray-700 focus-within:border-[#fb923c] focus-within:ring-[#fb923c]/20 focus-within:ring-4 transition-all duration-300 hover:border-gray-600 hover:shadow-xl">
              <div className="flex items-end gap-3 p-2">
                <textarea
                  value={input}
                  onChange={handleInput}
                  onKeyPress={handleKeyPress}
                  placeholder="Message SIA..."
                  className="flex-1 max-h-36 min-h-[2.5rem] bg-transparent outline-none text-gray-100 placeholder-gray-500 text-[16px] resize-none py-2 px-3 font-medium"
                  disabled={isLoading}
                  rows={1}
                  style={{
                    height: "auto",
                    overflow: "hidden",
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#f97316] text-white/90 p-2 rounded-lg hover:bg-[#ea580c] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:scale-105"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-500/80 mt-3 text-center px-4">
              This chatbot provides general information only. Always consult a
              healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
