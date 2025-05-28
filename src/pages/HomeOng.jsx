import api from '../services/api';

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ContatoFlutuante from '../components/ContatoFlutuante';
import AnimalCard from "../components/AnimalCard";

export default function HomeOng() {
  const navigate = useNavigate();
  const [animais, setAnimais] = useState([]);
  const [totalAnimais, setTotalAnimais] = useState(0);
  const [precisamLarTemporario, setPrecisamLarTemporario] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const formRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
  
    api.get("/animals", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        const data = res.data;
        setAnimais(data.slice(-6).reverse());
        setTotalAnimais(data.length);
        setPrecisamLarTemporario(data.filter(a => a.precisaLarTemporario).length);
      })
      .catch((err) => console.error("Erro ao buscar animais da ONG:", err));
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
      const response = await api.get("/ajax/adrianahbonfanti@gmail.com") // [CONVERTIDO DE FETCH];

      if (response.ok) {
        setFormEnviado(true);
        setShowForm(false);
      } else {
        alert("Erro ao enviar mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return (
    <div className="p-6">
      {/* Resumo */}
      <h2 className="text-2xl font-bold mb-6">Dashboard da ONG</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-500 text-white p-6 rounded-xl shadow">
          <h3 className="text-lg">Total de Animais</h3>
          <p className="text-3xl font-bold">{totalAnimais}</p>
        </div>
        <div className="bg-yellow-400 text-white p-6 rounded-xl shadow">
          <h3 className="text-lg">Precisam de Lar Temporário</h3>
          <p className="text-3xl font-bold">{precisamLarTemporario}</p>
        </div>
      </div>

    


      {/* Últimos Animais */}
      <h3 className="text-xl font-bold mb-4">Últimos Animais Cadastrados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {animais.map((animal) => (
        {animais.map((animal) => (
  <AnimalCard
    key={animal._id}
    animal={animal}
    onAdotar={null} // ou você pode passar uma função, mas aqui provavelmente não tem botão de adoção
    onImagemCarregada={() => {}} // ou remova se o `AnimalCard` não quebrar sem isso
  />
))}

        ))}
      </div>

      <ContatoFlutuante />
    </div>
  );
}
