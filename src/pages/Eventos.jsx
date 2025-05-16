// Página de Eventos do AcolhaPatas
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import api from "../services/api"; 

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [filtros, setFiltros] = useState({
    ongsSelecionadas: [],
    data: "",
    cidade: "",
    estado: ""
  });
  const [showSlideFiltro, setShowSlideFiltro] = useState(false);
  const [modalEvento, setModalEvento] = useState(null);
  const [formEnviado, setFormEnviado] = useState(false);
  const filtroRef = useRef();

  useEffect(() => {
    buscarEventos();
    buscarOngs();
  }, []);

  const buscarEventos = async () => {
    try {
     const response = await axios.get("https://acolhapatas-api.onrender.com/eventos/public");
      const hoje = new Date();
      const eventosFiltrados = response.data.filter((evento) => new Date(evento.data) >= hoje);
      setEventos(eventosFiltrados.sort((a, b) => new Date(a.data) - new Date(b.data)));
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
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

  const handleCheckboxChange = (id) => {
    setFiltros((prev) => {
      const novaLista = prev.ongsSelecionadas.includes(id)
        ? prev.ongsSelecionadas.filter((i) => i !== id)
        : [...prev.ongsSelecionadas, id];
      return { ...prev, ongsSelecionadas: novaLista };
    });
  };

  const aplicarFiltros = (evento) => {
    const ongOk =
      filtros.ongsSelecionadas.length === 0 || filtros.ongsSelecionadas.includes(evento.ong?._id);
   const cidadeOk =
  filtros.cidade.trim() === "" ||
  evento.cidade?.toLowerCase().includes(filtros.cidade.trim().toLowerCase());

const estadoOk =
  filtros.estado === "Todos" ||
  evento.estado.toUpperCase() === filtros.estado.toUpperCase();

    const dataOk = filtros.data === "" || evento.data.slice(0, 10) === filtros.data;
    return ongOk && cidadeOk && estadoOk && dataOk;
  };

  const gerarLinkGoogleCalendar = (evento) => {
    const inicio = new Date(evento.data);
    const fim = new Date(inicio.getTime() + 2 * 60 * 60 * 1000); // +2h
    const formatar = (d) =>
      d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      evento.nome
    )}&dates=${formatar(inicio)}/${formatar(fim)}&details=${encodeURIComponent(
      evento.descricao || "Evento do AcolhaPatas"
    )}&location=${encodeURIComponent(evento.cidade + " - " + evento.estado)}`;
  };

  const enviarVoluntario = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await api.post("/contato", {
        name: formData.get("nome"),
        phone: formData.get("telefone"),
        message: `Quero ser voluntário para o evento ${modalEvento.nome}`,
        email: modalEvento.emailOng
      });
      setFormEnviado(true);
      setTimeout(() => setModalEvento(null), 2000);
    } catch (err) {
      alert("Erro ao enviar. Tente novamente.");
    }
  };

  return (
<>
  <header className="page-header headerEventos w-full h-60 md:h-72 lg:h-80 flex items-center bg-emerald-50 shadow-inner overflow-hidden page-header">
  <div className="w-1/2 h-full">
    
  </div>
  <div className="w-1/2 h-full flex items-center justify-center px-6">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 text-right">
      Eventos
    </h1>
  </div>
</header>
    <div className="p-4">
   

      <button
        onClick={() => setShowSlideFiltro((prev) => !prev)}
        className="fixed top-4 left-4 z-50 bg-white border border-emerald-300 p-2 rounded-full shadow-md hover:bg-emerald-100 md:hidden"
      >
        <span className="material-icons text-emerald-700">filter_list</span>
      </button>

      <div className="flex flex-col md:flex-row">
        <aside
          ref={filtroRef}
          className={`w-64 bg-white shadow-lg p-4 rounded-lg transition-transform duration-300 ease-in-out fixed top-0 left-0 h-full z-40 md:relative md:translate-x-0 md:block ${
            showSlideFiltro ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Filtrar</h2>

          <div className="campoFiltro mb-3">
            <h3 className="font-semibold">ONG</h3>
            {ongs.map((ong) => (
              <label key={ong._id} className="block text-sm">
                <input
                  type="checkbox"
                  value={ong._id}
                  checked={filtros.ongsSelecionadas.includes(ong._id)}
                  onChange={() => handleCheckboxChange(ong._id)}
                  className="mr-2"
                />
                {ong.name}
              </label>
            ))}
          </div>

          <div className="campoFiltro mb-3">
            <h3 className="font-semibold">Data</h3>
            <input
              type="date"
              value={filtros.data}
              onChange={(e) => setFiltros({ ...filtros, data: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="campoFiltro mb-3">
            <h3 className="font-semibold">Cidade</h3>
            <input
              type="text"
              placeholder="Cidade"
              value={filtros.cidade}
              onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="campoFiltro mb-3">
            <h3 className="font-semibold">Estado</h3>
            <select
              value={filtros.estado}
              onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Todos</option>
            { "AC,AL,AP,AM,BA,CE,DF,ES,GO,MA,MT,MS,MG,PA,PB,PR,PE,PI,RJ,RN,RS,RO,RR,SC,SP,SE,TO"
    .split(",")
    .map((uf) => (
      <option key={uf} value={uf}>{uf}</option>
    )) }

            </select>
          </div>
        </aside>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {eventos.filter(aplicarFiltros).map((evento) => (
            <div key={evento._id} className="bg-white rounded-xl shadow p-4">
              <img
                src={evento.imagem}
                alt={evento.nome}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-bold text-emerald-700 mb-1">{evento.nome}</h2>
              <p className="text-sm text-gray-600 mb-1">
                📅 {new Date(evento.data).toLocaleString("pt-BR")}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                📍 {evento.cidade} - {evento.estado}
              </p>
              <div className="flex gap-2">
                <a
                  href={gerarLinkGoogleCalendar(evento)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600"
                >
                  Me lembrar
                </a>
                {evento.precisaVoluntario  && (
                  <button
                    onClick={() => setModalEvento(evento)}
                    className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm hover:bg-emerald-600"
                  >
                    Quero me voluntariar
                  </button>
                )}
              </div>
            </div>
          ))}
        </main>
      </div>

      {modalEvento && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 relative">
            <button
              onClick={() => setModalEvento(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            {formEnviado ? (
              <p className="text-center text-emerald-600 font-semibold">
                Obrigado por se voluntariar! Entraremos em contato.
              </p>
            ) : (
              <form onSubmit={enviarVoluntario} className="space-y-3">
                <h2 className="text-xl font-bold text-center">Quero me voluntariar</h2>
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome"
                  required
                  className="w-full p-2 border rounded"
                />
                <input
                  type="text"
                  name="telefone"
                  placeholder="Seu telefone"
                  required
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded"
                >
                  Enviar
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div></>
  );
}
