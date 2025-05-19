import { useState } from "react";
import axios from "axios";
import ContatoFlutuante from '../components/ContatoFlutuante';

export default function BuscarLarTemporario() {
  const [filtros, setFiltros] = useState({
    nome: "",
    cidade: "",
    estado: "",
    especie: "",
    porte: "",
    idade: "",
    sexo: "",
    medicacao: false,
    tratamento: false,
    necessidadesEspeciais: false,
  });

  const [lares, setLares] = useState([]);

  const handleFiltroChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFiltros({ ...filtros, [name]: checked });
    } else {
      setFiltros({ ...filtros, [name]: value });
    }
  };

  const buscarLares = async () => {
    try {
      const query = new URLSearchParams();
      Object.keys(filtros).forEach((key) => {
        if (filtros[key]) query.append(key, filtros[key]);
      });
 
      const token = localStorage.getItem("token");

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/lartemporario?${query.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLares(response.data);
    } catch (error) {
      console.error("Erro ao buscar lares:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Procurar Lar Temporário</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div><label className="font-medium block mb-1">Nome:</label>
        <input type="text" name="nome" value={filtros.nome} onChange={handleFiltroChange} placeholder="Nome" className="border p-2" /></div>
        <div><label className="font-medium block mb-1">Cidade:</label>
        <input type="text" name="cidade" value={filtros.cidade} onChange={handleFiltroChange} placeholder="Cidade" className="border p-2" /></div>
        <div><label className="font-medium block mb-1">Estado:</label>
        <input type="text" name="estado" value={filtros.estado} onChange={handleFiltroChange} placeholder="Estado" className="border p-2" /></div>
<div><label className="font-medium block mb-1">Espécie:</label>
        <select name="especie" value={filtros.especie} onChange={handleFiltroChange} className="border p-2">
          <option value="">Todas as Espécies</option>
          <option value="cachorro">Cachorro</option>
          <option value="gato">Gato</option>
        </select></div>
<div><label className="font-medium block mb-1">Porte:</label>
        <select name="porte" value={filtros.porte} onChange={handleFiltroChange} className="border p-2">
          <option value="">Todos os Portes</option>
          <option value="pequeno">Pequeno</option>
          <option value="medio">Médio</option>
          <option value="grande">Grande</option>
        </select></div>
<div><label className="font-medium block mb-1">Idade:</label>
        <select name="idade" value={filtros.idade} onChange={handleFiltroChange} className="border p-2">
          <option value="">Todas as Idades</option>
          <option value="filhote">Filhote</option>
          <option value="adulto">Adulto</option>
          <option value="idoso">Idoso</option>
        </select></div>
<div><label className="font-medium block mb-1">Sexo:</label>
        <select name="sexo" value={filtros.sexo} onChange={handleFiltroChange} className="border p-2">
          <option value="">Todos os Sexos</option>
          <option value="macho">Macho</option>
          <option value="femea">Fêmea</option>
          <option value="tanto-faz">Tanto faz</option>
        </select></div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="medicacao" checked={filtros.medicacao} onChange={handleFiltroChange} /> Usa medicação
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="tratamento" checked={filtros.tratamento} onChange={handleFiltroChange} /> Está em tratamento
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="necessidadesEspeciais" checked={filtros.necessidadesEspeciais} onChange={handleFiltroChange} /> Possui deficiência
        </div>
      </div>

      <button onClick={buscarLares} className="bg-blue-500 text-white px-6 py-2 rounded font-bold mb-8">
        Procurar
      </button>

      {lares.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lares.map((lar) => (
            <div key={lar._id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-bold mb-2">{lar.nome}</h3>
              <p>{lar.cidade} / {lar.estado}</p>
              <p>Espécies aceitas: {lar.especie.join(", ")}</p>
              <p>Portes aceitos: {lar.porte.join(", ")}</p>
              <p>Idades aceitas: {lar.idade.join(", ")}</p>
              <p>Sexo aceito: {lar.sexo}</p>
              {lar.medicacao && <p>Aceita animais que usam medicação</p>}
              {lar.tratamento && <p>Aceita animais em tratamento</p>}
              {lar.necessidadesEspeciais && <p>Aceita animais com deficiência</p>}

              <div className="mt-4">
                <p className="font-semibold">Contato:</p>
                {lar.telefone && <p>Telefone: {lar.telefone}</p>}
                {lar.email && <p>Email: {lar.email}</p>}
              </div>

              <p className="mt-2 font-semibold">Vagas disponíveis: {lar.quantidade}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">Nenhum lar encontrado.</p>
      )}
       <ContatoFlutuante />
    </div>
  );
}
