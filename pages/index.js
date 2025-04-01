
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>Chatbot meblowy</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Zadaj pytanie o meble..."
          style={{ width: '100%', padding: 10, marginBottom: 10 }}
        />
      </form>
      <div>
        {messages.map((m, i) => (
          <div key={i} style={{ margin: '10px 0' }}>
            <b>{m.role === 'user' ? 'Ty' : 'Asystent'}:</b> {m.content}
          </div>
        ))}
      </div>
    </div>
  );
}
