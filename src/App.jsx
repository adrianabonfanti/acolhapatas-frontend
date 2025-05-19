const React = require("react");
const { BrowserRouter: Router, Routes, Route } = require("react-router-dom");
const Home = require("./pages/Home");
const Login = require("./pages/Login");
const PainelOng = require("./pages/PainelOng");
const PainelLar = require("./pages/PainelLar");
const Navbar = require("./components/Navbar");
require("./styles/global.css");
const LarTemporario = require("./pages/LarTemporario");
const Adocao = require("./pages/Adocao");
const Eventos = require("./pages/Eventos");
const Sobre = require("./pages/Sobre");
const Ongs = require("./pages/Ongs");
const BuscarLarTemporario = require("./pages/BuscarLarTemporario");
const HomeOng = require("./pages/HomeOng");

const PainelAdmin = require("./pages/admin/PainelAdmin");
const AdminLogin = require("./pages/admin/AdminLogin");
const PrivateRoute = require("./components/PrivateRoute");
const EditarPerfilLar = require("./pages/EditarPerfilLar");

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas (com Navbar) */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/adocao" element={<><Navbar /><Adocao /></>} />
        <Route path="/eventos" element={<><Navbar /><Eventos /></>} />
        <Route path="/lar" element={<><Navbar /><LarTemporario /></>} />
        <Route path="/sobre" element={<><Navbar /><Sobre /></>} />
        <Route path="/ongs" element={<><Navbar /><Ongs /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />
        {/* Rotas protegidas (sem Navbar) */}
        
        <Route path="/painel-ong" element={<PainelOng />} />
        <Route path="/painel-lar" element={<PainelLar />} />
        <Route path="/buscar-lar" element={<><Navbar /><BuscarLarTemporario /></>} />
        <Route path="/homeOng" element={<HomeOng />} /> 
        <Route path="/editar-perfil-lar" element={<EditarPerfilLar />} />

         {/* ROTAS ADMIN - ATIVADAS */}
         <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<PrivateRoute><PainelAdmin /></PrivateRoute>} />



      </Routes>
    </Router>
  );
}

module.exports = App;

