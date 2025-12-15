import { themeContext } from "./../context/themeContext.jsx";
import { useContext, useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import ThemeToggle from "./../headers/themeToggle.jsx";
import GlobalBackground from "./../components/background/GlobalBackground.jsx";
import BackToHeader from "../components/elements/BackToHeader.jsx";

const Chat = () => {
  const { theme } = useContext(themeContext);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingDots, setThinkingDots] = useState(".");

  const bottomRef = useRef(null);

  const typeMessage = (fullText) => {
    if (!fullText) return;

    const words = fullText.trim().split(" ");
    let index = -1;

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    const interval = setInterval(() => {
      setMessages((prev) => {
        if (index >= words.length) return prev;

        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content:
            updated[updated.length - 1].content +
            (index === 0 ? "" : " ") +
            words[index],
        };

        return updated;
      });

      index++;

      if (index >= words.length) {
        clearInterval(interval);
      }
    }, 60);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setThinkingDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 400);
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();

      typeMessage(data.response);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <GlobalBackground />
      <ThemeToggle />
      <BackToHeader />
      <div className="fixed inset-0 flex flex-col pt-5">
        {/* Messages window */}
        <div className="flex-1 overflow-y-auto px-4 pb-32 hide-scrollbar">
          <div className="max-w-4xl mx-auto flex flex-col space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end space-x-2 ${
                  msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <img
                  src={
                    msg.role === "assistant" ? "/assistant.png" : "/user.png"
                  }
                  alt={msg.role}
                  className="w-8 h-8 rounded-full border border-gray-400"
                />

                {/* Message bubble */}
                <div
                  className={`px-4 py-2 rounded-2xl text-sm break-words whitespace-pre-wrap max-w-[75%]
            ${
              msg.role === "user"
                ? theme === 1
                  ? "bg-[#008080]/40 text-gray-200"
                  : "bg-[#FFD700]/40 text-gray-800"
                : theme === 1
                ? "bg-white/10 text-gray-200"
                : "bg-black/10 text-gray-800"
            }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div
                  className={`px-4 py-2 rounded-2xl text-sm break-words whitespace-pre-wrap max-w-[75%]
            ${
              theme === 1
                ? "bg-white/10 text-gray-300"
                : "bg-black/10 text-gray-700"
            }`}
                >
                  Thinking{thinkingDots}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input field */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 z-10">
          <div
            className={`flex items-end gap-3 px-4 py-3 rounded-2xl backdrop-blur-sm 
              shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)]
              ${theme === 1 ? "bg-[#060010]/30 " : "bg-[#fdf6e3]/30 "}`}
          >
            <textarea
              value={input}
              placeholder="Send message"
              rows={1}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                  e.target.style.height = "auto";
                }
              }}
              className={`flex-1 resize-none bg-transparent text-sm outline-none
                min-h-[52px] max-h-40 leading-relaxed hide-scrollbar
                ${
                  theme === 1
                    ? "text-gray-200 placeholder-gray-400"
                    : "text-gray-800 placeholder-gray-500"
                }`}
            />
            <button
              onClick={handleSendMessage}
              className={`p-2 rounded-full transition-all
                ${
                  theme === 1
                    ? "text-gray-300 hover:text-purple-600"
                    : "text-gray-700 hover:text-purple-500"
                }`}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
