const { useState, useEffect } = require("react");
const HomeLar = require("./HomeLar");
const EditarPerfilLar = require("./EditarPerfilLar");
const NavbarLogada = require("../components/NavbarLogada");
require("../styles/Home.css");

function PainelLar() {
  const [user, setUser] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState("home");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.tipo === "lar") {
      setUser(userData);
    }
  }, []);

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
        <p>Você precisa estar logado como lar temporário para acessar esta página.</p>
      </div>
    );
  }

  return (
    <>
      <NavbarLogada setActivePage={setPaginaAtual} />
      <div className="p-6">
        {paginaAtual === "home" && <HomeLar />}
        {paginaAtual === "meusDados" && <EditarPerfilLar />}
      </div>
    </>
  );
}
module.exports = PainelLar;