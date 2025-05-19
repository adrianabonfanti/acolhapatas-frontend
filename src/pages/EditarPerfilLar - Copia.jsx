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
   <div className="">
  <div className="bg-white shadow-md rounded-3xl p-6 border border-gray-200">
    <h1 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-3">
      <span className="material-icons text-emerald-500">home</span>
      Editar Perfil do Lar Temporário
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
     <div><label className="font-medium block mb-1">Nome:</label>
      <input type="text" name="nome" value={form.nome} readOnly className="input bg-gray-100" />
</div>
<div><label className="font-medium block mb-1">Telefone:</label>
      <input type="text" name="telefone" value={form.telefone} onChange={handleChange} className="input" placeholder="Telefone" /></div>
<div><label className="font-medium block mb-1">Cidade:</label>
      <input type="text" name="cidade" value={form.cidade} onChange={handleChange} className="input" placeholder="Cidade" /></div>
<div><label className="font-medium block mb-1">Estado:</label>
      <input type="text" name="estado" value={form.estado} onChange={handleChange} className="input" placeholder="Estado" /></div>
      <div><label className="font-medium block mb-1">CEP:</label>
      <input type="text" name="cep" value={form.cep} onChange={handleChange} className="input" placeholder="CEP" />
</div>
<div><label className="font-medium block mb-1">Rua:</label>
      <input type="text" name="rua" value={form.rua} onChange={handleChange} className="input" placeholder="Rua" />
</div>
<div><label className="font-medium block mb-1">Número:</label>
      <input type="text" name="numero" value={form.numero} onChange={handleChange} className="input" placeholder="Número" />
</div>
<div><label className="font-medium block mb-1">Complemento:</label>
      <input type="text" name="complemento" value={form.complemento} onChange={handleChange} className="input" placeholder="Complemento" /></div>

      <div>
        <label className="block font-semibold mb-1">Espécie</label>
        <select multiple name="especie" value={form.especie} onChange={handleChange} className="input h-28">
          <option value="cachorro">Cachorro</option>
          <option value="gato">Gato</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Porte</label>
        <select multiple name="porte" value={form.porte} onChange={handleChange} className="input h-28">
          <option value="pequeno">Pequeno</option>
          <option value="medio">Médio</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Faixa Etária</label>
        <select multiple name="idade" value={form.idade} onChange={handleChange} className="input h-28">
          <option value="filhote">Filhote</option>
          <option value="adulto">Adulto</option>
          <option value="idoso">Idoso</option>
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-1">Sexo</label>
        <select name="sexo" value={form.sexo} onChange={handleChange} className="input">
          <option value="">Todos os Sexos</option>
          <option value="macho">Macho</option>
          <option value="femea">Fêmea</option>
          <option value="tanto-faz">Tanto faz</option>
        </select>
      </div>
<div><label className="font-medium block mb-1">Vagas Disponíveis:</label>
      <input type="number" name="quantidade" value={form.quantidade} onChange={handleChange} className="input" placeholder="Vagas disponíveis" /></div>

      <div className="flex items-center gap-2 col-span-1 md:col-span-2">
        <input type="checkbox" name="medicacao" checked={form.medicacao} onChange={handleChange} className="w-5 h-5 text-emerald-600" />
        <span className="text-sm">Aceita animais que usam medicação</span>
      </div>

      <div className="flex items-center gap-2 col-span-1 md:col-span-2">
        <input type="checkbox" name="tratamento" checked={form.tratamento} onChange={handleChange} className="w-5 h-5 text-emerald-600" />
        <span className="text-sm">Está em tratamento</span>
      </div>

      <div className="flex items-center gap-2 col-span-1 md:col-span-2">
        <input type="checkbox" name="necessidadesEspeciais" checked={form.necessidadesEspeciais} onChange={handleChange} className="w-5 h-5 text-emerald-600" />
        <span className="text-sm">Aceita animais com deficiência</span>
      </div>
    </div>

    <div className="mt-8 text-right">
      <button onClick={salvarAlteracoes} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold shadow inline-flex items-center gap-2">
        <span className="material-icons">check_circle</span> Salvar Alterações
      </button>
    </div>

    {mensagem && <p className="text-green-600 mt-4 font-semibold">{mensagem}</p>}
  </div>

  <ContatoFlutuante />
</div>


  );
}
