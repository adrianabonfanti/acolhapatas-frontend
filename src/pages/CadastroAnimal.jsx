import { useState, useEffect } from "react";
import axios from "axios";
 
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
    foto: null,
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
      foto: null,
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

      foto: null,
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const novoArquivo = files[0];
      setFormData({ ...formData, foto: novoArquivo });
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
        if (key === "foto" && formData.foto) {
          data.append("fotos", formData.foto);
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
        await axios.post("${import.meta.env.VITE_API_BASE_URL}/animals", data, {
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
        <input type="text" name="nome" value={filtros.nome} onChange={handleFiltroChange} placeholder="Nome" className="border p-2" />
        <select name="especie" value={filtros.especie} onChange={handleFiltroChange} className="border p-2">
          <option value="">Todas as Espécies</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Gato">Gato</option>
        </select>
        <select name="sexo" value={filtros.sexo} onChange={handleFiltroChange} className="border p-2">
          <option value="">Todos os Sexos</option>
          <option value="femea">Fêmea</option>
<option value="macho">Macho</option>
        </select>
        <select name="idade" value={filtros.idade} onChange={handleFiltroChange} className="border p-2">
          <option value="">Todas as Idades</option>
          <option value="Filhote">Filhote</option>
          <option value="Adulto">Adulto</option>
          <option value="Idoso">Idoso</option>
        </select>
        <select name="porte" value={filtros.porte} onChange={handleFiltroChange} className="border p-2">
          <option value="">Todos os Portes</option>
          <option value="Pequeno">Pequeno</option>
          <option value="Médio">Médio</option>
          <option value="Grande">Grande</option>
        </select>
        <input type="date" name="dataCadastro" value={filtros.dataCadastro} onChange={handleFiltroChange} className="border p-2" />
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
          <input type="text" name="nome" value={formData.nome} onChange={handleFormChange} placeholder="Nome" className="border p-2" />
          <select name="especie" value={formData.especie} onChange={handleFormChange} className="border p-2">
            <option value="">Selecione a Espécie</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>
          <select name="idade" value={formData.idade} onChange={handleFormChange} className="border p-2">
            <option value="">Selecione a Idade</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
            <option value="Idoso">Idoso</option>
          </select>
          <select name="porte" value={formData.porte} onChange={handleFormChange} className="border p-2">
            <option value="">Selecione o Porte</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
          <select name="sexo" value={formData.sexo} onChange={handleFormChange} className="border p-2">
            <option value="">Selecione o Sexo</option>
            <option value="femea">Fêmea</option>
            <option value="macho">Macho</option>
          </select>
          <textarea name="descricao" value={formData.descricao} onChange={handleFormChange} placeholder="Descrição" className="border p-2 col-span-2" />
          <div className="flex items-center gap-2">
  <input
    type="checkbox"
    name="precisaLarTemporario"
    checked={formData.precisaLarTemporario}
    onChange={handleFormChange}
  /> Precisa de Lar Temporário
</div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="castrado" checked={formData.castrado} onChange={handleFormChange} /> Castrado
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="vacinado" checked={formData.vacinado} onChange={handleFormChange} /> Vacinado
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="usaMedicacao" checked={formData.usaMedicacao} onChange={handleFormChange} /> Usa Medicação
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="necessidadesEspeciais" checked={formData.necessidadesEspeciais} onChange={handleFormChange} /> Necessidades Especiais
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="deficiencia" checked={formData.deficiencia} onChange={handleFormChange} /> Deficiência
          </div>
          {animalSelecionado && animalSelecionado.fotos && (
  <div className="col-span-2">
    <p className="font-semibold mb-2">Imagem atual:</p>
    <img
      src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${animalSelecionado.fotos}`} // ajusta se o caminho for diferente
      alt="Foto atual do animal"
      className="w-48 h-48 object-cover rounded-md"
    />
  </div>
)}

          <input type="file" name="foto" onChange={handleFormChange} className="col-span-2" />

          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded col-span-2">
            {modoEdicao ? "Salvar Alterações" : "Cadastrar Animal"}
          </button>
        </form>
      )}

      {!modoCadastro && (
        <div className="mt-8">
          {animais.length === 0 ? (
            <p className="text-gray-500">Nenhum animal encontrado.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Nome</th>
                  <th className="py-2 px-4 border-b">Espécie</th>
                  <th className="py-2 px-4 border-b">Idade</th>
                  <th className="py-2 px-4 border-b">Porte</th>
                  <th className="py-2 px-4 border-b">Sexo</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Ações</th>
                </tr>
              </thead>
              <tbody>
                {animais.map((animal) => (
                  <tr key={animal._id} className="text-center">
                    <td className="py-2 px-4 border-b">{animal.nome}</td>
                    <td className="py-2 px-4 border-b">{animal.especie}</td>
                    <td className="py-2 px-4 border-b">{animal.idade}</td>
                    <td className="py-2 px-4 border-b">{animal.porte}</td>
                    <td className="py-2 px-4 border-b">{animal.sexo}</td>
                    <td className="py-2 px-4 border-b">{animal.status || "Disponível"}</td>
                    <td className="py-2 px-4 border-b flex flex-wrap justify-center gap-2">
                      <button onClick={() => editarAnimal(animal)} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">Editar</button>
                      <button
    onClick={() => deletarAnimal(animal._id)}
    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
  >
    Apagar
  </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
