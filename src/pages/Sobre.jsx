import api from '../services/api';
import React, { useState, useRef } from "react";
import axios from "axios";
import ContatoFlutuante from '../components/ContatoFlutuante';
import { Helmet } from "react-helmet-async";
export default function Sobre() {
  const [showForm, setShowForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const formRef = useRef();
  const buttonRef = useRef();

  return (
    <>
     <Helmet>
        <title>AcolhaPatas - Conectando ONGs, lares temporários e adotantes</title>
        <meta name="description" content="Seja um lar temporário, adote um pet e conheça ONGs que resgatam animais em Pindamonhangaba e região." />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content="AcolhaPatas - Conectando ONGs, lares temporários e adotantes" />
        <meta property="og:description" content="Encontre animais para adoção, cadastre-se como lar temporário e apoie ONGs de proteção animal." />
        <meta property="og:image" content="https://acolhapatas.com.br/imagens/banner-og-home.jpg" />
        <meta property="og:url" content="https://acolhapatas.com.br/" />
        <meta property="og:type" content="website" />
      </Helmet>
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
    </div></>
  );
}
