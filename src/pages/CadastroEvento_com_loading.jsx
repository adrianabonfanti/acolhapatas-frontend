
// CadastroEvento.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import ContatoFlutuante from '../components/ContatoFlutuante';

export default function CadastroEvento() {
  const userStr = localStorage.getItem("user");
  if (!userStr) {
    console.warn("Usuário não logado");
    return <div className="p-6 text-red-600 font-bold">Você precisa estar logado para acessar esta página.</div>;
  }

  let user = {};
  try {
    user = JSON.parse(userStr);
  } catch (e) {
    console.error("Erro ao interpretar o user do localStorage:", e);
    return <div className="p-6 text-red-600 font-bold">Erro ao interpretar dados do usuário. Faça login novamente.</div>;
  }

  const token = user.token;
  if (!token) {
    console.error("Token ausente dentro do user");
    return <div className="p-6 text-red-600 font-bold">Token inválido. Faça login novamente.</div>;
  }

  const [modoCadastro, setModoCadastro] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [filtros, setFiltros] = useState({ nome: "", data: "", precisaVoluntario: false });

  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    buscarEventos();
    setLoading(false);
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, imagem: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFiltroChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFiltros({ ...filtros, [name]: type === "checkbox" ? checked : value });
  };

  const limparFormulario = () => {
    setFormData({
      nome: "",
      local: "",
      endereco: evento.endereco || "",
      data: "",
      horaInicio: "",
      horaFim: "",
      descricao: "",
      precisaVoluntario: false,
      imagem: null,
    });
    setModoEdicao(false);
    setEventoSelecionado(null);
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

  const cadastrarEvento = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "imagem" && formData.imagem) {
          data.append("imagem", formData.imagem, formData.imagem.name);
        } else if (typeof formData[key] === "boolean") {
          data.append(key, formData[key] ? "true" : "false");
        } else {
          data.append(key, formData[key]);
        }
      });

      if (modoEdicao && eventoSelecionado) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/eventos/${eventoSelecionado._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Evento atualizado com sucesso!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/eventos`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Evento cadastrado com sucesso!");
      }
      limparFormulario();
      buscarEventos();
    setLoading(false);
      setModoCadastro(false);
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
    setLoading(false);
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
    if (!window.confirm("Tem certeza que deseja apagar este evento?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      buscarEventos();
    setLoading(false);
    } catch (error) {
      console.error("Erro ao apagar evento:", error);
    }
  };

  const clonarEvento = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/eventos/${id}/clonar`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      buscarEventos();
    setLoading(false);
    } catch (error) {
      console.error("Erro ao clonar evento:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buscar Eventos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input type="text" name="nome" value={filtros.nome} onChange={handleFiltroChange} placeholder="Nome do Evento" className="border p-2 w-full" />
        <input type="date" name="data" value={filtros.data} onChange={handleFiltroChange} className="border p-2 w-full" />
        <label className="flex gap-2 items-center">
          <input type="checkbox" name="precisaVoluntario" checked={filtros.precisaVoluntario} onChange={handleFiltroChange} />
          Precisa de Voluntário
        </label>
      </div>
      <div className="mt-4 flex gap-4">
        <button onClick={buscarEventos} className="bg-blue-500 text-white px-4 py-2 rounded">Procurar</button>
        <button
          onClick={() => {
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
            setModoEdicao(false);
            setEventoSelecionado(null);
            setModoCadastro(true);
          }}
          className="bg-emerald-500 text-white px-4 py-2 rounded"
        >
          Cadastrar Novo Evento
        </button>
      </div>

      {modoCadastro && (
        <form onSubmit={cadastrarEvento} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <input type="text" name="nome" value={formData.nome} onChange={handleFormChange} placeholder="Nome" className="border p-2 w-full" required />
          <input type="text" name="local" value={formData.local} onChange={handleFormChange} placeholder="Local" className="border p-2 w-full" required />
         <input
  type="text"
  name="endereco"
  value={formData.endereco}
  onChange={handleFormChange}
  placeholder="Endereço completo do evento"
  className="border p-2 w-full"
  required
/>
          <input type="date" name="data" value={formData.data} onChange={handleFormChange} className="border p-2 w-full" required />
          <input type="time" name="horaInicio" value={formData.horaInicio} onChange={handleFormChange} className="border p-2 w-full" required />
          <input type="time" name="horaFim" value={formData.horaFim} onChange={handleFormChange} className="border p-2 w-full" required />
          <textarea name="descricao" value={formData.descricao} onChange={handleFormChange} placeholder="Descrição" className="border p-2 w-full md:col-span-2" rows={4} />
          <label className="flex gap-2 items-center">
            <input type="checkbox" name="precisaVoluntario" checked={formData.precisaVoluntario} onChange={handleFormChange} />
            Precisa de Voluntário
          </label>
          <input type="file" name="imagem" onChange={handleFormChange} className="md:col-span-2" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded md:col-span-2">
            {loading ? "Salvando..." : modoEdicao ? "Salvar Alterações" : "Cadastrar Evento"}
          </button>
        </form>
      )}

      {!modoCadastro && eventos.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventos.map((evento) => (
            <div key={evento._id} className="bg-white p-4 shadow border rounded">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold">{evento.nome}</h3>
                <div className="flex gap-2">
                  <button onClick={() => editarEvento(evento)} className="text-blue-600 hover:text-blue-800 relative group">
                    <span className="material-icons">edit</span>
                  </button>
                  <button onClick={() => deletarEvento(evento._id)} className="text-red-600 hover:text-red-800 relative group">
                    <span className="material-icons">delete</span>
                  </button>
                  <button onClick={() => clonarEvento(evento._id)} className="text-gray-600 hover:text-gray-800 relative group">
                    <span className="material-icons">content_copy</span>
                  </button>
                </div>
              </div>
              <p className="text-gray-600">{evento.local}</p>
              <p className="text-sm text-gray-500">{evento.endereco}</p>
              <p className="text-sm">{evento.data} • {evento.horaInicio} - {evento.horaFim}</p>
              {evento.precisaVoluntario && <span className="text-xs bg-yellow-300 text-black px-2 py-1 rounded">Precisa de voluntário</span>}
            </div>
          ))}
        </div>
      )}

      {!modoCadastro && eventos.length === 0 && (
        <div className="mt-8 text-center text-gray-600">
          Nenhum evento encontrado. Clique em "Cadastrar Novo Evento" para começar.
        </div>
      )}

      <ContatoFlutuante />
    </div>
  );
}
