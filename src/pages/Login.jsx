import React, { useState, useRef } from "react";
import ContatoFlutuante from '../components/ContatoFlutuante';
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
    <div className="relative min-h-screen overflow-x-hidden headerLogin">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="backTextoHome relative z-10 max-w-3xl mx-4 px-6 py-10 rounded-3xl text-center space-y-6 backdrop-blur-sm bg-white/10 w-80 caixaLogin"
        >
         

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

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded"
          >
            Entrar
          </button>
        </form>
      </div>

     <ContatoFlutuante />
    </div>
  );
}

export default Login;
