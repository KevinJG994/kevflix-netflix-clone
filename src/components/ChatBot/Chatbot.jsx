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
      const response = await axios.post("http://localhost:5005/api/ai/chat", {
        prompt: input,
      });
  
      // Depura la respuesta del backend
      console.log("Respuesta del backend:", response.data.response);
  
      // Extrae el texto del mensaje del bot
      let botMessageText = "";
      if (response.data.response.parts && response.data.response.parts[0]?.text) {
        botMessageText = response.data.response.parts[0].text;
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
    <div style={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
      <h2>Chatbot</h2>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <p>
              <strong>{msg.sender === "user" ? "Tú" : "Bot"}:</strong> {msg.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Escribe tu mensaje..."
        style={{ width: "80%", padding: 5 }}
      />
      <button onClick={sendMessage} style={{ marginLeft: 10 }} disabled={loading}>
        {loading ? "Cargando..." : "Enviar"}
      </button>
    </div>
  );
};

export default Chatbot;