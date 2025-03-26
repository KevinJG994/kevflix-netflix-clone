import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Llama al endpoint del backend
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL || "http://localhost:5005"}/api/ai/chat`,
        {
          prompt: input,
        }
      );

      // Depura la respuesta del backend
      console.log("Respuesta del backend:", response.data.response);

      // Extrae el texto del mensaje del bot
      let botMessageText = "";
      if (response.data.response.parts && response.data.response.parts[0]?.text) {
        botMessageText = response.data.response.parts[0].text
            .replace(/\\n/g, '\n')  // Reemplaza "\n" escrito como texto por un salto real
            .replace(/\n\n+/g, '\n\n'); // Elimina saltos de línea extra
      } else {
        botMessageText = "No se pudo obtener una respuesta válida del bot.";
      }

      const botMessage = { text: botMessageText, sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      const errorMessage = { text: "Hubo un error al procesar tu solicitud.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center p-4">
      <h2 className="text-2xl font-bold mb-4">Chatbot</h2>
      <div className="h-72 overflow-y-auto border border-gray-300 p-4 mb-4 rounded-md bg-white shadow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 text-${msg.sender === "user" ? "right" : "left"}`}
          >
            <p className={`text-sm ${msg.sender === "user" ? "text-primary-color text-right" : "text-gray-800 text-left whitespace-pre-line"}`}>
              <strong>{msg.sender === "user" ? "Tú" : "BotFlix"}:</strong> {msg.text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe tu mensaje..."
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`ml-2 px-4 py-2 rounded-md text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary-color hover:bg-primary"
            }`}
        >
          {loading ? "Cargando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;