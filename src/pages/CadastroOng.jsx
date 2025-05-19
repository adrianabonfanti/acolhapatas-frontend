import { useState } from "react";
import axios from "axios";

export default function CadastroOng() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    instagram: "",
    email: "",
    logo: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("instagram", formData.instagram);
    data.append("email", formData.email);
    if (formData.logo) data.append("logo", formData.logo);

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ongs`, data);

      // Envio de e-mail para a Adriana
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/contato`, {
        name: formData.name,
        email: "sistema@acolhapatas.org",
        phone: formData.phone,
        message: `Nova ONG cadastrada:\n\nNome: ${formData.name}\nInstagram: ${formData.instagram}\nEmail da ONG: ${formData.email}\nTelefone: ${formData.phone}`,
      });

      alert("Cadastro enviado com sucesso! Aguarde a aprovação.");
      setFormData({ name: "", phone: "", instagram: "", email: "", logo: null });
    } catch (error) {
      console.error("Erro ao cadastrar ONG:", error);
      alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de ONG</h1>
      <p className="mb-2 text-sm text-gray-600 text-center">
        Após o envio, o cadastro será analisado e aprovado manualmente. Você receberá uma confirmação por e-mail.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Nome da ONG"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Telefone de contato"
          className="w-full p-2 border rounded"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Instagram"
          className="w-full p-2 border rounded"
          value={formData.instagram}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email da ONG"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="file"
          className="w-full p-2 border rounded"
          onChange={(e) => setFormData({ ...formData, logo: e.target.files[0] })}
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
        >
          Enviar Cadastro
        </button>
      </form>
    </div>
  );
}