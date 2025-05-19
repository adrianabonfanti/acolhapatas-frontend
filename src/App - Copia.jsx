import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PainelOng from "./pages/PainelOng";
import PainelLar from "./pages/PainelLar";
import Navbar from "./components/Navbar";
import "./styles/global.css";
import LarTemporario from "./pages/LarTemporario";
import Adocao from "./pages/Adocao";
import Eventos from "./pages/Eventos";
import Sobre from "./pages/Sobre";
import Ongs from "./pages/Ongs";
import BuscarLarTemporario from "./pages/BuscarLarTemporario";
import HomeOng from "./pages/HomeOng"; 

import PainelAdmin from "./pages/admin/PainelAdmin";
import AdminLogin from "./pages/admin/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import EditarPerfilLar from "./pages/EditarPerfilLar";




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

export default App;
