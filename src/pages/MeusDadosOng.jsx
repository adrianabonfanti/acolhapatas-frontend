import { useState, useEffect } from "react";
import axios from "axios";
import ContatoFlutuante from '../components/ContatoFlutuante';

export default function MeusDadosOng() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const ongId = user?.id;

  const [formData, setFormData] = useState({
    name: "",
    cnpj: "",
    phone: "",
    responsibleName: "",
    responsibleEmail: "",
    website: "",
    instagram: "",
    tiktok: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    city: "",
    state: "",
    logo: "",
  });

  const [logoPreview, setLogoPreview] = useState("");
  const [novaLogo, setNovaLogo] = useState(null);

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/ongs/${ongId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(response.data);
        setLogoPreview(response.data.logo);
      } catch (error) {
        console.error("Erro ao buscar dados da ONG:", error);
      }
    };

    if (ongId && token) buscarDados();
  }, [ongId, token]);

  const handleFormChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "cep" && value.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
        if (!response.data.erro) {
          setFormData((prev) => ({
            ...prev,
            street: response.data.logradouro || "",
            city: response.data.localidade || "",
            state: response.data.uf || "",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNovaLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const salvarAlteracoes = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });
      if (novaLogo) {
        data.append("logo", novaLogo);
      }

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/ongs/${ongId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Ocorreu um erro ao salvar as alterações.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Meus Dados da ONG</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {logoPreview && (
        <div className="mb-6">
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo atual"
            className="w-48 h-48 object-contain rounded shadow mb-4"
          />
        )}
        <label
          htmlFor="uploadLogo"
          className="cursor-pointer inline-block bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600 transition w-fit text-center text-sm"
        >
          Escolher nova logo
        </label>
        <input
          type="file"
          id="uploadLogo"
          accept="image/*"
          onChange={handleLogoChange}
          className="hidden"
        />
      </div>
      
      )}

      <form onSubmit={salvarAlteracoes} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={formData.name} disabled className="border p-2 " placeholder="Nome da ONG" />
        <input name="cnpj" value={formData.cnpj} disabled className="border p-2" placeholder="CNPJ" />
        <input name="phone" value={formData.phone || ""} onChange={handleFormChange} className="border p-2" placeholder="Telefone" />
        <input name="responsibleName" value={formData.responsibleName || ""} onChange={handleFormChange} className="border p-2" placeholder="Nome do Responsável" />
        <input name="responsibleEmail" value={formData.responsibleEmail || ""} onChange={handleFormChange} className="border p-2" placeholder="Email do Responsável" />
        <input name="website" value={formData.website || ""} onChange={handleFormChange} className="border p-2" placeholder="Site" />
        <input name="instagram" value={formData.instagram || ""} onChange={handleFormChange} className="border p-2" placeholder="Instagram" />
        <input name="tiktok" value={formData.tiktok || ""} onChange={handleFormChange} className="border p-2" placeholder="TikTok" />
        <input name="cep" value={formData.cep || ""} onChange={handleFormChange} className="border p-2" placeholder="CEP" />
        <input name="street" value={formData.street || ""} onChange={handleFormChange} className="border p-2" placeholder="Rua" />
        <input name="number" value={formData.number || ""} onChange={handleFormChange} className="border p-2" placeholder="Número" />
        <input name="complement" value={formData.complement || ""} onChange={handleFormChange} className="border p-2" placeholder="Complemento" />
        <input name="city" value={formData.city || ""} onChange={handleFormChange} className="border p-2" placeholder="Cidade" />
        <input name="state" value={formData.state || ""} onChange={handleFormChange} className="border p-2" placeholder="Estado" />

        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded col-span-1 md:col-span-2">
          Salvar Alterações
        </button>
      </form>
    </div>
    <ContatoFlutuante />
    </div>
  );
}
