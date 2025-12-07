import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, AlertCircle } from "lucide-react";
import { enviarParaIA } from "../services/aiService";
import { Sidebar } from "../components/Sidebar";

export const ChatIA = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Olá! Sou sua assistente de IA especializada em psicologia financeira. Como posso ajudar hoje? 💛",
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentInput = inputMessage;
    setInputMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await enviarParaIA(currentInput, messages);

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);

      const errorMessage = {
        id: Date.now() + 2,
        type: "bot",
        content: `Ops! Algo deu errado 😕\n${err.message}`,
        timestamp: new Date(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div
      className="flex"
      style={{
        background: "linear-gradient(180deg, #FFF176 0%, #FFEB3B 50%, #FFE450 100%)",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Sidebar />

      <div className="flex-1 max-w-4xl mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl text-yellow-900 font-extrabold  drop-shadow-xl">
          CHAT FINANPRO
          </h1>
          <p className="text-black font-medium">
            Tire dúvidas, aprenda e evolua financeiramente
          </p>
        </div>

        {/* Container do chat */}
        <div className="h-[600px] flex flex-col bg-white rounded-2xl shadow-lg border border-yellow-300 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-yellow-50 to-white">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[80%] ${
                    message.type === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                      message.type === "user"
                        ? "bg-yellow-500 text-white"
                        : "bg-yellow-700 text-white"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User size={18} />
                    ) : (
                      <Bot size={18} />
                    )}
                  </div>

                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm transition-transform hover:scale-[1.02] ${
                      message.type === "user"
                        ? "bg-yellow-500 text-white"
                        : message.isError
                        ? "bg-red-100 text-red-700 border border-red-300"
                        : "bg-yellow-100 text-yellow-900"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">
                      {message.content}
                    </p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="flex items-center space-x-2 bg-yellow-100 rounded-xl px-4 py-2 shadow">
                  <Loader2 size={16} className="animate-spin text-yellow-700" />
                  <span className="text-yellow-800 text-sm">Processando...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-yellow-300 p-4 bg-white">
            <div className="flex space-x-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta financeira..."
                className="flex-1 resize-none border border-yellow-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                rows="2"
                disabled={isLoading}
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="self-end bg-yellow-500 text-white px-5 py-3 rounded-xl shadow hover:bg-yellow-600 transition active:scale-95 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-300 rounded-lg flex items-center space-x-2 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Sugestões */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-yellow-700 mb-3">
            Sugestões inteligentes 💡
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Como controlar gastos impulsivos?",
              "Qual o jeito certo de começar a investir?",
              "Como criar metas financeiras realistas?",
              "Dicas para organizar minha vida financeira",
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(suggestion)}
                className="text-left p-3 bg-white border border-yellow-300 rounded-lg hover:bg-yellow-50 hover:border-yellow-500 transition text-gray-700 shadow-sm"
                disabled={isLoading}
              >
                <span className="text-sm">{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
