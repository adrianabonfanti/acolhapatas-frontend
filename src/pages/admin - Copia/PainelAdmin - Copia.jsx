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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Administração - AcolhaPatas</h1>

      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-emerald-500 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">ONGs Cadastradas</h2>
          <p className="text-3xl">{ongs.length}</p>
        </div>
        <div className="bg-emerald-600 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">Lares Temporários</h2>
          <p className="text-3xl">{lares.length}</p>
        </div>
        <div className="bg-emerald-700 text-white p-6 rounded shadow">
          <h2 className="text-xl font-bold">Animais Cadastrados</h2>
          <p className="text-3xl">{animais.length}</p>
        </div>
      </div>

      {/* ONGs */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">ONGs</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cidade</th>
              <th>Responsável</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ongs.map((ong) => (
              <tr key={ong._id} className="border-t">
                <td>{ong.name}</td>
                <td>{ong.city}</td>
                <td>{ong.responsibleName}</td>
                <td>{ong.phone}</td>
                <td>{ong.approved ? "Aprovado" : "Pendente"}</td>
                <td className="flex gap-2">
                  <button onClick={() => abrirModal(ong, "Detalhes da ONG")} title="Ver detalhes">🔍</button>
                  {!ong.approved && <button onClick={() => aprovarOng(ong._id)} className="bg-green-500 text-white px-2 py-1 rounded">Aprovar</button>}
                  <button onClick={() => apagarOng(ong._id)} className="bg-red-500 text-white px-2 py-1 rounded">Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Lares Temporários */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Lares Temporários</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cidade</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lares.map((lar) => (
              <tr key={lar._id} className="border-t">
                <td>{lar.nome}</td>
                <td>{lar.cidade}</td>
                <td>{lar.telefone}</td>
                <td>{lar.approved ? "Aprovado" : "Pendente"}</td>
                <td className="flex gap-2">
                  <button onClick={() => abrirModal(lar, "Detalhes do Lar Temporário")} title="Ver detalhes">🔍</button>
                  {!lar.approved && <button onClick={() => aprovarLar(lar._id)} className="bg-green-500 text-white px-2 py-1 rounded">Aprovar</button>}
                  <button onClick={() => apagarLar(lar._id)} className="bg-red-500 text-white px-2 py-1 rounded">Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Animais */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Animais</h2>
        <table className="min-w-full border">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Idade</th>
              <th>Porte</th>
              <th>Sexo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {animais.map((animal) => (
              <tr key={animal._id} className="border-t">
                <td>{animal.nome}</td>
                <td>{animal.especie}</td>
                <td>{animal.idade}</td>
                <td>{animal.porte}</td>
                <td>{animal.sexo}</td>
                <td className="flex gap-2">
                  <button onClick={() => abrirModal(animal, "Detalhes do Animal")} title="Ver detalhes">🔍</button>
                  <button onClick={() => apagarAnimal(animal._id)} className="bg-red-500 text-white px-2 py-1 rounded">Apagar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

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
