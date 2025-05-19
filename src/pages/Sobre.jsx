const api = require("../services/api");
const React = require("react");
const { useState, useRef } = require("react");
const axios = require("axios");
const ContatoFlutuante = require("../components/ContatoFlutuante");

function Sobre() {
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const formRef = useRef();
  const buttonRef = useRef();

  return (
    <div className="flex min-h-screen">
      {/* Conteúdo principal */}
      <div className="flex-1 p-6 flex flex-col">
        <h1 className="text-3xl font-bold mb-8">Sobre o AcolhaPatas</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">🐾 Nossa Missão</h2>
          <p className="leading-relaxed mb-4">
            O <strong>AcolhaPatas</strong> nasceu com o propósito de conectar ONGs de proteção animal a pessoas dispostas a fazer a diferença. 
            Nosso objetivo é <strong>facilitar a busca por lares temporários</strong> para animais resgatados, especialmente quando as ONGs enfrentam limitações de espaço e recursos.
          </p>
          <p className="leading-relaxed">
            Também oferecemos um espaço para a <strong>divulgação de animais disponíveis para adoção</strong>, ajudando a encontrar famílias amorosas para pets que esperam por uma nova chance de felicidade.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">📋 Termos e Responsabilidades</h2>
          <ul className="list-disc list-inside leading-relaxed space-y-2">
            <li>O <strong>AcolhaPatas</strong> atua apenas como uma <strong>plataforma de conexão</strong> entre ONGs, lares temporários e adotantes.</li>
            <li><strong>Não nos responsabilizamos</strong> pelas informações fornecidas pelas ONGs ou lares temporários.</li>
            <li><strong>Não garantimos</strong> a saúde, temperamento ou condições dos animais divulgados.</li>
            <li>Todas as responsabilidades legais, financeiras ou de guarda são de <strong>exclusiva responsabilidade</strong> das partes envolvidas.</li>
            <li>Recomendamos que todas as partes estabeleçam <strong>comunicação clara</strong> e firmem acordos por escrito, se necessário.</li>
          </ul>
        </section>
      </div>
      <ContatoFlutuante />    
    </div>
  );
}

module.exports = Sobre;
