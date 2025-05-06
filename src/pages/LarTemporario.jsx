import api from '../services/api';

import React, { useState, useRef } from "react";
import "../styles/global.css";

function LarTemporario() {
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    body.especie = data.getAll("especie");
    body.porte = data.getAll("porte");
    body.idade = data.getAll("idade");
    body.medicacao = data.get("medicacao") === "on";
    body.tratamento = data.get("tratamento") === "on";
    body.necessidadesEspeciais = data.get("necessidadesEspeciais") === "on";
    body.sexo = data.get("sexo"); // Corrigido para incluir o sexo

    try {
      const res = await api.get("/lartemporario") // [CONVERTIDO DE FETCH],      
      if (res.ok) {
        setShowModal(true);
        form.reset();
      } else {
        alert("Erro ao enviar cadastro.");
      }
    } catch (err) {
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
      Animais para Adoção
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
  </div>
</div>


          <div className="flex justify-center">
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg">
              Enviar Cadastro
            </button>
          </div>
        </form>

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
