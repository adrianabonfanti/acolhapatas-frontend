
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function PainelOng() {
  const [animais, setAnimais] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [chatVisivel, setChatVisivel] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchAnimais() {
      try {
        const resposta = await axios.get("http://localhost:5000/ongs/animais", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnimais(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar animais:", erro);
      }
    }
    fetchAnimais();
  }, []);

  const tipos = animais.reduce((acc, animal) => {
    acc[animal.tipo] = (acc[animal.tipo] || 0) + 1;
    return acc;
  }, {});

  const portes = animais.reduce((acc, animal) => {
    acc[animal.porte] = (acc[animal.porte] || 0) + 1;
    return acc;
  }, {});

  const tiposData = {
    labels: Object.keys(tipos),
    datasets: [
      {
        label: "Quantidade",
        data: Object.values(tipos),
        backgroundColor: ["#15803d", "#a16207"],
      },
    ],
  };

  const portesData = {
    labels: Object.keys(portes),
    datasets: [
      {
        label: "Quantidade",
        data: Object.values(portes),
        backgroundColor: ["#0891b2", "#7c3aed", "#d97706"],
      },
    ],
  };

  const adotados = animais.filter((a) => a.status === "adotado").length;
  const pendentes = animais.filter((a) => a.status === "pendente").length;

  const handleEnviarMensagem = async () => {
    const userEmail = JSON.parse(localStorage.getItem("user"))?.email;

    if (!mensagem.trim()) {
      alert("A mensagem é obrigatória");
      return;
    }

    try {
      const resposta = await axios.post("http://localhost:5000/api/contato", {
        email: userEmail,
        mensagem: mensagem
      });

      if (resposta.status === 200) {
        alert("Mensagem enviada com sucesso!");
        setMensagem("");
        setChatVisivel(false);
      }
    } catch (erro) {
      console.error("Erro ao enviar mensagem:", erro);
      alert("Erro ao enviar mensagem");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard da ONG</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded">
          <p>Total de Animais</p>
          <p className="text-xl font-bold">{animais.length}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p>Disponíveis</p>
          <p className="text-xl font-bold">{animais.length - adotados - pendentes}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p>Adotados</p>
          <p className="text-xl font-bold">{adotados}</p>
        </div>
        <div className="bg-white shadow p-4 rounded">
          <p>Pedidos Pendentes</p>
          <p className="text-xl font-bold">{pendentes}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Animais por Tipo</h3>
          <Pie data={tiposData} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Animais por Porte</h3>
          <Bar data={portesData} />
        </div>
      </div>

      <button
        onClick={() => setChatVisivel(!chatVisivel)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#16a34a',
          color: 'white',
          borderRadius: '9999px',
          width: '50px',
          height: '50px',
          fontSize: '24px',
          border: 'none',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 9999
        }}
      >
        💬
      </button>

      {chatVisivel && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '300px',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '15px',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.2)',
          zIndex: 9999
        }}>
          <p className="font-bold">Fale com a gestora</p>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            rows="3"
            className="w-full mt-2 p-2 border rounded"
            placeholder="Escreva sua mensagem..."
          />
          <button onClick={handleEnviarMensagem} className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
            Enviar
          </button>
        </div>
      )}
    </div>
  );
}
