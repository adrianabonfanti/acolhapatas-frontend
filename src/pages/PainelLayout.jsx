const { Outlet, Link } = require("react-router-dom");

function PainelLayout() {
  return (
    <div>
      <nav>
        <Link to="/painel/cadastro-animal">Cadastro de Animal</Link> |{" "}
        <Link to="/painel/meus-dados">Meus Dados</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}

module.exports = PainelLayout;
