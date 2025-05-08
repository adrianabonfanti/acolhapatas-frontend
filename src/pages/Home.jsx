import api from '../services/api';

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { CheckCircle, LocalHospital, Pets, Vaccines, Medication, AccessibilityNew } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/CheckCircle';
import MedicationIcon from '@mui/icons-material/Medication';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PetsIcon from '@mui/icons-material/Pets';
import CarouselOngs from '../components/CarouselOngs';


function Home() {
  const navigate = useNavigate();
  const [animais, setAnimais] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const [ongAdocao, setOngAdocao] = useState(null);
  const formRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    api.get("/random/6")
    .then((res) => setAnimais(res.data));
  
  api.get("/public/ongs")
    .then((res) => setOngs(res.data));
  
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        formRef.current && !formRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setShowForm(false);
      }
    }

    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showForm]);

  const handleEnviarContato = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    try {
      await api.post("/contato", {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message")
      });
  
      setFormEnviado(true);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    }
  };
  

  return (
    <>
    <section className="backImage relative h-screen max-h-[600px] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: 'url("/hero_horizontal.jpg")' }}>
  <div className="absolute inset-0  z-0" />
  
  <div className="backTextoHome relative z-10 max-w-3xl mx-4 px-6 py-10 rounded-3xl text-center space-y-6 backdrop-blur-sm bg-white/10">
    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-snug "> 
      Um lar temporário pode mudar uma vida
    </h1>
    <p className="text-lg sm:text-xl text-white/90 ">
      Dê um recomeço com carinho e segurança a quem só precisa de tempo e amor para se recuperar.
    </p>
    <button
      onClick={() => navigate("/lar")}
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-base sm:text-lg px-8 py-3 rounded-full shadow-md transition duration-300"
    >
      Saiba como ajudar
    </button>
  </div>
</section>
    <div className="flex min-h-screen">
    
      {/* Área principal */}
      <div className="flex-1 flex flex-col">
        {/* Hero */}
       


        {/* Animais */}
        <section className="py-12 px-4 sm:px-8 bg-[#fefcf8]">
  <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center ">
    Animais disponíveis para adoção responsável
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {animais.map((animal) => (
      <div key={animal._id} className="bg-white rounded-3xl shadow-md overflow-hidden transition hover:shadow-lg">
        <img
         src={animal.fotos[0]}
          alt={animal.nome}
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 capitalize mb-1">{animal.nome}</h3>
          <p className="text-sm text-gray-500 mb-3">
            {animal.especie} • {animal.idade} • {animal.porte} • {animal.sexo}
          </p>

          {animal.descricao && (
            <p className="text-sm italic text-gray-700 mb-4">"{animal.descricao}"</p>
          )}

<div className="flex flex-wrap gap-2 mb-5">
  {String(animal.castrado) === "true" && (
    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
      <CheckIcon fontSize="small" /> Castrado
    </span>
  )}
  {String(animal.vacinado) === "true" && (
    <span className="flex items-center gap-1 bg-cyan-50 text-cyan-700 text-xs px-3 py-1 rounded-full font-medium">
      <VaccinesIcon fontSize="small" /> Vacinado
    </span>
  )}
  {String(animal.precisaLarTemporario) === "true" && (
    <span className="flex items-center gap-1 bg-sky-50 text-sky-700 text-xs px-3 py-1 rounded-full font-medium">
      <PetsIcon fontSize="small" /> Precisa de lar temporário
    </span>
  )}
  {String(animal.usaMedicacao) === "true" && (
    <span className="flex items-center gap-1 bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">
      <MedicationIcon fontSize="small" /> Usa medicação
    </span>
  )}
</div>

          <button
            onClick={() => {
              const ongId = animal.ong?.$oid || animal.ong;
              const ongAnimal = ongs.find((ong) => ong._id === ongId);
              if (ongAnimal) {
                setOngAdocao(ongAnimal);
              } else {
                alert("ONG não encontrada para este animal.");
              }
            }}
            className="botaoQueroAdotar w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-2 rounded-full transition duration-300"
          >
            Quero Adotar
          </button>
        </div>
      </div>
    ))}
  </div>

  <div className="text-center mt-10">
    <button
      onClick={() => navigate("/adocao")}
      className="text-emerald-600 hover:underline text-sm font-medium"
    >
      Ver todos os animais disponíveis para adoção
    </button>
  </div>
</section>


        {/* ONGs Participantes */}
        <section className="py-12 px-4 sm:px-8 bg-white">
  <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
    ONGs participantes
  </h2>
  <CarouselOngs ongs={ongs} />
</section>


      </div>

  

      {/* Modais e Botões flutuantes */}
  


      <button 
        ref={buttonRef}
        onClick={() => setShowForm((prev) => !prev)} 
        className="botaoFlutuante fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg text-xl z-50"
      >
        💬
      </button>

      {showForm && (
        <div ref={formRef} className="caixaContatoFlutuante fixed bottom-24 right-6 bg-white p-6 rounded-lg shadow-lg w-80 z-50">
          <form onSubmit={handleEnviarContato}>

            <h3 className="text-lg font-semibold mb-2">Entre em contato</h3>
            <input name="name" type="text" placeholder="Seu nome" className="w-full mb-2 p-2 border rounded" required />
            <input name="phone" type="text" placeholder="Telefone" className="w-full mb-2 p-2 border rounded" required />
            <input name="email" type="email" placeholder="E-mail" className="w-full mb-2 p-2 border rounded" required />
            <textarea name="message" placeholder="Mensagem" className="w-full mb-2 p-2 border rounded" required />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded w-full">Enviar</button>
          </form>
        </div>
      )}

      {formEnviado && (
        <div className="fixed bottom-24 right-6 bg-emerald-500 text-white p-4 rounded-lg shadow-lg w-80 z-50">
          <p>Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>
          <button onClick={() => setFormEnviado(false)} className="mt-2 w-full bg-white text-emerald-500 font-semibold p-2 rounded">Fechar</button>
        </div>
      )}
    </div></>
  );
}

export default Home;
