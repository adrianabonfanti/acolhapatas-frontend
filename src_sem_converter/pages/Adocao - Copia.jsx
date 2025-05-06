import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/adocao.css";
import "../styles/global.css";

export default function Adocao() {
  const [showFiltrosMobile, setShowFiltrosMobile] = useState(false);
  const [filtros, setFiltros] = useState({ nome: "", especie: [], sexo: [], idade: [], porte: [], ong: "", cidade: "", estado: "" });
  const [animais, setAnimais] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [ongAdocao, setOngAdocao] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const formRef = useRef();
  const buttonRef = useRef();

  const buscarAnimais = async () => {
    try {
      const query = new URLSearchParams();
      if (filtros.nome) query.append("nome", filtros.nome);
      if (filtros.especie.length > 0) filtros.especie.forEach(e => query.append("especie", e));
      if (filtros.sexo.length > 0) filtros.sexo.forEach(s => query.append("sexo", s));
      if (filtros.idade.length > 0) filtros.idade.forEach(i => query.append("idade", i));
      if (filtros.porte.length > 0) filtros.porte.forEach(p => query.append("porte", p));
      if (filtros.ong) {
        const ongSelecionada = ongs.find((o) => o._id === filtros.ong);
        if (ongSelecionada) {
          query.append("ong", ongSelecionada.name); // o backend filtra pelo NOME
        }
      }
      
      if (filtros.cidade) query.append("cidade", filtros.cidade.trim().toLowerCase());
      if (filtros.estado) query.append("estado", filtros.estado.toUpperCase());

      const response = await axios.get(`http://localhost:5000/public/animals?${query.toString()}`);
      setAnimais(response.data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
    }
  };

  const buscarOngs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/public/ongs");
      setOngs(response.data);
    } catch (error) {
      console.error("Erro ao buscar ONGs:", error);
    }
  };
  useEffect(() => {
    async function carregarOngs() {
      try {
        const res = await axios.get("http://localhost:5000/public/ongs");
        setOngs(res.data);
      } catch (error) {
        console.error("Erro ao carregar ONGs:", error);
      }
    }
  
    carregarOngs();
  }, []);
  
  
  useEffect(() => {
    buscarAnimais();
    buscarOngs();
  }, []);

  useEffect(() => {
    buscarAnimais();
  }, [filtros]);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFiltros(prev => ({ ...prev, [name]: [...prev[name], value] }));
    } else {
      setFiltros(prev => ({ ...prev, [name]: prev[name].filter(item => item !== value) }));
    }
  };

  const handleInputChange = (e) => {
    setFiltros({ ...filtros, nome: e.target.value });
  };

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

  return (
    <>
    <header className="page-header headerAdocao w-full h-60 md:h-72 lg:h-80 flex items-center bg-emerald-50 shadow-inner overflow-hidden page-header">
  <div className="w-1/2 h-full">
    
  </div>
  <div className="w-1/2 h-full flex items-center justify-center px-6">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 text-right">
      Animais para Adoção
    </h1>
  </div>
</header>

    <div className="conteudo-adocao">
      <div className="md:hidden filtroAdocaoMobile">
  <button
    onClick={() => setShowFiltrosMobile(!showFiltrosMobile)}
    className="botao-toggle-filtros"
  >
    
    {showFiltrosMobile ? "Ocultar Filtros" : "Mostrar Filtros"}
  </button>
</div>

      {/* Sidebar de Filtros */}
      <div className={`filtros-container ${showFiltrosMobile ? 'block' : 'hidden'} md:block`}>

        <h2 className="text-xl font-bold mb-4">Filtrar</h2>

        <div className="campoFiltro">
        <h3 className="font-semibold">Nome</h3>
  <input
    id="nome"
    type="text"
    placeholder="Nome"
    value={filtros.nome}
    onChange={handleInputChange}
    className="w-full mt-1 p-2 border rounded"
  />
</div>

        <div className="campoFiltro">
          <h3 className="font-semibold">ONG</h3>
          <select value={filtros.ong} onChange={(e) => setFiltros({ ...filtros, ong: e.target.value })}>
  <option value="">Todas</option>
  {ongs.map((ong) => (
    <option key={ong._id} value={ong._id}>{ong.name}</option>
  ))}
</select>
        </div>

        <div className="campoFiltro">
          <h3 className="font-semibold">Cidade</h3>
          <input
            type="text"
            placeholder="Cidade"
            value={filtros.cidade}
            onChange={(e) => setFiltros(prev => ({ ...prev, cidade: e.target.value }))}
            className="w-full mb-2 p-2 border rounded"
          />
        </div>

        <div className="campoFiltro">
          <h3 className="font-semibold">Estado</h3>
          <select
            value={filtros.estado}
            onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
            className="w-full mb-2 p-2 border rounded"
          >
            <option value="">Todos</option>
            {[
              "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
              "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
              "SP", "SE", "TO"
            ].map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>


        <div className="filtroCheckbox">
          <h3 className="font-semibold">Espécie</h3>
          <div>
            <label><input type="checkbox" name="especie" value="Cachorro" onChange={handleCheckboxChange} /> Cachorro</label>
         
            <label><input type="checkbox" name="especie" value="Gato" onChange={handleCheckboxChange} /> Gato</label>
          </div>
        </div>

        <div className="filtroCheckbox">
          <h3 className="font-semibold">Sexo</h3>
          <div>
           <label><input type="checkbox" name="sexo" value="macho" onChange={handleCheckboxChange} /> Macho</label>
          
            <label><input type="checkbox" name="sexo" value="femea" onChange={handleCheckboxChange} /> Fêmea</label>
          </div>
        </div>

        <div className="filtroCheckbox">
          <h3 className="font-semibold">Idade</h3>
          <div>
           <label> <input type="checkbox" name="idade" value="Filhote" onChange={handleCheckboxChange} /> Filhote</label>
          
           <label> <input type="checkbox" name="idade" value="Adulto" onChange={handleCheckboxChange} /> Adulto</label>
       
           <label> <input type="checkbox" name="idade" value="Idoso" onChange={handleCheckboxChange} /> Idoso</label>
          </div>
        </div>

        <div className="filtroCheckbox">
          <h3 className="font-semibold">Porte</h3>
          <div>
           <label> <input type="checkbox" name="porte" value="Pequeno" onChange={handleCheckboxChange} /> Pequeno</label>
          
           <label> <input type="checkbox" name="porte" value="Médio" onChange={handleCheckboxChange} /> Médio</label>
        
           <label> <input type="checkbox" name="porte" value="Grande" onChange={handleCheckboxChange} /> Grande</label>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {animais.length > 0 ? (
          animais.map((animal) => (
            <div key={animal._id} className="bg-white rounded-3xl shadow-md hover:shadow-lg p-4 flex flex-col">
  <img src={`http://localhost:5000/uploads/${animal.fotos[0]}`} alt={animal.nome} className="w-full h-48 object-cover rounded-xl mb-4" />

  <h3 className="text-lg font-bold text-gray-800 mb-1">{animal.nome}</h3>
  <p className="text-sm text-gray-600 mb-2">{animal.especie} | {animal.idade} | {animal.porte} | {animal.sexo}</p>

  {animal.descricao && <p className="text-sm italic text-gray-700 mb-3">"{animal.descricao}"</p>}

  <div className="flex flex-wrap gap-2 text-xs text-gray-700 mb-4">
    {String(animal.castrado) === "true" && (
      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
        <i className="material-icons text-sm">check_circle</i> Castrado
      </span>
    )}
    {String(animal.vacinado) === "true" && (
      <span className="inline-flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full">
        <i className="material-icons text-sm">vaccines</i> Vacinado
      </span>
    )}
    {String(animal.precisaLarTemporario) === "true" && (
      <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full">
        <i className="material-icons text-sm">house</i> Precisa de lar
      </span>
    )}
    {String(animal.usaMedicacao) === "true" && (
      <span className="inline-flex items-center gap-1 bg-pink-50 text-pink-700 px-2 py-1 rounded-full">
        <i className="material-icons text-sm">medication</i> Medicação
      </span>
    )}
    {String(animal.deficiencia) === "true" && (
      <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2 py-1 rounded-full">
        <i className="material-icons text-sm">accessibility</i> Deficiente
      </span>
    )}
    {String(animal.necessidadesEspeciais) === "true" && (
      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
        <i className="material-icons text-sm">psychology</i> Necessidades especiais
      </span>
    )}
  </div>

  <button
  onClick={() => {
    const ong = ongs.find((o) => o._id === (typeof animal.ong === 'string' ? animal.ong : animal.ong._id));
    console.log("ONG da adoção:", ong);
    setOngAdocao(ong);
  }}className="botaoQueroAdotar w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-2 rounded-full"
  
>
  Quero Adotar
</button>


</div>

          ))
        ) : (
          <p className="text-gray-500">Nenhum animal encontrado.</p>
        )}
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

      {/* Modal da ONG */}
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






    </div></>
  );
}
