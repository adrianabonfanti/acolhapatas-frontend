import api from '../services/api';
import React, { useState, useRef } from "react";
import "../styles/global.css";

function LarTemporario() {

  const [showModal, setShowModal] = useState(false);
  const formRef = useRef();
const [showForm, setShowForm] = useState(false);
const [formEnviado, setFormEnviado] = useState(false);
const buttonRef = useRef();
const [foto, setFoto] = useState(null);

const handleEnviarContato = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  try {
    await api.post("/contato", {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message")
    });

    setFormEnviado(true);
    e.target.reset();
    setShowForm(false);
  } catch (error) {
    console.error(error);
    alert("Erro ao enviar mensagem. Tente novamente.");
  }
};
const handleFileChange = (e) => {
  setFoto(e.target.files[0]);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = formRef.current;
  const data = new FormData(form);

  data.append("medicacao", form.medicacao.checked);
  data.append("tratamento", form.tratamento.checked);
  data.append("necessidadesEspeciais", form.necessidadesEspeciais.checked);

  if (!foto) {
    alert("Por favor, envie uma foto sua.");
    return;
  }
  data.append("foto", foto);

  try {
    const res = await api.post("/lartemporario", data); // Envio do cadastro
    if (res.status === 200) {
      setShowModal(true);
      form.reset();
      setFoto(null);
      await api.post("/contato", {
        name: data.get("nome"),
        email: data.get("email"),
        phone: data.get("telefone"),
        message: `Novo cadastro de lar temporário:\n\nNome: ${data.get("nome")}\nEmail: ${data.get("email")}\nTelefone: ${data.get("telefone")}\nCidade: ${data.get("cidade")} - ${data.get("estado")}`
      });
    } else {
      alert("Erro ao enviar cadastro.");
    }
  } catch (err) {
    console.error(err);
    alert("Erro de conexão com o servidor.");
  }
};


  const buscarCep = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      formRef.current.rua.value = data.logradouro || "";
      formRef.current.cidade.value = data.localidade || "";
      formRef.current.estado.value = data.uf || "";
    } catch (error) {
      alert("Erro ao buscar CEP.");
    }
  };

  return (
    <>
      <header className="page-header headerLar w-full h-60 md:h-72 lg:h-80 flex items-center bg-emerald-50 shadow-inner overflow-hidden page-header">
  <div className="w-1/2 h-full">
    
  </div>
  <div className="w-1/2 h-full flex items-center justify-center px-6">
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 text-right">
      Lar Temporário
    </h1>
  </div>
</header>
  <div className="conteudo-lar grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 p-6">
      
      {/* Coluna de conteúdo principal */}
      <div className="flex-1 flex flex-col">
      
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-emerald-700 mb-6 flex items-center gap-2">
            <span className="material-icons text-3xl">volunteer_activism</span>
            O que é ser um Lar Temporário?
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
            {["home", "pets", "event", "chat"].map((icon, i) => {
              const titles = [
                "Abrigo temporário",
                "Cuidados e amor",
                "Compromisso real",
                "Contato constante",
              ];
              const descs = [
                "Você acolhe o animal até que ele encontre uma adoção definitiva. Pode durar dias ou semanas.",
                "Você fornece alimentação, carinho, segurança e leva ao veterinário (com apoio da ONG).",
                "Você se compromete a cuidar do animal até que a ONG encontre outro destino seguro.",
                "É importante manter a ONG informada sobre a rotina, saúde e evolução do animal hospedado.",
              ];
              return (
                <div
                  key={i}
                  className="min-w-[250px] max-w-[300px] bg-white border border-emerald-100 shadow-md rounded-xl p-5 flex flex-col gap-3 hover:shadow-lg transition"
                >
                  <span className="material-icons text-emerald-600 text-4xl">{icon}</span>
                  <h3 className="font-semibold text-lg">{titles[i]}</h3>
                  <p className="text-gray-700 text-sm">{descs[i]}</p>
                </div>
              );
            })}
          </div>
        </section>

        <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
          {/* Dados Pessoais */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-md mb-8">
  <h2 className="text-xl font-semibold text-emerald-700 flex items-center gap-2 mb-4">
    <span className="material-icons text-2xl">person</span>
    Dados Pessoais
  </h2>

  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
    <input name="nome" type="text" placeholder="Nome completo" className="input w-full" required />
    <input name="cep" type="text" placeholder="CEP" className="input w-full" onBlur={buscarCep} required />
    <input name="rua" type="text" placeholder="Rua" className="input w-full" required />
    <input name="numero" type="text" placeholder="Número" className="input w-full" required />
    <input name="complemento" type="text" placeholder="Complemento" className="input w-full" />
    <input name="cidade" type="text" placeholder="Cidade" className="input w-full" required />
    <input name="estado" type="text" placeholder="Estado" className="input w-full" required />
    <input name="telefone" type="text" placeholder="Telefone" className="input w-full" required />
    <input name="email" type="email" placeholder="E-mail" className="input w-full" required />
    <input name="password" type="password" placeholder="Senha" className="input w-full" required />
  </div>
</div>



          {/* Preferências de Animal */}
          <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-md mb-8">
  <h2 className="text-xl font-semibold text-emerald-700 flex items-center gap-2 mb-4">
    <span className="material-icons text-2xl">pets</span>
    Preferências para Hospedagem
  </h2>

  <div className="space-y-6 text-sm text-gray-700">
    <div>
      <label className="font-medium block mb-1">Espécie aceita:</label>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-1"><input type="checkbox" name="especie" value="cachorro" /> Cachorro</label>
        <label className="flex items-center gap-1"><input type="checkbox" name="especie" value="gato" /> Gato</label>
      </div>
    </div>

    <div>
      <label className="font-medium block mb-1">Porte aceito:</label>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-1"><input type="checkbox" name="porte" value="pequeno" /> Pequeno</label>
        <label className="flex items-center gap-1"><input type="checkbox" name="porte" value="medio" /> Médio</label>
        <label className="flex items-center gap-1"><input type="checkbox" name="porte" value="grande" /> Grande</label>
      </div>
    </div>

    <div>
      <label className="font-medium block mb-1">Idade aceita:</label>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-1"><input type="checkbox" name="idade" value="filhote" /> Filhote</label>
        <label className="flex items-center gap-1"><input type="checkbox" name="idade" value="adulto" /> Adulto</label>
        <label className="flex items-center gap-1"><input type="checkbox" name="idade" value="idoso" /> Idoso</label>
      </div>
    </div>

    <div>
      <label className="font-medium block mb-1">Sexo aceito:</label>
      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-1"><input type="radio" name="sexo" value="macho" required /> Macho</label>
        <label className="flex items-center gap-1"><input type="radio" name="sexo" value="femea" /> Fêmea</label>
        <label className="flex items-center gap-1"><input type="radio" name="sexo" value="tanto-faz" /> Tanto faz</label>
      </div>
    </div>

    <div>
      <label className="font-medium block mb-1">Condições especiais:</label>
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-1"><input type="checkbox" name="medicacao" /> Aceita animais em medicação</label>
        <label className="flex items-center gap-1"><input type="checkbox" name="tratamento" /> Aceita animais em tratamento</label>
        <label className="flex items-center gap-1"><input type="checkbox" name="necessidadesEspeciais" /> Aceita animais com necessidades especiais</label>
      </div>
    </div>

    <div>
      <label className="font-medium block mb-1">Quantos animais pode abrigar por vez?</label>
      <input type="number" name="quantidade" min="1" required placeholder="Ex: 1, 2, 3..." className="input" />
    </div>
    <div className="sm:col-span-2">
  <label className="block font-medium text-gray-700 mb-1">Foto (obrigatória)</label>
  <input
    type="file"
    name="foto"
    accept="image/*"
    onChange={handleFileChange}
    required
    className="input w-full"
  />
</div>

  </div>
</div>


          <div className="flex justify-center">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg">
              Enviar Cadastro
            </button>
          </div>
        </form>
 {/* Botão flutuante de contato */}
 <button 
        ref={buttonRef}
        onClick={() => setShowForm(prev => !prev)}
        className="botaoFlutuante fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg text-xl z-50"
      >
        💬
      </button>

      {/* Formulário de contato */}
      {showForm && (
        <div ref={formRef} className="caixaContatoFlutuante fixed bottom-24 right-6 bg-white p-6 rounded-lg shadow-lg w-80 z-50">
          <form onSubmit={handleEnviarContato}>
            <h3 className="text-lg font-semibold mb-2">Entre em contato</h3>
            <input name="name" type="text" placeholder="Seu nome" className="w-full mb-2 p-2 border rounded" required />
            <input name="phone" type="text" placeholder="Telefone" className="w-full mb-2 p-2 border rounded" required />
            <input name="email" type="email" placeholder="E-mail" className="w-full mb-2 p-2 border rounded" required />
            <textarea name="message" placeholder="Mensagem" className="w-full mb-2 p-2 border rounded" required />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded w-full">Enviar</button>
          </form>
        </div>
      )}

      {/* Mensagem enviada */}
      {formEnviado && (
        <div className="fixed bottom-24 right-6 bg-emerald-500 text-white p-4 rounded-lg shadow-lg w-80 z-50">
          <p>Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>
          <button onClick={() => setFormEnviado(false)} className="mt-2 w-full bg-white text-emerald-500 font-semibold p-2 rounded">Fechar</button>
        </div>
      )}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
              <h2 className="text-2xl font-bold text-emerald-700 mb-4">✅ Cadastro enviado!</h2>
              <p>Obrigado por se cadastrar como lar temporário. Nossa equipe irá analisar sua inscrição.</p>
              <button onClick={() => setShowModal(false)} className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
                Fechar
              </button>
            </div>
          </div>
        )}
      
      </div>

     
    </div></>
  );
}

export default LarTemporario;
