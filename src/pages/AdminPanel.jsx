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
        <div className="flex flex-col gap-4">
          {pendentes.map((u) => (
            <div
              key={u._id}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200"
            >
              <div className="flex items-center gap-4">
                {u.foto && (
                  <img
                    src={u.foto}
                    alt="Foto"
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="font-bold text-lg text-gray-800">{u.nome || u.email}</p>
                  <p className="text-sm text-gray-600">{u.tipo}</p>
                </div>
              </div>
  
              <div className="mt-4 flex justify-around border-t pt-3">
                <button
                  onClick={() => alert(`Ver detalhes de ${u.email}`)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <span className="material-icons">search</span>
                </button>
                <button
                  onClick={() => recusar(u._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <span className="material-icons">delete</span>
                </button>
                <button
                  onClick={() => aprovar(u._id)}
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  <span className="material-icons">check_circle</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}
