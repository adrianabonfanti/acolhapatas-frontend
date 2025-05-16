import api from '../services/api';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ContatoFlutuante from '../components/ContatoFlutuante';
import CarouselOngs from '../components/CarouselOngs';
import ModalONG from '../components/ModalOng';

const Ongs = () => {
  const [formData, setFormData] = useState({});
  const [logo, setLogo] = useState(null);
  const [ongs, setOngs] = useState([]);
  const [selectedOng, setSelectedOng] = useState(null);
  const [showModal, setShowModal] = useState(false); 

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

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ongs`, data);
      // Envia o e-mail para avisar você
await api.post("/contato", {
  name: formData.name,
  email: formData.responsibleEmail,
  phone: formData.phone,
  message: `Nova ONG cadastrada:\n\nNome: ${formData.name}\nResponsável: ${formData.responsibleName}\nEmail: ${formData.responsibleEmail}\nTelefone: ${formData.phone}\nCidade: ${formData.city} - ${formData.state}`
});
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
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/public/ongs`);
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
    <>
     <header className="page-header headerOng w-full h-60 md:h-72 lg:h-80 flex items-center bg-emerald-50 shadow-inner overflow-hidden page-header">
  <div className="w-1/2 h-full">
    
  </div>
  <div className="w-1/2 h-full flex items-center justify-center px-6" style="
        padding-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 text-right">
      Ongs Participantes
    </h1>
  </div>
</header>
    <div className="relative  min-h-screen">
      <div className="flex-1 p-6 flex flex-col">
              {/* ONGs Participantes */}
        <section className="py-12 px-4 sm:px-8 bg-white overflow-hidden">
  <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
    ONGs participantes
  </h2>
  <div className="max-w-7xl mx-auto">
  <div className="relative z-0">
  <CarouselOngs ongs={ongs} onClickOng={openModal} />

</div>


  </div>
</section>
{showModal && selectedOng && (
  <ModalONG ong={selectedOng} onClose={closeModal} />
)}
       {/*  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {ongs.map((ong) => (
            <div key={ong._id} onClick={() => openModal(ong)} className="cursor-pointer">
   <div className="w-full min-h-[120px] max-h-[180px] flex items-center justify-center bg-white rounded-lg shadow p-2">
  <img
    src={ong.logo || "/sem_logo.png"}
    alt={ong.name}
    className="w-48 rounded shadow mb-4"
  />
</div>


            </div>
          ))}
        </div> */}

     {/*    {showModal && selectedOng && (
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
        )} */}

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
          <input type="file" name="logo" accept="image/*" onChange={handleFileChange} required className="input" />
          <button type="submit" className="bg-green-600 text-white py-2 rounded mt-4">Enviar cadastro</button>
        </form>

        <ContatoFlutuante />
      </div>
    </div></>
  );
};

export default Ongs;
