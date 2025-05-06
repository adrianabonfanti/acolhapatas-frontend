import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CadastroAnimal from "./CadastroAnimal";
import BuscarLarTemporario from "./BuscarLarTemporario";
import MeusDadosOng from "./MeusDadosOng";
import HomeOng from "./HomeOng";  
import "../styles/Home.css";
import NavbarLogada from "../components/NavbarLogada";
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
       
        <NavbarLogada setActivePage={setActivePage} />

        {/* Conteúdo dinâmico */}
        <div className="flex flex-1">
          <div className="flex-1 p-6">
            {activePage === "home" && <HomeOng/>}
            {activePage === "animais" && <CadastroAnimal />}
            {activePage === "procurar" && <BuscarLarTemporario />}
            {activePage === "meusDados" && <MeusDadosOng />}

          </div>

        
        </div>
      </div>
    </div>
  );
}
