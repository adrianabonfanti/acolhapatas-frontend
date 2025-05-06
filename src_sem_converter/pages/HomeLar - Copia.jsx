import { useState, useEffect } from "react";
import axios from "axios";
import NavbarLar from "../components/NavbarLar"; // ajuste o caminho se necessário

export default function HomeLar() {
  const [animais, setAnimais] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [animalSelecionado, setAnimalSelecionado] = useState(null);
  const [dadosLar, setDadosLar] = useState({});

  useEffect(() => {
    buscarAnimais();
    buscarDadosLar();
  }, []);
  
  const buscarAnimais = async () => {
   
    try {
      const lar = JSON.parse(localStorage.getItem("user"));
      console.log("DADOS DO LAR:", lar); 
      const query = {};
      console.log("USER COMPLETO:", lar);
      if (lar.especie && lar.especie.length > 0) {
        query.especie = lar.especie;
      }
      if (lar.porte && lar.porte.length > 0) {
        query.porte = lar.porte;
      }
      if (lar.idade && lar.idade.length > 0) {
        query.idade = lar.idade;
      }
      if (lar.sexo && lar.sexo !== "") {
        query.sexo = lar.sexo;
      }
      if (lar.necessidadesEspeciais) {
        query.necessidadesEspeciais = true;
      }
      if (lar.medicacao) {
        query.medicacao = true;
      }
      console.log("ENVIANDO PARA API:", query);
      const response = await axios.get("http://localhost:5000/public/animais-filtrados-por-lar", {
        params: query
      });
      
  
      setAnimais(response.data);
    } catch (err) {
      console.error("Erro ao buscar animais:", err);
    }
  };
  
  

  const buscarDadosLar = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setDadosLar({
        nome: user.nome,
        telefone: user.telefone,
        cidade: user.cidade,
        estado: user.estado,
        email: user.email
        
      });
    }
  };

  const abrirModal = (animal) => {
    setAnimalSelecionado(animal);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setAnimalSelecionado(null);
  };

  return (
    <>
    <NavbarLar />
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Animais Disponíveis para Acolhimento</h1>

      {animais.length === 0 ? (
        <p className="text-lg">Nenhum animal disponível para seu perfil no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {animais.map((animal) => (
            <div key={animal._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={`http://localhost:5000/uploads/${animal.fotos[0]}`} alt={animal.nome} className="w-full h-48 object-cover rounded" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{animal.nome}</h2>
                <p><strong>Espécie:</strong> {animal.especie}</p>
                <p><strong>Idade:</strong> {animal.idade}</p>
                <p><strong>Porte:</strong> {animal.porte}</p>
                <p><strong>Sexo:</strong> {animal.sexo}</p>
                <button
                  onClick={() => abrirModal(animal)}
                  className="mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded-full"
                >
                  Quero Acolher
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalAberto && animalSelecionado && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[90vh] overflow-y-auto relative">
            <h2 className="text-2xl font-bold mb-4">{animalSelecionado.nome}</h2>
            <ul className="flex flex-col gap-2">
              <li><strong>Espécie:</strong> {animalSelecionado.especie}</li>
              <li><strong>Idade:</strong> {animalSelecionado.idade}</li>
              <li><strong>Porte:</strong> {animalSelecionado.porte}</li>
              <li><strong>Sexo:</strong> {animalSelecionado.sexo}</li>
              <li><strong>Deficiência:</strong> {animalSelecionado.deficiencia || "Não"}</li>
              <li><strong>Medicação:</strong> {animalSelecionado.medicacao || "Não"}</li>
              <li><strong>Descrição:</strong> {animalSelecionado.descricao}</li>
            </ul>
            <div className="mt-6 flex flex-col gap-4">
  <button
    onClick={async () => {
      try {
        const response = await fetch("http://localhost:5000/contato/acolhimento", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            animalId: animalSelecionado._id,
            lar: dadosLar
          })
        });

        const resultado = await response.json();

        if (response.ok) {
          alert("Solicitação enviada com sucesso! 🐾");
          setTimeout(() => {
            fecharModal();
          }, 2000);
        } else {
          alert("Erro: " + resultado.message);
        }
      } catch (error) {
        console.error("Erro ao enviar:", error);
        alert("Erro inesperado ao enviar solicitação.");
      }
    }}
    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
  >
    Confirmar Interesse
  </button>
</div>

            <button
              onClick={fecharModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
