
import React, { useState, useEffect } from "react";
import axios from "axios";
import ContatoFlutuante from "../components/ContatoFlutuante";

export default function CadastroEvento() {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    local: "",
    endereco: "",
    data: "",
    horaInicio: "",
    horaFim: "",
    descricao: "",
    precisaVoluntario: false,
    imagem: null,
  });
  const [modoCadastro, setModoCadastro] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [filtros, setFiltros] = useState({ nome: "", data: "", precisaVoluntario: false });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    buscarEventos();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, imagem: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const cadastrarEvento = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) data.append(key, value);
      });

      if (modoEdicao && eventoSelecionado) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/eventos/${eventoSelecionado._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/eventos`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setModoCadastro(false);
      setModoEdicao(false);
      setFormData({
        nome: "",
        local: "",
        endereco: "",
        data: "",
        horaInicio: "",
        horaFim: "",
        descricao: "",
        precisaVoluntario: false,
        imagem: null,
      });
      buscarEventos();
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    } finally {
      setLoading(false);
    }
  };

  const buscarEventos = async () => {
    try {
      const query = new URLSearchParams();
      if (filtros.nome.trim() !== "") query.append("nome", filtros.nome);
      if (filtros.data) query.append("data", filtros.data);
      if (filtros.precisaVoluntario !== false) query.append("precisaVoluntario", filtros.precisaVoluntario);

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/eventos?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEventos(response.data);
      setModoCadastro(false);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const editarEvento = (evento) => {
    setEventoSelecionado(evento);
    setModoCadastro(true);
    setModoEdicao(true);
    setFormData({
      nome: evento.nome || "",
      local: evento.local || "",
      endereco: evento.endereco || "",
      data: evento.data || "",
      horaInicio: evento.horaInicio || "",
      horaFim: evento.horaFim || "",
      descricao: evento.descricao || "",
      precisaVoluntario: !!evento.precisaVoluntario,
      imagem: null,
    });
  };

  const deletarEvento = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      buscarEventos();
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
    }
  };

  const clonarEvento = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/eventos/${id}/clonar`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      buscarEventos();
    } catch (error) {
      console.error("Erro ao clonar evento:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Buscar Eventos</h2>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 items-end">
        <input
          type="text"
          placeholder="Nome do Evento"
          className="border p-2 w-full md:w-64"
          value={filtros.nome}
          onChange={(e) => setFiltros((prev) => ({ ...prev, nome: e.target.value }))}
        />
        <input
          type="date"
          className="border p-2 w-full md:w-64"
          value={filtros.data}
          onChange={(e) => setFiltros((prev) => ({ ...prev, data: e.target.value }))}
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={filtros.precisaVoluntario}
            onChange={(e) => setFiltros((prev) => ({ ...prev, precisaVoluntario: e.target.checked }))}
          />
          Precisa de Voluntário
        </label>
        <button onClick={buscarEventos} className="bg-blue-600 text-white px-4 py-2 rounded">Procurar</button>
        <button onClick={() => {
          setModoCadastro(true);
          setModoEdicao(false);
          setFormData({
            nome: "", local: "", endereco: "", data: "", horaInicio: "", horaFim: "", descricao: "",
            precisaVoluntario: false, imagem: null
          });
        }} className="bg-green-500 text-white px-4 py-2 rounded">
          {loading ? "Salvando..." : modoEdicao ? "Salvar Alterações" : "Cadastrar Novo Evento"}
        </button>
      </div>

      {/* Formulário */}
      {modoCadastro && (
        <form onSubmit={cadastrarEvento} className="grid gap-2 mb-4">
          <input type="text" name="nome" value={formData.nome} onChange={handleFormChange} placeholder="Nome" className="border p-2 w-full md:w-64" required />
          <input type="text" name="local" value={formData.local} onChange={handleFormChange} placeholder="Local" className="border p-2 w-full md:w-64" required />
          <input type="text" name="endereco" value={formData.endereco} onChange={handleFormChange} placeholder="Endereço" className="border p-2 w-full md:w-64" />
          <input type="date" name="data" value={formData.data} onChange={handleFormChange} className="border p-2 w-full md:w-64" required />
          <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleFormChange} className="border p-2 w-full md:w-64" required />
          <input type="time" name="horaFim" value={formData.horaFim} onChange={handleFormChange} className="border p-2 w-full md:w-64" required />
          <textarea name="descricao" value={formData.descricao} onChange={handleFormChange} placeholder="Descrição" className="border p-2 w-full md:w-64" />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="precisaVoluntario" checked={formData.precisaVoluntario} onChange={handleFormChange} />
            Precisa de Voluntário
          </label>
          <input type="file" name="imagem" accept="image/*" onChange={handleFormChange} className="border p-2 w-full md:w-64" />
          <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded">
            {loading ? "Salvando..." : modoEdicao ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </form>
      )}

      {/* Lista de eventos */}
      
      {!modoCadastro && (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {eventos.map((evento) => (
            <div key={evento._id} className="bg-white p-4 shadow border rounded flex gap-4">
              {evento.imagem && (
                <img src={evento.imagem} alt="Imagem do Evento" className="w-24 h-24 object-cover rounded" />
              )}
              <div className="flex flex-col flex-1 justify-between">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold">{evento.nome}</h3>
                  <div className="flex gap-2">
                    <button onClick={() => editarEvento(evento)} className="text-blue-600 hover:text-blue-800">
                      <span className="material-icons">edit</span>
                    </button>
                    <button onClick={() => deletarEvento(evento._id)} className="text-red-600 hover:text-red-800">
                      <span className="material-icons">delete</span>
                    </button>
                    <button onClick={() => clonarEvento(evento._id)} className="text-gray-600 hover:text-gray-800">
                      <span className="material-icons">content_copy</span>
                    </button>
                  </div>
                </div>
                <p className="text-gray-600">{evento.local}</p>
                <p className="text-sm text-gray-500">{evento.endereco}</p>
                <p className="text-sm">{evento.data} • {evento.horaInicio} - {evento.horaFim}</p>
                {evento.precisaVoluntario && (
                  <span className="text-xs bg-yellow-300 text-black px-2 py-1 rounded w-fit mt-1">
                    Precisa de voluntário
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ContatoFlutuante />
    </div>
  );
}
