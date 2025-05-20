// src/layouts/PainelLayout.jsx
import { Outlet, Link } from "react-router-dom";

export default function PainelLayout() {
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
