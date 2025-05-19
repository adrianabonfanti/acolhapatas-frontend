const { useState, useEffect } = require("react");
const { useNavigate } = require("react-router-dom");
const CadastroAnimal = require("./CadastroAnimal");
const BuscarLarTemporario = require("./BuscarLarTemporario");
const MeusDadosOng = require("./MeusDadosOng");
const CadastroEvento = require("./CadastroEvento");
const HomeOng = require("./HomeOng");
require("../styles/Home.css");
const NavbarLogada = require("../components/NavbarLogada");

function PainelOng() {
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
            {activePage === "home" && <HomeOng />}
            {activePage === "animais" && <CadastroAnimal />}
            {activePage === "eventos" && <CadastroEvento />}
            {activePage === "procurar" && <BuscarLarTemporario />}
            {activePage === "meusDados" && <MeusDadosOng />}
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = PainelOng;
