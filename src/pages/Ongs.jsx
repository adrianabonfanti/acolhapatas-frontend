import api from '../services/api';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Ongs = () => {
  const [formData, setFormData] = useState({});
  const [logo, setLogo] = useState(null);
  const [ongs, setOngs] = useState([]);
  const [selectedOng, setSelectedOng] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const formRef = useRef();
  const buttonRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (logo) {
        data.append("logo", logo);
      }

import.meta.env.VITE_API_BASE_URL}/ongs`, data);
      alert("Cadastro enviado com sucesso! Aguarde aprovação.");
      setFormData({});
      setLogo(null);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar cadastro.");
    }
  };

  const fetchOngs = async () => {
    try {
import.meta.env.VITE_API_BASE_URL}/public/ongs`);
      setOngs(response.data);
    } catch (error) {
      console.error(error); 
    }
  };

  useEffect(() => {
    fetchOngs();
  }, []);

  const openModal = (ong) => {
    setSelectedOng(ong);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Área principal */}
      <div className="flex-1 p-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-8">ONGs Participantes</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ongs.map((ong) => (
            <div key={ong._id} onClick={() => openModal(ong)} className="cursor-pointer">
              <img
import.meta.env.VITE_API_BASE_URL}/uploads/${ong.logo}` : "/sem_logo.png"}
                alt={ong.name}
                className="w-full h-40 object-cover rounded-lg shadow"
              />
            </div>
          ))}
        </div>

        {showModal && selectedOng && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg relative max-w-md w-full">
              <button onClick={closeModal} className="absolute top-2 right-3 text-xl font-bold">✕</button>
              <h2 className="text-2xl font-bold mb-4">{selectedOng.name}</h2>
              <p><strong>Responsável:</strong> {selectedOng.responsibleName}</p>
              <p><strong>Telefone:</strong> {selectedOng.phone}</p>
              <p><strong>Instagram:</strong> {selectedOng.instagram}</p>
              <p><strong>TikTok:</strong> {selectedOng.tiktok}</p>
              <p><strong>Website:</strong> {selectedOng.website}</p>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold mt-12 mb-4">Seja uma ONG participante</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="name" placeholder="Nome da ONG" onChange={handleChange} required className="input" />
          <input type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} required className="input" />
          <input type="text" name="cep" placeholder="CEP" onChange={handleChange} required className="input" />
          <input type="text" name="street" placeholder="Rua" onChange={handleChange} required className="input" />
          <input type="text" name="number" placeholder="Número" onChange={handleChange} required className="input" />
          <input type="text" name="complement" placeholder="Complemento" onChange={handleChange} className="input" />
          <input type="text" name="city" placeholder="Cidade" onChange={handleChange} required className="input" />
          <input type="text" name="state" placeholder="Estado" onChange={handleChange} required className="input" />
          <input type="text" name="responsibleName" placeholder="Nome do responsável" onChange={handleChange} required className="input" />
          <input type="email" name="responsibleEmail" placeholder="Email do responsável" onChange={handleChange} required className="input" />
          <input type="text" name="phone" placeholder="Telefone de contato" onChange={handleChange} required className="input" />
          <input type="password" name="password" placeholder="Senha" onChange={handleChange} required className="input" />
          <input type="text" name="website" placeholder="Website" onChange={handleChange} className="input" />
          <input type="text" name="instagram" placeholder="Instagram" onChange={handleChange} className="input" />
          <input type="text" name="tiktok" placeholder="TikTok" onChange={handleChange} className="input" />
          <input type="file" name="logo" accept="image/*" onChange={handleFileChange} className="input" />
          <button type="submit" className="bg-green-600 text-white py-2 rounded mt-4">Enviar cadastro</button>
        </form>
      </div>

    
      
    {/* Botão flutuante de contato */}
    <button 
        ref={buttonRef}
        onClick={() => setShowForm(prev => !prev)}
        className="botaoFlutuante fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg text-xl z-50"
      >
        💬
      </button>

      {/* Formulário de contato */}
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

      {/* Mensagem enviada */}
      {formEnviado && (
        <div className="fixed bottom-24 right-6 bg-emerald-500 text-white p-4 rounded-lg shadow-lg w-80 z-50">
          <p>Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>
          <button onClick={() => setFormEnviado(false)} className="mt-2 w-full bg-white text-emerald-500 font-semibold p-2 rounded">Fechar</button>
        </div>
      )}
    </div>
  );
};

export default Ongs;