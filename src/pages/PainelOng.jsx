import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CadastroAnimal from "./CadastroAnimal";
import BuscarLarTemporario from "./BuscarLarTemporario";
import MeusDadosOng from "./MeusDadosOng";
import HomeOng from "./HomeOng";  
import "../styles/Home.css";
export default function PainelOng() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.tipo !== "ong") {
      navigate("/login");
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        {/* Menu no topo */}
        <nav className="flex items-center justify-between bg-white shadow p-4">
          <div className="flex space-x-6">
            <button onClick={() => setActivePage("home")} className="font-semibold">Home</button>
            <button onClick={() => setActivePage("animais")} className="font-semibold">Cadastrar/Gerenciar meus Animais</button>
            <button onClick={() => setActivePage("procurar")} className="font-semibold">Procurar Lar Temporário</button>
            <button onClick={() => setActivePage("meusDados")} className="font-semibold">
  Meus Dados da ONG
</button>

          </div>
          <button onClick={handleLogout} className="font-semibold text-red-500">Sair</button>
        </nav>

        {/* Conteúdo dinâmico */}
        <div className="flex flex-1">
          <div className="flex-1 p-6">
            {activePage === "home" && <HomeOng/>}
            {activePage === "animais" && <CadastroAnimal />}
            {activePage === "procurar" && <BuscarLarTemporario />}
            {activePage === "meusDados" && <MeusDadosOng />}

          </div>

          {/* Espaço para publicidade */}
          <div className="hidden lg:block w-64 bg-gray-100 p-4">
            <h2 className="text-lg font-bold mb-2">Publicidade</h2>
            <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">Seu Anúncio Aqui</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
