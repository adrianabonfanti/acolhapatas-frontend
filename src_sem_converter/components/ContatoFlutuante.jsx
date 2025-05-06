// src/components/ContatoFlutuante.jsx
import React, { useState } from "react";

const ContatoFlutuante = () => {
  const [mostrarForm, setMostrarForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setMostrarForm(true)}
        className="fixed bottom-5 right-5 bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 z-40"
        title="Fale com o AcolhaPatas"
      >
        <span className="material-icons text-2xl">chat</span>
      </button>

      {mostrarForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setMostrarForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Fale com o AcolhaPatas
            </h3>

            <form
              action="https://formsubmit.co/adrianahbonfanti@gmail.com"
              method="POST"
              className="space-y-4"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Mensagem do site AcolhaPatas" />

              <div>
                <label className="block text-sm text-gray-600 mb-1">Nome:</label>
                <input
                  type="text"
                  name="nome"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Mensagem:</label>
                <textarea
                  name="mensagem"
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 font-semibold text-sm"
              >
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContatoFlutuante;
