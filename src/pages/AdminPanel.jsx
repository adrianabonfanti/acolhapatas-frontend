const { useEffect, useState } = require("react");
const axios = require("axios");

function AdminPanel() {
  const [pendentes, setPendentes] = useState([]);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [detalhesEvento, setDetalhesEvento] = useState(null);

const API_BASE_URL = process.env.VITE_API_BASE_URL;

  const buscarPendentes = async () => {
    const res = await axios.get(`${API_BASE_URL}/admin/pendentes`);
    setPendentes(res.data);
  };

  const buscarEventos = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/eventos/todos`);
      setEventos(res.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const aprovar = async (id) => {
    try {
      await axios.post(`${API_BASE_URL}/admin/aprovar/${id}`);
      buscarPendentes();
    } catch (error) {
      console.error("Erro ao aprovar:", error);
      alert("Erro ao aprovar cadastro.");
    }
  };

  const recusar = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/admin/recusar/${id}`);
      buscarPendentes();
    } catch (error) {
      console.error("Erro ao recusar cadastro:", error);
      alert("Erro ao recusar cadastro.");
    }
  };

  const deletarEvento = async (id) => {
    if (confirm("Tem certeza que deseja excluir este evento?")) {
      try {
        await axios.delete(`${API_BASE_URL}/eventos/${id}`);
        buscarEventos();
      } catch (error) {
        console.error("Erro ao deletar evento:", error);
        alert("Erro ao deletar evento.");
      }
    }
  };

  useEffect(() => {
    buscarPendentes();
    buscarEventos();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Painel de Aprovação</h1>

      <div className="bg-emerald-100 text-emerald-800 rounded-lg p-4 mb-6 text-center shadow">
        <p className="text-lg font-semibold">Cadastros Pendentes</p>
        <p className="text-3xl font-bold mt-1">{pendentes.length}</p>
      </div>

      {pendentes.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum cadastro pendente.</p>
      ) : (
        <div className="md:hidden flex flex-col gap-4">
          {pendentes.map((u) => (
            <div key={u._id} className="bg-white shadow rounded-md p-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  {u.foto && (
                    <img
                      src={u.foto}
                      alt={`Foto de ${u.nome || u.email}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-bold">{u.nome || u.email}</h3>
                    <p className="text-sm text-gray-600">{u.tipo}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEventoSelecionado(u)}
                    className="text-gray-600 hover:text-blue-600 relative group"
                  >
                    <span className="material-icons">search</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver
                    </span>
                  </button>
                  <button
                    onClick={() => deletarEvento(u._id)}
                    className="text-red-600 hover:text-red-800 relative group"
                  >
                    <span className="material-icons">delete</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Excluir
                    </span>
                  </button>
                  <button
                    onClick={() => aprovar(u._id)}
                    className="text-emerald-600 hover:text-emerald-800 relative group"
                  >
                    <span className="material-icons">check_circle</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Aprovar
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-xl font-bold mt-8 mb-4 text-center">Eventos Cadastrados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventos.map((evento) => (
          <div key={evento._id} className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-bold text-emerald-800">{evento.nome}</h3>
            <p className="text-sm text-gray-700">
              {new Date(evento.data).toLocaleDateString("pt-BR")} • {evento.horaInicio} - {evento.horaFim}
            </p>
            <p className="text-sm text-gray-600">
              {evento.cidade} - {evento.estado}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setDetalhesEvento(evento)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
              >
                <span className="material-icons text-sm align-middle">search</span>
              </button>
              <button
                onClick={() => deletarEvento(evento._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                <span className="material-icons text-sm align-middle">delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {detalhesEvento && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setDetalhesEvento(null)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-2">{detalhesEvento.nome}</h2>
            <p><strong>Data:</strong> {new Date(detalhesEvento.data).toLocaleDateString("pt-BR")}</p>
            <p><strong>Horário:</strong> {detalhesEvento.horaInicio} - {detalhesEvento.horaFim}</p>
            <p><strong>Endereço:</strong> {detalhesEvento.endereco}</p>
            <p><strong>Cidade:</strong> {detalhesEvento.cidade} - {detalhesEvento.estado}</p>
            <p><strong>Descrição:</strong> {detalhesEvento.descricao}</p>
            {detalhesEvento.ong?.nome && (
              <p><strong>ONG:</strong> {detalhesEvento.ong.nome}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

module.exports = AdminPanel;
