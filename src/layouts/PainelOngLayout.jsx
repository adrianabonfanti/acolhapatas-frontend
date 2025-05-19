const { Outlet, Link } = require("react-router-dom");
const Navbar = require("../components/Navbar");

function PainelOngLayout() {
  return (
    <div>
      <nav className="bg-green-600 text-white p-4 flex justify-center gap-8">
        <Link to="/painel-ong">Dashboard</Link> {/* novo */}
        <Link to="/painel-ong/cadastro-animal">Cadastro de Animal</Link>
        <Link to="/painel-ong/cadastro-evento">Cadastro de Eventos</Link>
        <Link to="/painel-ong/buscar-lar">Buscar Lar</Link>
        <Link to="/painel-ong/meus-dados">Meus Dados</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

module.exports = PainelOngLayout;
