
import React, { useState, useEffect } from "react";
import axios from "axios";
import ContatoFlutuante from "../components/ContatoFlutuante";

export default function CadastroEvento() {
  const [eventos, setEventos] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    local: "",
    endereco: "",
    cidade: "",
    estado: "",
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
        cidade: "",
        estado: "",
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
      cidade: evento.cidade || "",
      estado: evento.estado || "",
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
      <div className="filtros-container flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8 mb-6">
         <div><label className="font-medium block mb-1">Nome do Evento:</label>
        <input
          type="text"
          placeholder="Nome do Evento"
          className="border p-2 w-full "
          value={filtros.nome}
          onChange={(e) => setFiltros((prev) => ({ ...prev, nome: e.target.value }))}
        /></div>
        <div><label className="font-medium block mb-1">Data:</label>
        <input
          type="date"
          className="border p-2 w-full "
          value={filtros.data}
          onChange={(e) => setFiltros((prev) => ({ ...prev, data: e.target.value }))}
        /></div>
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
            nome: "", local: "", endereco: "", cidade: "", estado: "", data: "", horaInicio: "", horaFim: "", descricao: "",
            precisaVoluntario: false, imagem: null
          });
        }} className="bg-green-500 text-white px-4 py-2 rounded h-10">
          {loading ? "Salvando..." : modoEdicao ? "Salvar Alterações" : "Cadastrar Novo Evento"}
        </button>
      </div>

      {/* Formulário */}
      {modoCadastro && (
        <form onSubmit={cadastrarEvento} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label className="font-medium block mb-1">Nome do Evento:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleFormChange} placeholder="Nome" className="border p-2 w-full " required /></div>
          <div><label className="font-medium block mb-1">Local do Evento:</label>
          <input type="text" name="local" value={formData.local} onChange={handleFormChange} placeholder="Local" className="border p-2 w-full " required /></div>
          <div><label className="font-medium block mb-1">Endereço do Evento:</label>
          <input type="text" name="endereco" value={formData.endereco} onChange={handleFormChange} placeholder="Endereço" className="border p-2 w-full " /></div>
          <div><label className="font-medium block mb-1">Cidade:</label>
         <input
  type="text"
  name="cidade"
  value={formData.cidade}
  onChange={handleFormChange}
  placeholder="Cidade"
  className="border p-2"
/>
</div>
<div><label className="font-medium block mb-1">Estado:</label>
<select
  name="estado"
  value={formData.estado}
  onChange={handleFormChange}
  className="border p-2"
>
  <option value="">Estado</option>
  {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map(uf => (
    <option key={uf} value={uf}>{uf}</option>
  ))}
</select></div>
<div><label className="font-medium block mb-1">Dia do Evento:</label>
          <input type="date" name="data" value={formData.data} onChange={handleFormChange} className="border p-2 w-full " required /></div>
          <div><label className="font-medium block mb-1">Hora de Início:</label>
          <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleFormChange} className="border p-2 w-full " required /></div>
          <div><label className="font-medium block mb-1">Hora de Fim:</label>
          <input type="time" name="horaFim" value={formData.horaFim} onChange={handleFormChange} className="border p-2 w-full " required /></div>
          <div><label className="font-medium block mb-1">Descreva o Evento:</label>
          <textarea name="descricao" value={formData.descricao} onChange={handleFormChange} placeholder="Descrição" className="border p-2 w-full " /></div>
                    <label className="flex items-center gap-2">
            <input type="checkbox" name="precisaVoluntario" checked={formData.precisaVoluntario} onChange={handleFormChange} />
            Precisa de Voluntário
          </label>
          <input type="file" name="imagem" accept="image/*" onChange={handleFormChange} className="border p-2 w-full " />
          <button type="submit" disabled={loading} className="bg-green-500 text-white px-4 py-2 rounded h-10">
            {loading ? "Salvando..." : modoEdicao ? "Salvar Alterações" : "Cadastrar"}
          </button>
        </form>
      )}

      {/* Lista de eventos */}
      
      {!modoCadastro && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="text-sm text-gray-500">{evento.cidade}</p>
                <p className="text-sm text-gray-500">{evento.estado}</p>
                <p className="text-sm">
  {new Date(evento.data).toLocaleDateString("pt-BR")} • {evento.horaInicio} - {evento.horaFim}
</p>

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
