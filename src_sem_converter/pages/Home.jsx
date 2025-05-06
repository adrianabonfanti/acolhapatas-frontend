import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { CheckCircle, LocalHospital, Pets, Vaccines, Medication, AccessibilityNew } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/CheckCircle';
import MedicationIcon from '@mui/icons-material/Medication';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import PetsIcon from '@mui/icons-material/Pets';
function Home() {
  const navigate = useNavigate();
  const [animais, setAnimais] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [ongSelecionada, setOngSelecionada] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const [ongAdocao, setOngAdocao] = useState(null);
  const formRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/random/6")
      .then((res) => res.json())
      .then(setAnimais);

    fetch("http://localhost:5000/public/ongs")
      .then((res) => res.json())
      .then(setOngs);
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
      const response = await fetch("https://formsubmit.co/ajax/adrianahbonfanti@gmail.com", {
        method: "POST",
        headers: { 'Accept': 'application/json' },
        body: formData
      });

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
    <>
    <section className="backImage relative h-screen max-h-[600px] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: 'url("/public/hero.png")' }}>
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
          src={`http://localhost:5000/uploads/${animal.fotos[0]}`}
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
  <h2 className="text-3xl font-extrabold text-gray-800 mb-10 text-center ">
    ONGs participantes
  </h2>

  <div className="ongsHome grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {ongs.map((ong) => (
      <div
        key={ong._id}
        className="group bg-gray-50 rounded-2xl p-4 shadow hover:shadow-md flex flex-col items-center transition cursor-pointer relative"
        onClick={() => setOngSelecionada(ong)}
      >
        <img
          src={`http://localhost:5000/uploads/${ong.logo}`}
          alt={ong.nome}
          className=""
        />
        <h3 className="text-sm font-semibold text-center text-gray-700">{ong.nome}</h3>
      </div>
    ))}
  </div>

  {ongSelecionada && (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white max-w-md w-full p-6 rounded-2xl shadow-lg relative">
        <button
          onClick={() => setOngSelecionada(null)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4 text-gray-800">{ongSelecionada.nome}</h3>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Email:</strong> {ongSelecionada.email}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Telefone:</strong> {ongSelecionada.telefone}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Instagram:</strong> {ongSelecionada.instagram}
        </p>
      </div>
    </div>
  )}
</section>

      </div>

  

      {/* Modais e Botões flutuantes */}
  

{ongSelecionada && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-lg p-6 rounded-3xl shadow-xl relative">
      <button
        onClick={() => setOngSelecionada(null)}
        className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-xl"
      >
        ✕
      </button>

      {ongSelecionada.logo && (
        <div className="mb-4 text-center">
          <img
            src={`http://localhost:5000/uploads/${ongSelecionada.logo}`}
            alt={`Logo da ${ongSelecionada.nome}`}
            className="h-24 mx-auto object-contain"
          />
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-extrabold text-gray-800">Informações da ONG</h3>
        <p className="text-sm text-gray-500 mt-1">Confira os dados completos da instituição</p>
      </div>

      <div className="space-y-3 text-gray-700 text-sm">
        {ongSelecionada.nome && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">business</span>
            <strong className="w-36">Nome:</strong> {ongSelecionada.nome}
          </p>
        )}
        {ongSelecionada.responsibleName && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">person</span>
            <strong className="w-36">Responsável:</strong> {ongSelecionada.responsibleName}
          </p>
        )}
        {ongSelecionada.cnpj && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">badge</span>
            <strong className="w-36">CNPJ:</strong> {ongSelecionada.cnpj}
          </p>
        )}
        {ongSelecionada.phone && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">call</span>
            <strong className="w-36">Telefone:</strong> {ongSelecionada.phone}
          </p>
        )}
        {ongSelecionada.responsibleEmail && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">mail</span>
            <strong className="w-36">Email Resp.:</strong>
            <a href={`mailto:${ongSelecionada.responsibleEmail}`} className="text-emerald-600 hover:underline">
              {ongSelecionada.responsibleEmail}
            </a>
          </p>
        )}
        {ongSelecionada.email && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">email</span>
            <strong className="w-36">Email ONG:</strong>
            <a href={`mailto:${ongSelecionada.email}`} className="text-emerald-600 hover:underline">
              {ongSelecionada.email}
            </a>
          </p>
        )}
        {ongSelecionada.instagram && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">photo_camera</span>
            <strong className="w-36">Instagram:</strong>
            <a
              href={`https://instagram.com/${ongSelecionada.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              @{ongSelecionada.instagram.replace("@", "")}
            </a>
          </p>
        )}
        {ongSelecionada.tiktok && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">smart_display</span>
            <strong className="w-36">TikTok:</strong> @{ongSelecionada.tiktok}
          </p>
        )}
        {ongSelecionada.website && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">language</span>
            <strong className="w-36">Site:</strong>
            <a
              href={ongSelecionada.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              {ongSelecionada.website}
            </a>
          </p>
        )}
        {ongSelecionada.cep && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">location_on</span>
            <strong className="w-36">CEP:</strong> {ongSelecionada.cep}
          </p>
        )}
        {(ongSelecionada.street || ongSelecionada.number || ongSelecionada.complement) && (
          <p className="flex items-start gap-2">
            <span className="material-icons text-emerald-600 mt-0.5">home</span>
            <strong className="w-36">Endereço:</strong> 
            <span>
              {ongSelecionada.street}, {ongSelecionada.number} {ongSelecionada.complement && `- ${ongSelecionada.complement}`}<br/>
              {ongSelecionada.city} - {ongSelecionada.state}
            </span>
          </p>
        )}
      </div>
    </div>
  </div>
)}

{ongAdocao && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-lg p-6 rounded-3xl shadow-xl relative">
      <button
        onClick={() => setOngAdocao(null)}
        className="absolute top-4 right-5 text-gray-400 hover:text-gray-700 text-xl"
      >
        ✕
      </button>

      {ongAdocao.logo && (
        <div className="mb-4 text-center">
          <img
            src={`http://localhost:5000/uploads/${ongAdocao.logo}`}
            alt={`Logo da ${ongAdocao.nome}`}
            className="h-24 mx-auto object-contain"
          />
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-extrabold text-gray-800">Informações da ONG</h3>
        <p className="text-sm text-gray-500 mt-1">Confira os dados completos da instituição</p>
      </div>

      <div className="space-y-3 text-gray-700 text-sm">
        {ongAdocao.nome && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">business</span>
            <strong className="w-36">Nome:</strong> {ongAdocao.nome}
          </p>
        )}
        {ongAdocao.responsibleName && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">person</span>
            <strong className="w-36">Responsável:</strong> {ongAdocao.responsibleName}
          </p>
        )}
        {ongAdocao.cnpj && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">badge</span>
            <strong className="w-36">CNPJ:</strong> {ongAdocao.cnpj}
          </p>
        )}
        {ongAdocao.phone && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">call</span>
            <strong className="w-36">Telefone:</strong> {ongAdocao.phone}
          </p>
        )}
        {ongAdocao.responsibleEmail && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">mail</span>
            <strong className="w-36">Email Resp.:</strong>
            <a href={`mailto:${ongAdocao.responsibleEmail}`} className="text-emerald-600 hover:underline">
              {ongAdocao.responsibleEmail}
            </a>
          </p>
        )}
        {ongAdocao.email && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">email</span>
            <strong className="w-36">Email ONG:</strong>
            <a href={`mailto:${ongAdocao.email}`} className="text-emerald-600 hover:underline">
              {ongAdocao.email}
            </a>
          </p>
        )}
        {ongAdocao.instagram && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">photo_camera</span>
            <strong className="w-36">Instagram:</strong>
            <a
              href={`https://instagram.com/${ongAdocao.instagram.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              @{ongAdocao.instagram.replace("@", "")}
            </a>
          </p>
        )}
        {ongAdocao.tiktok && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">smart_display</span>
            <strong className="w-36">TikTok:</strong> @{ongAdocao.tiktok}
          </p>
        )}
        {ongAdocao.website && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">language</span>
            <strong className="w-36">Site:</strong>
            <a
              href={ongAdocao.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              {ongAdocao.website}
            </a>
          </p>
        )}
        {ongAdocao.cep && (
          <p className="flex items-center gap-2">
            <span className="material-icons text-emerald-600">location_on</span>
            <strong className="w-36">CEP:</strong> {ongAdocao.cep}
          </p>
        )}
        {(ongAdocao.street || ongAdocao.number || ongAdocao.complement) && (
          <p className="flex items-start gap-2">
            <span className="material-icons text-emerald-600 mt-0.5">home</span>
            <strong className="w-36">Endereço:</strong> 
            <span>
              {ongAdocao.street}, {ongAdocao.number} {ongAdocao.complement && `- ${ongAdocao.complement}`}<br/>
              {ongAdocao.city} - {ongAdocao.state}
            </span>
          </p>
        )}
      </div>
    </div>
  </div>
)}

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
