
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
      console.log("Eventos retornados da API:", response.data);
      const hoje = new Date().toISOString().slice(0, 10);
      const eventosFiltrados = response.data.filter((evento) => evento.data >= hoje);
      setEventos(eventosFiltrados.sort((a, b) => a.data.localeCompare(b.data)));
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
    const ongId = typeof evento.ong === "object" ? evento.ong._id : evento.ong;
    const ongOk = filtros.ongsSelecionadas.length === 0 || filtros.ongsSelecionadas.includes(ongId);

    const cidadeOk =
      filtros.cidade.trim() === "" ||
      evento.cidade?.toLowerCase().includes(filtros.cidade.trim().toLowerCase());

    const estadoOk =
      filtros.estado === "" ||
      evento.estado?.toUpperCase() === filtros.estado.toUpperCase();

    const dataOk = filtros.data === "" || evento.data === filtros.data;

    return ongOk && cidadeOk && estadoOk && dataOk;
  };

  const gerarLinkGoogleCalendar = (evento) => {
    const inicio = new Date(evento.data + "T" + (evento.horaInicio || "10:00"));
    const fim = new Date(evento.data + "T" + (evento.horaFim || "12:00"));
    const formatar = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";

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
    <div className="p-4">
      <div className="flex flex-col md:flex-row">
        <aside className="w-64 bg-white shadow-lg p-4 rounded-lg">
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
              {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </div>
        </aside>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {eventos.filter(aplicarFiltros).map((evento) => (
            <div key={evento._id} className="bg-white rounded-xl shadow p-4">
              <img
                src={`https://acolhapatas-api.onrender.com/${evento.imagem}`}
                alt={evento.nome}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-bold text-emerald-700 mb-1">{evento.nome}</h2>
              <p className="text-sm text-gray-600 mb-1">📅 {evento.data}</p>
              <p className="text-sm text-gray-600 mb-2">📍 {evento.cidade} - {evento.estado}</p>
              <div className="flex gap-2">
                <a
                  href={gerarLinkGoogleCalendar(evento)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600"
                >
                  Me lembrar
                </a>
                {evento.precisaVoluntario && (
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
    </div>
  );
}
