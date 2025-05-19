const { useState } = require("react");
const { Link } = require("react-router-dom");
const MenuIcon = require("@mui/icons-material/Menu");
const CloseIcon = require("@mui/icons-material/Close");


function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo ou nome */}
        <Link to="/" className="text-2xl font-bold text-emerald-600 tracking-tight">
        <img src="/logo.png" alt="Logo AcolhaPatas" className="logoHeader" />

        </Link>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-emerald-600 transition">Início</Link>
          <Link to="/adocao" className="hover:text-emerald-600 transition">Adoção</Link>
          <Link to="/eventos" className="hover:text-emerald-600 transition">Eventos</Link>
          <Link to="/lar" className="hover:text-emerald-600 transition">Seja um lar</Link>
          <Link to="/ongs" className="hover:text-emerald-600 transition">ONGs</Link>
          <Link to="/sobre" className="hover:text-emerald-600 transition">Sobre</Link>
          <Link to="/login" className="text-white bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 rounded-full transition">
            Entrar
          </Link>
        </nav>

      
      </div>

      {/* Menu mobile  */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2 z-50 md:hidden menuMobile">
  <Link to="/" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
    <span className="material-icons">home</span>
    Início
  </Link>
  <Link to="/adocao" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
    <span className="material-icons">pets</span>
    Adoção
  </Link>
   <Link to="/eventos" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
    <span className="material-icons">events</span>
    Eventos
  </Link>
  <Link to="/lar" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
    <span className="material-icons">volunteer_activism</span>
    Lar
  </Link>
  <Link to="/ongs" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
    <span className="material-icons">groups</span>
    ONGs
  </Link>
   <Link to="/sobre" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
    <span > <img src="/logo_menu.png" alt="Logo AcolhaPatas" className="menuLogo" /></span>
    Sobre
  </Link>
  <Link to="/login" className="flex flex-col items-center text-xs text-gray-600 hover:text-emerald-600">
    <span className="material-icons">login</span>
    Entrar
  </Link>
</div>

    </header>
  );
}

module.exports = Navbar;

