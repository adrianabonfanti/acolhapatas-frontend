import api from '../services/api';

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  
    api.get("/animals") // [CONVERTIDO DE FETCH]
    .then((res) => res.json())
    .then((data) => {
      setAnimais(data.slice(-6).reverse()); // Últimos 6 cadastrados
      setTotalAnimais(data.length);
      setPrecisamLarTemporario(data.filter(a => a.precisaLarTemporario).length);
    })
  
      .catch((err) => console.error("Erro ao buscar animais:", err));
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
          <div key={animal._id} className="bg-white shadow-md p-4 rounded-lg">
            <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${animal.fotos[0]}`} alt={animal.nome} className="w-full h-48 object-cover rounded" />
            <h4 className="text-lg font-semibold mt-2">{animal.nome}</h4>
            <p className="text-sm mb-2">{animal.especie} | {animal.idade} | {animal.porte} | {animal.sexo}</p>

            {animal.descricao && <p className="text-sm mb-2"><strong>Sobre:</strong> {animal.descricao}</p>}
            <ul className="text-xs text-gray-600 space-y-1">
            {String(animal.castrado) === "true" && <li>✅ Castrado</li>}
{String(animal.vacinado) === "true" && <li>✅ Vacinado</li>}
{String(animal.precisaLarTemporario) === "true" && <li>🏡 Precisa de lar temporário</li>}
{String(animal.usaMedicacao) === "true" && <li>💊 Usa medicação</li>}
{String(animal.deficiencia) === "true" && <li>♿ Possui deficiência</li>}
{String(animal.necessidadesEspeciais) === "true" && <li>🩺 Necessidades especiais</li>}

            </ul>
          </div>
        ))}
      </div>

      {/* Botão de mensagem */}
      <button 
        ref={buttonRef}
        onClick={() => setShowForm(prev => !prev)}
        className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg text-xl z-50"
      >
        💬
      </button>

      {/* Formulário de mensagem */}
      {showForm && (
        <div ref={formRef} className="fixed bottom-24 right-6 bg-white p-6 rounded-lg shadow-lg w-80 z-50">
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

      {/* Mensagem enviada */}
      {formEnviado && (
        <div className="fixed bottom-24 right-6 bg-emerald-500 text-white p-4 rounded-lg shadow-lg w-80 z-50">
          <p>Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>
          <button onClick={() => setFormEnviado(false)} className="mt-2 w-full bg-white text-emerald-500 font-semibold p-2 rounded">Fechar</button>
        </div>
      )}
    </div>
  );
}
