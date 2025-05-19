const { useEffect, useState } = require("react");
const axios = require("axios");


function DashboardOng() {
  const [animais, setAnimais] = useState([]);

  useEffect(() => { 
    const fetchAnimais = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${process.env.VITE_API_BASE_URL}/ongs/animais`, {

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnimais(response.data);
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      }
    };

    fetchAnimais();
  }, []);

  const total = animais.length;
  const paraAdocao = animais.filter((a) => a.status === "adocao").length;
  const precisaLar = animais.filter((a) => a.status === "precisa-lar").length;
  const adotados = animais.filter((a) => a.status === "adotado").length;

  const ultimosAnimais = [...animais]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Painel da ONG 🐾</h1>

      {/* Blocos com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Animais Cadastrados</h2>
          <p className="text-3xl font-bold">{total}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Para Adoção</h2>
          <p className="text-3xl font-bold">{paraAdocao}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Precisando de Lar</h2>
          <p className="text-3xl font-bold">{precisaLar}</p>
        </div>
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Adotados</h2>
          <p className="text-3xl font-bold">{adotados}</p>
        </div>
      </div>

      {/* Últimos animais cadastrados */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Últimos Animais Cadastrados 🐕</h2>
        <ul className="list-disc ml-6">
          {ultimosAnimais.map((animal) => (
            <li key={animal._id}>
              {animal.nome} – {new Date(animal.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <a href="/painel-ong/cadastro-animal" className="text-green-700 underline mt-2 inline-block">
          ➕ Ver todos os animais
        </a>
      </div>

      {/* Ações rápidas */}
      <div className="flex flex-col md:flex-row gap-4">
        <a href="/painel-ong/cadastro-animal" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded text-center">
          ➕ Cadastrar Novo Animal
        </a>
        <a href="/painel-ong/buscar-lar" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded text-center">
          🔍 Buscar Lar Temporário
        </a>
        <a href="/painel-ong/meus-dados" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded text-center">
          📝 Meus Dados
        </a>
      </div>
    </div>
  );
}
module.exports = DashboardOng;