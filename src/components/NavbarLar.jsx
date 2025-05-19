import { Link, useNavigate } from "react-router-dom";

export default function NavbarLar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // ou o caminho certo pro login do lar
  };

  return (
    <nav className="flex justify-between items-center bg-emerald-500 text-white p-4 shadow">
      <div className="font-bold text-xl">AcolhaPatas</div>
      <div className="flex gap-6">
        <Link to="/painel-lar" className="hover:underline">Home</Link>
        <Link to="/editar-perfil-lar" className="hover:underline">Editar Perfil</Link>
        <button onClick={handleLogout} className="hover:underline">Sair</button>
      </div>
    </nav>
  );
}
