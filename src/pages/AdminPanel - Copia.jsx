import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [pendentes, setPendentes] = useState([]);

  const buscarPendentes = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/pendentes`);
    setPendentes(res.data);
  };

  const aprovar = async (id) => {
    await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/aprovar/${id}`);
    buscarPendentes();
  };

  const recusar = async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/admin/recusar/${id}`);
    buscarPendentes();
  };

  useEffect(() => {
    buscarPendentes();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Painel de Aprovação</h1>
      {pendentes.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum cadastro pendente.</p>
      ) : (
        <div className="space-y-4">
          {pendentes.map((u) => (
            <div key={u._id} className="border rounded p-4 flex justify-between items-center">
              <div>
                <p><strong>Email:</strong> {u.email}</p>
                <p><strong>Tipo:</strong> {u.tipo}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => aprovar(u._id)} className="bg-green-600 text-white px-3 py-1 rounded">Aprovar</button>
                <button onClick={() => recusar(u._id)} className="bg-red-600 text-white px-3 py-1 rounded">Recusar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
