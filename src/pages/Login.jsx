import React, { useState, useRef } from "react";

function Login() {
  const [tipoUsuario, setTipoUsuario] = useState("ong");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const formRef = useRef();
  const buttonRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    const rota = tipoUsuario === "ong" ? "login-ong" : "login-lar";

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${rota}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", data.token);

      if (tipoUsuario === "ong") {
        localStorage.setItem("user", JSON.stringify({ id: data.id, token: data.token, tipo: "ong" }));
        window.open("/painel-ong", "_blank");
      } else {
        // Armazena todos os dados do lar, exceto senha
  const { password, ...larSemSenha } = data.lar || {};
  localStorage.setItem("user", JSON.stringify({ tipo: "lar", ...larSemSenha }));
  window.open("/painel-lar", "_blank");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Erro ao fazer login. Tente novamente.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Área principal */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            className="w-full mb-4 p-2 border rounded"
            required
          >
            <option value="ong">Sou uma ONG</option>
            <option value="lar">Sou um Lar Temporário</option>
          </select>

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full mb-4 p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full mb-6 p-2 border rounded"
          />

          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded">
            Entrar
          </button>
        </form>
      </div>

      {/* Publicidade lateral */}
      <div className="hidden lg:block w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-2">Publicidade</h2>
        <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">Seu Anúncio Aqui</span>
        </div>
      </div>

      {/* Botão flutuante de contato */}
      <button
        ref={buttonRef}
        onClick={() => setShowForm((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg text-xl z-50"
      >
        💬
      </button>

      {/* Formulário de contato */}
      {showForm && (
        <div ref={formRef} className="fixed bottom-24 right-6 bg-white p-6 rounded-lg shadow-lg w-80 z-50">
          <form onSubmit={(e) => {
            e.preventDefault();
            setFormEnviado(true);
            setShowForm(false);
          }}>
            <h3 className="text-lg font-semibold mb-2">Entre em contato</h3>
            <input name="name" type="text" placeholder="Seu nome" className="w-full mb-2 p-2 border rounded" required />
            <input name="phone" type="text" placeholder="Telefone" className="w-full mb-2 p-2 border rounded" required />
            <input name="email" type="email" placeholder="E-mail" className="w-full mb-2 p-2 border rounded" required />
            <textarea name="message" placeholder="Mensagem" className="w-full mb-2 p-2 border rounded" required />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded w-full">Enviar</button>
          </form>
        </div>
      )}

      {/* Modal de confirmação */}
      {formEnviado && (
        <div className="fixed bottom-24 right-6 bg-emerald-500 text-white p-4 rounded-lg shadow-lg w-80 z-50">
          <p>Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>
          <button onClick={() => setFormEnviado(false)} className="mt-2 w-full bg-white text-emerald-500 font-semibold p-2 rounded">Fechar</button>
        </div>
      )}
    </div>
  );
}

export default Login;
