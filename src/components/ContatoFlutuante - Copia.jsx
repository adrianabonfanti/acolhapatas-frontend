
import React, { useState, useRef, useEffect } from "react"; 
import api from "../services/api";

const ContatoFlutuante = () => {
  const [mostrarForm, setMostrarForm] = useState(false);
  const [formEnviado, setFormEnviado] = useState(false);
  const formRef = useRef();
  const buttonRef = useRef();

  const handleEnviarContato = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      await api.post("/contato", {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
      });
      setFormEnviado(true);
      setMostrarForm(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        formRef.current && !formRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setMostrarForm(false);
      }
    }

    if (mostrarForm) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mostrarForm]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setMostrarForm(true)}
        className="botaoFlutuante fixed bottom-5 right-5 bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:bg-emerald-700 z-40"
        title="Fale com o AcolhaPatas"
      >
        <span className="material-icons text-2xl">chat</span>
      </button>

      {mostrarForm && (
        <div className="caixaContatoFlutuante fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div ref={formRef} className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setMostrarForm(false)}
              className=" absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Fale com o AcolhaPatas
            </h3>

            <form onSubmit={handleEnviarContato} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nome:</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Telefone:</label>
                <input
                  type="text"
                  name="phone"
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
                  name="message"
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

      {formEnviado && (
        <div className="fixed bottom-24 right-6 bg-emerald-500 text-white p-4 rounded-lg shadow-lg w-80 z-50">
          <p>Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.</p>
          <button onClick={() => setFormEnviado(false)} className="mt-2 w-full bg-white text-emerald-500 font-semibold p-2 rounded">Fechar</button>
        </div>
      )}
    </>
  );
};

export default ContatoFlutuante;
