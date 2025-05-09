import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ContatoFlutuante from '../components/ContatoFlutuante';

export default function EditarPerfilLar() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    cidade: "",
    estado: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    especie: [],
    porte: [],
    idade: [],
    sexo: "",
    medicacao: false,
    tratamento: false,
    necessidadesEspeciais: false,
    quantidade: 0
  });

  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setForm(user);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "select-multiple") {
      const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
      setForm((prev) => ({ ...prev, [name]: values }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }; 

  const salvarAlteracoes = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/lartemporario/editar`, form, {

        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem("Perfil atualizado com sucesso!");
      localStorage.setItem("user", JSON.stringify(form));
    } catch (err) {
      console.error("Erro ao salvar perfil:", err);
    }
  };

  return (
    <>
  
  <div className="p-6">
      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <h1 className="text-2xl font-bold mb-4">Editar Perfil do Lar Temporário</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input type="text" name="nome" value={form.nome} readOnly className="border p-2 " />
          <input type="text" name="telefone" value={form.telefone} onChange={handleChange} className="border p-2" placeholder="Telefone" />
          <input type="text" name="cidade" value={form.cidade} onChange={handleChange} className="border p-2" placeholder="Cidade" />
          <input type="text" name="estado" value={form.estado} onChange={handleChange} className="border p-2" placeholder="Estado" />
          <input type="text" name="cep" value={form.cep} onChange={handleChange} className="border p-2" placeholder="CEP" />
          <input type="text" name="rua" value={form.rua} onChange={handleChange} className="border p-2" placeholder="Rua" />
          <input type="text" name="numero" value={form.numero} onChange={handleChange} className="border p-2" placeholder="Número" />
          <input type="text" name="complemento" value={form.complemento} onChange={handleChange} className="border p-2" placeholder="Complemento" />

          <select multiple name="especie" value={form.especie} onChange={handleChange} className="border p-2">
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
          </select>
          <select multiple name="porte" value={form.porte} onChange={handleChange} className="border p-2">
            <option value="pequeno">Pequeno</option>
            <option value="medio">Médio</option>
            <option value="grande">Grande</option>
          </select>
          <select multiple name="idade" value={form.idade} onChange={handleChange} className="border p-2">
            <option value="filhote">Filhote</option>
            <option value="adulto">Adulto</option>
            <option value="idoso">Idoso</option>
          </select>

          <select name="sexo" value={form.sexo} onChange={handleChange} className="border p-2">
            <option value="">Todos os Sexos</option>
            <option value="macho">Macho</option>
            <option value="femea">Fêmea</option>
            <option value="tanto-faz">Tanto faz</option>
          </select>

          <input type="number" name="quantidade" value={form.quantidade} onChange={handleChange} className="border p-2" placeholder="Vagas disponíveis" />

          <div className="flex items-center gap-2">
            <input type="checkbox" name="medicacao" checked={form.medicacao} onChange={handleChange} /> Usa medicação
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="tratamento" checked={form.tratamento} onChange={handleChange} /> Está em tratamento
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="necessidadesEspeciais" checked={form.necessidadesEspeciais} onChange={handleChange} /> Aceita animais com deficiência
          </div>
        </div>

        <button onClick={salvarAlteracoes} className="bg-blue-600 text-white px-6 py-2 rounded font-bold">
          Salvar Alterações
        </button>

        {mensagem && <p className="text-green-600 mt-4 font-semibold">{mensagem}</p>}
      </div>

      <ContatoFlutuante />
    </div>
    </>
  );
}
