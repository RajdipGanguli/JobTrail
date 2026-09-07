import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, X, Bot, RefreshCw, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const QUICK_ACTIONS = [
  { label: "⚡ Draft Follow-up Email", prompt: "Help me write a concise post-interview thank you and follow-up email to the hiring manager." },
  { label: "🎯 Mock Interview Tip", prompt: "Give me 3 top tips for answering 'Tell me about a time you resolved a difficult technical disagreement' using STAR framework." },
  { label: "📊 Pipeline Status Check", prompt: "How should I structure and prioritize my current job search pipeline this week?" },
];

export default function AiAssistant() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hey there! I'm TrailBot, your career & interview copilot. I can help review resume bullets, draft interview follow-up emails, or optimize your application pipeline. What are you working on today?",
      time: "Just now",
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  const generateAiReply = (query) => {
    const q = query.toLowerCase();

    if (q.includes("follow-up") || q.includes("thank you") || q.includes("email")) {
      return (
        "Here is a high-converting post-interview follow-up template:\n\n" +
        "Subject: Thank you - [Role Title] Interview - [Your Name]\n\n" +
        "Hi [Interviewer Name],\n\n" +
        "Thank you so much for your time today discussing the [Role Title] position. I really enjoyed learning about [specific project or challenge discussed, e.g., your distributed caching migration].\n\n" +
        "Our conversation reinforced my excitement about joining [Company Name]. I'm confident my background in [mention your key strength] will help the team achieve [mention a target goal].\n\n" +
        "Please let me know if you need any additional samples or references. Looking forward to the next steps!\n\n" +
        "Best regards,\n" +
        (user?.name || "[Your Name]")
      );
    }

    if (q.includes("star") || q.includes("interview tip") || q.includes("disagreement") || q.includes("question")) {
      return (
        "Here is a proven formula using the STAR framework for behavioral rounds:\n\n" +
        "1. Situation (15%): Set the scene briefly. Mention the team, project scope, and context.\n" +
        "2. Task (15%): Identify the core conflict or architectural bottleneck you needed to resolve.\n" +
        "3. Action (50%): Detail your specific steps—focus on data-driven reasoning, prototype benchmarks, and cross-functional consensus building rather than ego.\n" +
        "4. Result (20%): Quantify the impact (e.g., 'reduced latency by 32%', 'delivered on schedule without rollbacks').\n\n" +
        "💡 Pro Tip: Frame technical disagreements as collaborative experiments: 'Let's write a quick spike to measure both approaches with realistic load.'"
      );
    }

    if (q.includes("pipeline") || q.includes("status") || q.includes("prioritize")) {
      return (
        "Here is an optimal weekly pipeline cadence:\n\n" +
        "• Monday - Tuesday: High-velocity sourcing. Add 5-8 tailored applications in the 'Applied' column.\n" +
        "• Wednesday: Follow up on any 'Applied' roles older than 7 business days.\n" +
        "• Thursday: Deep prep for upcoming 'Assessment' and 'Interview' stages using card notes.\n" +
        "• Friday: Pipeline retrospective. Review your response rate KPI and calibrate resume keywords.\n\n" +
        "Keep at least 15-20 active targets across stages to maintain healthy momentum!"
      );
    }

    if (q.includes("salary") || q.includes("negotiat") || q.includes("compensation") || q.includes("offer")) {
      return (
        "Key Salary Negotiation Principles:\n\n" +
        "1. Never give an exact number first; provide a researched band with a high anchor.\n" +
        "2. Total Compensation is multi-dimensional: base salary, sign-on bonus, equity vesting (cliff & cadence), remote stipends, and PTO.\n" +
        "3. Leverage: If you have concurrent loops in 'Interview' or 'Offer' stages on JobTrail, respectfully communicate: 'I am currently in final stages with another company and want to make an informed comparison.'"
      );
    }

    return (
      `Great question regarding "${query}". Focus on quantifiable achievements rather than responsibilities, align your technical highlights with the company's core stack, and track each correspondence in your JobTrail notes.\n\n` +
      "Would you like me to draft an email, prepare sample technical questions, or evaluate salary positioning for this role?"
    );
  };

  const handleSend = async (textToSend) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Check if an external LLM API key is configured
    const apiKey = import.meta.env.VITE_AI_API_KEY;

    if (apiKey) {
      try {
        // Plug-in point for Gemini / Anthropic / OpenAI API
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: "You are TrailBot, a helpful AI career copilot." }, { role: "user", content: text }],
          }),
        });
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content || generateAiReply(text);
        
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            text: replyText,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsTyping(false);
        return;
      } catch {
        // Fallback to client simulated intelligence on network/key errors
      }
    }

    // Natural simulated delay for realistic feel
    setTimeout(() => {
      const replyText = generateAiReply(text);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
      setIsTyping(false);
    }, 750);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        text: "Chat cleared! How else can I help optimize your career pipeline today?",
        time: "Just now",
      },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Hover Tooltip */}
        {!isOpen && (
          <div className="hidden sm:block bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-lg border border-slate-800 opacity-90 pointer-events-none transition-opacity">
            Ask JobTrail AI ✨
          </div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          className="relative p-[2px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl hover:shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <div className="bg-slate-950 text-white p-3.5 rounded-full flex items-center justify-center relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-25" />
            {isOpen ? <X className="w-5 h-5 text-slate-200" /> : <Sparkles className="w-5 h-5 text-indigo-300" />}
          </div>
        </button>
      </div>

      {/* Glassmorphic Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-96 h-[520px] max-w-[calc(100vw-2rem)] rounded-3xl backdrop-blur-2xl bg-white/95 shadow-2xl border border-slate-200/80 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-white leading-none">TrailBot AI</h3>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Your career & interview copilot</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  title="Clear conversation"
                  className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl rounded-br-xs shadow-xs"
                          : "bg-slate-100/90 text-slate-800 rounded-2xl rounded-bl-xs border border-slate-200/60"
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                );
              })}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1.5 bg-slate-100 p-3 rounded-2xl rounded-bl-xs w-20 border border-slate-200/60">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Suggestion Chips */}
            <div className="px-3 pt-2 pb-1 border-t border-slate-100/80 bg-slate-50/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {QUICK_ACTIONS.map((action, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(action.prompt)}
                  className="text-[11px] font-medium text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50/60 border border-slate-200/80 rounded-xl px-2.5 py-1 whitespace-nowrap transition-colors shadow-2xs cursor-pointer shrink-0"
                >
                  {action.label}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-100 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 rounded-2xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 focus-within:bg-white transition-all"
              >
                <MessageSquare className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about your job hunt..."
                  className="w-full bg-transparent border-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none py-1"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-all cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
