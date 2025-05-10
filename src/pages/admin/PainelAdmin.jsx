import { useState, useEffect } from "react";
import axios from "axios";

export default function PainelAdmin() {
  const [ongs, setOngs] = useState([]);
  const [lares, setLares] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [dadosModal, setDadosModal] = useState({});
  const [tituloModal, setTituloModal] = useState("");

  const adminToken = localStorage.getItem("adminToken");

  const axiosAuth = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/`,
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });

  useEffect(() => {
    buscarOngs();
    buscarLares();
    buscarAnimais();
  }, []);

  const buscarOngs = async () => {
    try {
      const response = await axiosAuth.get("/admin/ongs");
      setOngs(response.data);
    } catch (error) {
      console.error("Erro ao buscar ONGs:", error);
    }
  };

  const buscarLares = async () => {
    try {
      const response = await axiosAuth.get("/admin/lares");
      setLares(response.data);
    } catch (error) {
      console.error("Erro ao buscar Lares Temporários:", error);
    }
  };

  const buscarAnimais = async () => {
    try {
      const response = await axiosAuth.get("/admin/animais");
      setAnimais(response.data);
    } catch (error) {
      console.error("Erro ao buscar Animais:", error);
    }
  };

  const aprovarOng = async (id) => {
    await axiosAuth.put(`/admin/ongs/aprovar/${id}`);
    buscarOngs();
  };

  const apagarOng = async (id) => {
    if (confirm("Tem certeza que deseja apagar esta ONG?")) {
      await axiosAuth.delete(`/admin/ongs/${id}`);
      buscarOngs();
    }
  };

  const aprovarLar = async (id) => {
    await axiosAuth.put(`/admin/lares/aprovar/${id}`);
    buscarLares();
  };

  const apagarLar = async (id) => {
    if (confirm("Tem certeza que deseja apagar este Lar Temporário?")) {
      await axiosAuth.delete(`/admin/lares/${id}`);
      buscarLares();
    }
  };

  const apagarAnimal = async (id) => {
    if (confirm("Tem certeza que deseja apagar este animal?")) {
      await axiosAuth.delete(`/admin/animais/${id}`);
      buscarAnimais();
    }
  };

  const abrirModal = (dados, titulo) => {
    setDadosModal(dados);
    setTituloModal(titulo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Painel de Administração - AcolhaPatas</h1>

      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-emerald-500 text-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold">ONGs Cadastradas</h2>
          <p className="text-3xl">{ongs.length}</p>
        </div>
        <div className="bg-emerald-600 text-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold">Lares Temporários</h2>
          <p className="text-3xl">{lares.length}</p>
        </div>
        <div className="bg-emerald-700 text-white p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold">Animais Cadastrados</h2>
          <p className="text-3xl">{animais.length}</p>
        </div>
      </div>

      {/* Cards Mobile */}
      <div className="md:hidden flex flex-col gap-6">
        {[...ongs, ...lares, ...animais].map((item) => (
          <div key={item._id} className="bg-white p-4 rounded-xl shadow border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{item.name || item.nome || item.email}</h3>
                <p className="text-sm text-gray-600">
                  {item.tipo || item.cidade || item.especie || "Cadastro"}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => abrirModal(item, "Detalhes")}
                        className="text-gray-600 hover:text-blue-600 relative group">
                  <span className="material-icons">search</span>
                </button>
                {item.approved === false && (item.tipo || item.cidade) && (
                  <button onClick={() => (item.tipo ? aprovarOng(item._id) : aprovarLar(item._id))}
                          className="text-green-600 hover:text-green-800 relative group">
                    <span className="material-icons">check_circle</span>
                  </button>
                )}
                <button onClick={() => {
                  if (item.tipo) apagarOng(item._id);
                  else if (item.cidade) apagarLar(item._id);
                  else apagarAnimal(item._id);
                }}
                className="text-red-600 hover:text-red-800 relative group">
                  <span className="material-icons">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Detalhes */}
      {modalAberto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{tituloModal}</h2>
            <ul className="flex flex-col gap-2">
              {Object.entries(dadosModal).map(([key, value]) => (
                <li key={key}>
                  <strong>{formatarCampo(key)}:</strong> {value || "Não informado"}
                </li>
              ))}
            </ul>
            <button
              onClick={fecharModal}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatarCampo(campo) {
  return campo
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
