import { useState, useEffect } from "react";
import axios from "axios";
import ContatoFlutuante from '../components/ContatoFlutuante';
export default function CadastroAnimal() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const [modoCadastro, setModoCadastro] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [animalSelecionado, setAnimalSelecionado] = useState(null);
  const [animais, setAnimais] = useState([]);
  const [filtros, setFiltros] = useState({
    nome: "",
    especie: "",
    sexo: "",
    idade: "",
    porte: "",
    dataCadastro: "",
  });

  const [formData, setFormData] = useState({
    nome: "",
    especie: "",
    idade: "",
    porte: "",
    sexo: "",
    descricao: "",
    castrado: false,
    vacinado: false,
    usaMedicacao: false,
    necessidadesEspeciais: false,
    deficiencia: false,
    precisaLarTemporario: false, // <<< adiciona ISSO
    fotos: null,
  });

  const limparFormulario = () => {
    setFormData({
      nome: "",
      especie: "",
      idade: "",
      porte: "",
      sexo: "",
      descricao: "",
      castrado: false,
      vacinado: false,
      usaMedicacao: false,
      necessidadesEspeciais: false,
      deficiencia: false,
      precisaLarTemporario: false, // <<< adiciona ISSO
      fotos: null,
    });
    setModoCadastro(false);
    setModoEdicao(false);
    setAnimalSelecionado(null);
  };

  const editarAnimal = (animal) => {
    setAnimalSelecionado(animal);
    setModoCadastro(true);
    setModoEdicao(true);
    setFormData({
      nome: animal.nome || "",
      especie: animal.especie || "",
      idade: animal.idade || "",
      porte: animal.porte || "",
      sexo: animal.sexo || "",
      descricao: animal.descricao || "",
      castrado: animal.castrado === "true" || animal.castrado === true,
    vacinado: animal.vacinado === "true" || animal.vacinado === true,
    usaMedicacao: animal.usaMedicacao === "true" || animal.usaMedicacao === true,
    necessidadesEspeciais: animal.necessidadesEspeciais === "true" || animal.necessidadesEspeciais === true,
    deficiencia: animal.deficiencia === "true" || animal.deficiencia === true,
    precisaLarTemporario: animal.precisaLarTemporario === "true" || animal.precisaLarTemporario === true,

      fotos: animal.fotos?.[0] || null,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const novoArquivo = files[0];
      setFormData({ ...formData, fotos: novoArquivo });
      if (animalSelecionado) {
        setAnimalSelecionado((prev) => ({
          ...prev,
          fotos: null, // limpa a imagem antiga!
        }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  const buscarAnimais = async () => {
    try {
      const query = new URLSearchParams();
      if (filtros.nome) query.append("nome", filtros.nome);
      if (filtros.especie) query.append("especie", filtros.especie);
      if (filtros.sexo) query.append("sexo", filtros.sexo);
      if (filtros.idade) query.append("idade", filtros.idade);
      if (filtros.porte) query.append("porte", filtros.porte);

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/animals?${query.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnimais(response.data);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
    }
  };

  const cadastrarAnimal = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "fotos" && formData.fotos) {
          data.append("fotos", formData.fotos, formData.fotos.name);
        } else if (typeof formData[key] === "boolean") {
          data.append(key, formData[key] ? "true" : "false");
        } else {
          data.append(key, formData[key]);
        }
      }); 
      
  
      if (modoEdicao && animalSelecionado) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/animals/${animalSelecionado._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            // NÃO coloca "Content-Type" manualmente aqui
          },
        });
        alert("Animal atualizado com sucesso!");
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/animals`, data, {

          headers: {
            Authorization: `Bearer ${token}`,
            // NÃO coloca "Content-Type" manualmente aqui
          },
        });
        alert("Animal cadastrado com sucesso!");
      }
  
      limparFormulario();
      buscarAnimais();
     
    } catch (error) {
      console.error("Erro ao cadastrar/editar animal:", error);
    }
  };
  
  const deletarAnimal = async (id) => {
    if (!window.confirm("Tem certeza que deseja apagar este animal?")) return;
  
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/animals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Animal apagado com sucesso!");
      buscarAnimais(); // atualiza a lista depois de apagar
    } catch (error) {
      console.error("Erro ao apagar animal:", error);
      alert("Ocorreu um erro ao tentar apagar o animal.");
    }
  };
  

  useEffect(() => {
    buscarAnimais();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Buscar Animais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
        <label className="font-medium block mb-1">Nome:</label>
        <input type="text" name="nome" value={filtros.nome} onChange={handleFiltroChange} placeholder="Nome" className="border p-2 w-full text-gray-700 bg-white" /></div>
       <div>
       <label className="font-medium block mb-1">Espécie:</label>
        <select name="especie" value={filtros.especie} onChange={handleFiltroChange} className="border p-2 w-full text-gray-700 bg-white">
          <option value="">Todas as Espécies</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select></div>
        <div>
        <label className="font-medium block mb-1">Sexo:</label>
        <select name="sexo" value={filtros.sexo} onChange={handleFiltroChange} className="border p-2 w-full text-gray-700 bg-white">
          <option value="">Todos os Sexos</option>
          <option value="femea">Fêmea</option>
<option value="macho">Macho</option>
        </select></div>
        <div>
        <label className="font-medium block mb-1">Idade:</label>
        <select name="idade" value={filtros.idade} onChange={handleFiltroChange} className="border p-2 w-full text-gray-700 bg-white">
          <option value="">Todas as Idades</option>
          <option value="Filhote">Filhote</option>
          <option value="Adulto">Adulto</option>
          <option value="Idoso">Idoso</option>
        </select></div>
        <div>
        <label className="font-medium block mb-1">Porte:</label>
        <select name="porte" value={filtros.porte} onChange={handleFiltroChange} className="border p-2 w-full text-gray-700 bg-white">
          <option value="">Todos os Portes</option>
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </select></div>
        <div>
           <label className="font-medium block mb-1">Data de cadastro:</label>
       
        <input
  type="date"
  name="dataCadastro"
  value={filtros.dataCadastro}
  onChange={handleFiltroChange}
  className="border p-2 w-full text-gray-700 placeholder:text-gray-400 bg-white"
/> </div>

      </div>

      <div className="mt-4 flex gap-4">
      <button
  onClick={() => {
    buscarAnimais();
    setModoCadastro(false);
    setModoEdicao(false);
    setAnimalSelecionado(null);
  }}
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  Procurar
</button>

        <button onClick={() => { limparFormulario(); setModoCadastro(true); }} className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded font-bold">
          Cadastrar Novo Animal
        </button>
      </div>

      {modoCadastro && (
        <form onSubmit={cadastrarAnimal} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div>
          <label className="font-medium block mb-1">Nome:</label>
        <input type="text" name="nome" value={formData.nome} onChange={handleFormChange} placeholder="Nome" className="border p-2 w-full bg-white text-gray-700" />
      </div> 
      <div><label className="font-medium block mb-1">Espécies:</label>
       <select name="especie" value={formData.especie} onChange={handleFormChange} className="border p-2 w-full bg-white text-gray-700">
          <option value="">Selecione a Espécie</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select></div>
        <div>
        <label className="font-medium block mb-1">Idade:</label>
        <select name="idade" value={formData.idade} onChange={handleFormChange} className="border p-2 w-full bg-white text-gray-700">
          <option value="">Selecione a Idade</option>
          <option value="Filhote">Filhote</option>
          <option value="Adulto">Adulto</option>
          <option value="Idoso">Idoso</option>
        </select></div>
        <div>
        <label className="font-medium block mb-1">Porte:</label>
        <select name="porte" value={formData.porte} onChange={handleFormChange} className="border p-2 w-full bg-white text-gray-700">
          <option value="">Selecione o Porte</option>
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </select></div>
        <div>
        <label className="font-medium block mb-1">Sexo:</label>
        <select name="sexo" value={formData.sexo} onChange={handleFormChange} className="border p-2 w-full bg-white text-gray-700">
          <option value="">Selecione o Sexo</option>
          <option value="femea">Fêmea</option>
          <option value="macho">Macho</option>
        </select></div>
        <div>
        <label className="font-medium block mb-1">Descrição:</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleFormChange} placeholder="Descrição" className="border p-2 w-full bg-white text-gray-700 md:col-span-2" /></div>
        {["precisaLarTemporario", "castrado", "vacinado", "usaMedicacao", "necessidadesEspeciais", "deficiencia"].map((campo) => (
          <label key={campo} className="flex items-center gap-2 w-full bg-white px-2 py-1 rounded border text-gray-700">
            <input
              type="checkbox"
              name={campo}
              checked={formData[campo]}
              onChange={handleFormChange}
            />
            {campo.charAt(0).toUpperCase() + campo.slice(1).replace(/([A-Z])/g, ' $1')}
          </label>
        ))}
        {typeof formData.fotos === "string" && (
  <div className="mb-2">
    <label className="font-medium block mb-1">Imagem atual:</label>
    <img
      src={formData.fotos}
      alt="Imagem atual"
      className="w-40 h-40 object-cover rounded"
    />
  </div>
)}

        <input type="file" name="fotos" onChange={handleFormChange} className="md:col-span-2 w-full bg-white text-gray-700" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded md:col-span-2">
          {modoEdicao ? "Salvar Alterações" : "Cadastrar Animal"}
        </button>
      </form>
      )}

      {!modoCadastro && (
        <div className="mt-8">
          {animais.length === 0 ? (
            <p className="text-gray-500">Nenhum animal encontrado.</p>
          ) : (
            <div className="mt-8">
  {animais.length === 0 ? (
    <p className="text-gray-500">Nenhum animal encontrado.</p>
  ) : (
    <>
      {/* Tabela para desktop */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-gray-100">
            <tr>
            <th className="py-2 px-4 border-b text-left">Foto</th>
              <th className="py-2 px-4 border-b text-left">Nome</th>
              <th className="py-2 px-4 border-b text-left">Espécie</th>
              <th className="py-2 px-4 border-b text-left">Idade</th>
              <th className="py-2 px-4 border-b text-left">Porte</th>
              <th className="py-2 px-4 border-b text-left">Sexo</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {animais.map((animal) => (
              <tr key={animal._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
  {animal.fotos && animal.fotos[0] && (
    <img
      src={animal.fotos[0]}
      alt={`Foto de ${animal.nome}`}
      className="w-12 h-12 object-cover rounded"
    />
  )}
</td>

                <td className="py-2 px-4 border-b">{animal.nome}</td>
                <td className="py-2 px-4 border-b">{animal.especie}</td>
                <td className="py-2 px-4 border-b">{animal.idade}</td>
                <td className="py-2 px-4 border-b">{animal.porte}</td>
                <td className="py-2 px-4 border-b">{animal.sexo}</td>
                <td className="py-2 px-4 border-b">{animal.status || "Disponível"}</td>
                <td className="py-2 px-4 border-b">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => editarAnimal(animal)}
                    className="text-blue-600 hover:text-blue-800 relative group"
                  >
                    <span className="material-icons">edit</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Editar
                    </span>
                  </button>
                  <button
                    onClick={() => deletarAnimal(animal._id)}
                    className="text-red-600 hover:text-red-800 relative group"
                  >
                    <span className="material-icons">delete</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Apagar
                    </span>
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards para mobile */}
      <div className="md:hidden flex flex-col gap-4">
        {animais.map((animal) => (
          <div key={animal._id} className="bg-white shadow rounded-md p-4 border border-gray-200">
            <div className="flex justify-between items-start">
            <div className="flex items-center gap-4">
  {animal.fotos && animal.fotos[0] && (
    <img
      src={animal.fotos[0]}
      alt={`Foto de ${animal.nome}`}
      className="w-16 h-16 object-cover rounded"
    />
  )}
  <div>
    <h3 className="text-lg font-bold">{animal.nome}</h3>
    <p className="text-sm text-gray-600">{animal.especie} • {animal.sexo}</p>
  </div>
</div>

              <div className="flex gap-2">
                <button
                  onClick={() => editarAnimal(animal)}
                  className="text-blue-600 hover:text-blue-800 relative group"
                >
                  <span className="material-icons">edit</span>
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Editar
                  </span>
                </button>
                <button
                  onClick={() => deletarAnimal(animal._id)}
                  className="text-red-600 hover:text-red-800 relative group"
                >
                  <span className="material-icons">delete</span>
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 text-xs bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Apagar
                  </span>
                </button>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-700">
              <p><strong>Idade:</strong> {animal.idade}</p>
              <p><strong>Porte:</strong> {animal.porte}</p>
              <p><strong>Status:</strong> {animal.status || "Disponível"}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>



          )}
        </div>
      )}
       <ContatoFlutuante />
    </div>
  );
}
