import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavbarLogada() {
  const [userTipo, setUserTipo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserTipo(user?.tipo);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-emerald-600 tracking-tight">
          <img src="/logo.png" alt="Logo AcolhaPatas" className="logoHeader" />
        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {userTipo === "ong" && (
            <>
              <Link to="/painel-ong" className="hover:text-emerald-600 transition">Início</Link>
              <Link to="/painel-ong/animais" className="hover:text-emerald-600 transition">Animais</Link>
              <Link to="/painel-ong/procurar" className="hover:text-emerald-600 transition">Buscar Lar</Link>
              <Link to="/painel-ong/meusdados" className="hover:text-emerald-600 transition">Minha ONG</Link>
            </>
          )}
          {userTipo === "lar" && (
            <>
              <Link to="/painel-lar" className="hover:text-emerald-600 transition">Início</Link>
              <Link to="/painel-lar/meusdados" className="hover:text-emerald-600 transition">Meus Dados</Link>
            </>
          )}
          <button onClick={logout} className="text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-full transition">Sair</button>
        </nav>
      </div>

      {/* Mobile bottom menu */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50 md:hidden">
        {userTipo === "ong" && (
          <>
            <Link to="/painel-ong" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
              <span className="material-icons">home</span>
              Início
            </Link>
            <Link to="animais" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
              <span className="material-icons">pets</span>
              Animais
            </Link>
            <Link to="/procurar" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
              <span className="material-icons">search</span>
              Buscar
            </Link>
            <Link to="meusdados" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
              <span className="material-icons">apartment</span>
              ONG
            </Link>
          </>
        )}
        {userTipo === "lar" && (
          <>
            <Link to="/painel-lar" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
              <span className="material-icons">home</span>
              Início
            </Link>
            <Link to="/painel-lar/meusdados" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
              <span className="material-icons">person</span>
              Perfil
            </Link>
          </>
        )}
        <button onClick={logout} className="flex flex-col items-center text-xs text-gray-600 hover:text-red-500">
          <span className="material-icons">logout</span>
          Sair
        </button>
      </div>
    </header>
  );
}

export default NavbarLogada;