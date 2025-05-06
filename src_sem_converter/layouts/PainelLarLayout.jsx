import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function PainelLarLayout() {
  return (
    <div>
      <nav className="bg-green-600 text-white p-4 flex justify-center gap-8">
        <Link to="/painel-lar/disponibilidade">Minha Disponibilidade</Link>
        <Link to="/painel-lar/meus-dados">Meus Dados</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}