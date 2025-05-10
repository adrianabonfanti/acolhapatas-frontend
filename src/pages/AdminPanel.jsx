import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [pendentes, setPendentes] = useState([]);

  const buscarPendentes = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/pendentes`);
    setPendentes(res.data);
  };

  const aprovar = async (id) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/aprovar/${id}`);
      buscarPendentes();
    } catch (error) {
      console.error("Erro ao aprovar:", error);
      alert("Erro ao aprovar cadastro.");
    }
  };

  const recusar = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/recusar/${id}`);
      buscarPendentes();
    } catch (error) {
      console.error("Erro ao recusar:", error);
      alert("Erro ao recusar cadastro.");
    }
  };

  useEffect(() => {
    buscarPendentes(); 
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Painel de Aprovação</h1>

      {/* Mini dashboard */}
      <div className="bg-emerald-100 text-emerald-800 rounded-lg p-4 mb-6 text-center shadow">
        <p className="text-lg font-semibold">Cadastros Pendentes</p>
        <p className="text-3xl font-bold mt-1">{pendentes.length}</p>
      </div>

      {pendentes.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum cadastro pendente.</p>
      ) : (
        <div className="md:hidden flex flex-col gap-4">
          {pendentes.map((u) => (
            <div
              key={u._id}
              className="bg-white shadow rounded-md p-4 border border-gray-200"
            >
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
                    onClick={() => alert(`Ver detalhes de ${u.email}`)}
                    className="text-gray-600 hover:text-blue-600 relative group"
                  >
                    <span className="material-icons">search</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver
                    </span>
                  </button>
                  <button
                    onClick={() => recusar(u._id)}
                    className="text-red-600 hover:text-red-800 relative group"
                  >
                    <span className="material-icons">delete</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Recusar
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
    </div>
  );
} 