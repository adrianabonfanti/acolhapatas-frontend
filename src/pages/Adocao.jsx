const { useState, useEffect, useRef } = require("react");
const axios = require("axios");
const api = require("../services/api");
require("../styles/adocao.css");
require("../styles/global.css");
const ModalOng = require("../components/ModalOng");


function Adocao() {
  const [filtros, setFiltros] = useState({ nome: "", especie: [], sexo: [], idade: [], porte: [], ong: "", cidade: "", estado: "" });
  const [animais, setAnimais] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [ongAdocao, setOngAdocao] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const formRef = useRef();
  const buttonRef = useRef();
  const [showSlideFiltro, setShowSlideFiltro] = useState(false);
  const filtroRef = useRef();
  const filtroButtonRef = useRef();

  
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

      const response = await axios.get(`https://acolhapatas-api.onrender.com/public/animals?${query.toString()}`);

      setAnimais(response.data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
    }
  };

  const buscarOngs = async () => {
    try {
      const response = await axios.get("https://acolhapatas-api.onrender.com/public/ongs");

      setOngs(response.data);
    } catch (error) {
      console.error("Erro ao buscar ONGs:", error);
    }
  };
  useEffect(() => {
    async function carregarOngs() {
      try {
        const res = await axios.get("https://acolhapatas-api.onrender.com/public/ongs");

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
    <header className="page-header headerAdocao w-full h-60 md:h-72 lg:h-80 flex items-center bg-emerald-50 shadow-inner overflow-hidden page-header">
  <div className="w-1/2 h-full">
    
  </div>
  <div className="w-1/2 h-full flex items-center justify-center px-6">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 text-right">
      Animais para Adoção
    </h1>
  </div>
</header>
<button
  ref={filtroButtonRef}
  onClick={() => setShowSlideFiltro((prev) => !prev)}
  className="fixed top-4 left-4 z-50 bg-white border border-emerald-300 p-2 rounded-full shadow-md hover:bg-emerald-100 md:hidden botaoFiltro"
>
  <span className="material-icons text-emerald-700">filter_list</span>
</button>

    <div className="conteudo-adocao flex flex-col md:flex-row relative">
  

      {/* Sidebar de Filtros */}
      <div
  ref={filtroRef}
  className={`filtros-container transition-transform duration-300 ease-in-out fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform ${
    showSlideFiltro ? 'translate-x-0' : '-translate-x-full'
  } md:relative md:translate-x-0 md:block`}
>

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
  <img src={animal.fotos[0]} alt={animal.nome} className="w-full h-48 object-cover rounded-xl mb-4" />

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
      {ongAdocao && <ModalOng ong={ongAdocao} onClose={() => setOngAdocao(null)} />}










    </div></>
  );
}
module.exports = Adocao;