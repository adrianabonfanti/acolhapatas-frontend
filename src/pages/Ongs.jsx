import api from '../services/api';
import React, { useState, useEffect } from "react";
import axios from "axios";
import ContatoFlutuante from '../components/ContatoFlutuante';
import CarouselOngs from '../components/CarouselOngs';
import ModalONG from '../components/ModalOng';
import { Helmet } from "react-helmet-async";

function Ongs(){
  const [formData, setFormData] = useState({});
  const [logo, setLogo] = useState(null);
  const [ongs, setOngs] = useState([]);
  const [selectedOng, setSelectedOng] = useState(null);
  const [showModal, setShowModal] = useState(false); 
const [loading, setLoading] = useState(false);
const [cadastroSucesso, setCadastroSucesso] = useState(false);

const buscarCep = async (e) => {
  const cep = e.target.value.replace(/\D/g, "");
  if (cep.length !== 8) return;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado!");
      return;
    }

    setFormData(prev => ({
      ...prev,
      street: data.logradouro || "",
      city: data.localidade || "",
      state: data.uf || ""
    }));
  } catch (error) {
    alert("Erro ao buscar CEP.");
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (logo) {
      data.append("logo", logo);
    }

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/ongs`, data);

    if (response.status === 201) {
      await api.post("/contato", {
        name: formData.name,
        email: formData.responsibleEmail,
        phone: formData.phone,
        message: `Nova ONG cadastrada:\n\nNome: ${formData.name}\nResponsável: ${formData.responsibleName}\nEmail: ${formData.responsibleEmail}\nTelefone: ${formData.phone}\nCidade: ${formData.city} - ${formData.state}`
      });

      setFormData({});
      setLogo(null);
      setCadastroSucesso(true);
    } else {
      alert("Erro ao cadastrar ONG.");
    }
  } catch (error) {
    console.error("ERRO AO CADASTRAR ONG:", error.response || error.message || error);
    if (error.response?.data?.error) {
      alert(`Erro: ${error.response.data.error}`);
    } else {
      alert("Erro ao enviar cadastro.");
    }
  } finally {
    setLoading(false);
  }
};

 
 const fetchOngs = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/public/ongs`);
    console.log("ONGS RECEBIDAS:", response.data);

    if (Array.isArray(response.data)) {
      setOngs(response.data);
    } else {
      console.error("A resposta não é um array:", response.data);
      setOngs([]); // evita crash
    }
  } catch (error) {
    console.error("Erro ao buscar ONGs:", error);
    setOngs([]); // evita crash se der erro
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
     <Helmet>
        <title>AcolhaPatas - Conectando ONGs, lares temporários e adotantes</title>
        <meta name="description" content="Seja um lar temporário, adote um pet e conheça ONGs que resgatam animais em Pindamonhangaba e região." />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="AcolhaPatas - Conectando ONGs, lares temporários e adotantes" />
        <meta property="og:description" content="Encontre animais para adoção, cadastre-se como lar temporário e apoie ONGs de proteção animal." />
        <meta property="og:image" content="https://acolhapatas.com.br/banner-og-ongs.jpg" />
        <meta property="og:url" content="https://acolhapatas.com.br/" />
        <meta property="og:type" content="website" />
      </Helmet>
     <header className="page-header headerOng w-full h-60 md:h-72 lg:h-80 flex items-center bg-emerald-50 shadow-inner overflow-hidden page-header">
  <div className="w-1/2 h-full">
    
  </div>
  <div className="w-1/2 h-full flex items-center justify-center px-6 divOngs">
   
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 text-right">ONGs Participantes</h1>
  </div>
</header>
    <div className="relative  min-h-screen">
      <div className="flex-1 p-6 flex flex-col">
              {/* ONGs Participantes */}
        <section className="py-12 px-4 sm:px-8 bg-white overflow-hidden">
  <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center tituloOngs" >
    ONGs participantes
  </h2>
  <div className="max-w-7xl mx-auto">
  <div className="relative z-0">
 {Array.isArray(ongs) && ongs.length > 0 && (
  <CarouselOngs ongs={ongs} onClickOng={openModal} />
)}

</div>


  </div>
</section>
{showModal && selectedOng && (
  <ModalONG ong={selectedOng} onClose={closeModal} />
)}
       
        <h2 className="text-2xl font-bold mt-12 mb-4 tituloSeja">Seja uma ONG participante</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
          <label className="font-medium block mb-1">Nome da ONG:</label>
          <input type="text" name="name" placeholder="Nome da ONG" onChange={handleChange} required className="input" />
            </div>
            <div>
         <label className="font-medium block mb-1">CNPJ:</label>
          <input type="text" name="cnpj" placeholder="CNPJ" onChange={handleChange} required className="input" />
           </div>
            <div>
          <label className="font-medium block mb-1">CEP:</label>
         <input
  type="text"
  name="cep"
  placeholder="CEP"
  onChange={handleChange}
  onBlur={buscarCep}
  required
  className="input"
/>

           </div>
            <div>
          <label className="font-medium block mb-1">Rua:</label>
         <input
  type="text"
  name="street"
  placeholder="Rua"
  value={formData.street || ""}
  onChange={handleChange}
  required
  className="input"
/>
            </div>
            <div>
          <label className="font-medium block mb-1">Número:</label>
          <input type="text" name="number" placeholder="Número" onChange={handleChange} required className="input" />
           </div>
            <div>
          <label className="font-medium block mb-1">Complemento:</label>
          <input type="text" name="complement" placeholder="Complemento" onChange={handleChange} className="input" />
           </div>
            <div>
          <label className="font-medium block mb-1">Cidade:</label>
        <input
  type="text"
  name="city"
  placeholder="Cidade"
  value={formData.city || ""}
  onChange={handleChange}
  required
  className="input"
/>
           </div>
            <div>
          <label className="font-medium block mb-1">Estado:</label>
          <input
  type="text"
  name="state"
  placeholder="Estado"
  value={formData.state || ""}
  onChange={handleChange}
  required
  className="input"
/></div>
            <div>
          <label className="font-medium block mb-1">Nome do responsável:</label>
          <input type="text" name="responsibleName" placeholder="Nome do responsável" onChange={handleChange} required className="input" />
          </div>
            <div>
         <label className="font-medium block mb-1">E-mail do responsável:</label>
          <input type="email" name="responsibleEmail" placeholder="Email do responsável" onChange={handleChange} required className="input" />
          </div>
            <div>
          <label className="font-medium block mb-1">Telefone do responsável:</label>
          <input type="text" name="phone" placeholder="Telefone do responsável" onChange={handleChange} required className="input" />
           </div>
            <div>
          <label className="font-medium block mb-1">Senha:</label>
          <input type="password" name="password" placeholder="Senha" onChange={handleChange} required className="input" />
           </div>
            <div>
          <label className="font-medium block mb-1">Nome Completo:</label>
          <input type="text" name="website" placeholder="Website" onChange={handleChange} className="input" />
            </div>
            <div>
          <label className="font-medium block mb-1">Instagram:</label>
          <input type="text" name="instagram" placeholder="Instagram" onChange={handleChange} className="input" />
            </div>
            <div>
          <label className="font-medium block mb-1">TikTok:</label>
          <input type="text" name="tiktok" placeholder="TikTok" onChange={handleChange} className="input" />
          </div>
            <div>
         <label className="font-medium block mb-1">Logo da ONG:</label>
          <input type="file" name="logo" accept="image/*" onChange={handleFileChange}  className="input" />
          </div>
         <button
  type="submit"
  disabled={loading}
  className={`py-2 rounded mt-4 text-white font-bold ${
    loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
  }`}
>
  {loading ? "Enviando..." : "Enviar cadastro"}
</button>

        </form> 

        <ContatoFlutuante />
        {cadastroSucesso && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
      <h2 className="text-2xl font-bold text-emerald-700 mb-4">✅ Cadastro enviado!</h2>
      <p>Obrigado por se cadastrar como ONG participante. Nossa equipe irá analisar sua inscrição.</p>
      <button
        onClick={() => setCadastroSucesso(false)}
        className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
      >
        Fechar
      </button>
    </div>
  </div>
)}

      </div>
    </div></>
  );
};

export default Ongs;
