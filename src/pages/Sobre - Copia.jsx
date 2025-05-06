import React, { useState, useRef } from "react";

export default function Sobre() {
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

      {/* Publicidade lateral */}
      <div className="hidden lg:block w-64 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-2">Publicidade</h2>
        <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
          <span className="text-gray-600">Seu Anúncio Aqui</span>
        </div>
      </div>

      {/* Botão flutuante de contato */}
      <button
        ref={buttonRef}
        onClick={() => setShowForm((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg text-xl z-50"
      >
        💬
      </button>

      {/* Formulário de contato */}
      {showForm && (
        <div ref={formRef} className="fixed bottom-24 right-6 bg-white p-6 rounded-lg shadow-lg w-80 z-50">
          <form onSubmit={(e) => {
            e.preventDefault();
            setFormEnviado(true);
            setShowForm(false);
          }}>
            <h3 className="text-lg font-semibold mb-2">Entre em contato</h3>
            <input name="name" type="text" placeholder="Seu nome" className="w-full mb-2 p-2 border rounded" required />
            <input name="phone" type="text" placeholder="Telefone" className="w-full mb-2 p-2 border rounded" required />
            <input name="email" type="email" placeholder="E-mail" className="w-full mb-2 p-2 border rounded" required />
            <textarea name="message" placeholder="Mensagem" className="w-full mb-2 p-2 border rounded" required />
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded w-full">Enviar</button>
          </form>
        </div>
      )}

      {/* Modal de confirmação */}
      {formEnviado && (
        <div className="fixed bottom-24 right-6 bg-emerald-500 text-white p-4 rounded-lg shadow-lg w-80 z-50">
          <p>Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>
          <button onClick={() => setFormEnviado(false)} className="mt-2 w-full bg-white text-emerald-500 font-semibold p-2 rounded">Fechar</button>
        </div>
      )}
    </div>
  );
}
