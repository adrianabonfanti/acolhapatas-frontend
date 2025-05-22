// Página de Eventos do AcolhaPatas
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import api from "../services/api";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);
  const [ongs, setOngs] = useState([]);
  const [filtros, setFiltros] = useState({
    ong: "",
    data: "",
    cidade: "",
    estado: ""
  });
  const [showSlideFiltro, setShowSlideFiltro] = useState(false);
  const [modalEvento, setModalEvento] = useState(null);
  const [formEnviado, setFormEnviado] = useState(false);
  const [modalInteresse, setModalInteresse] = useState(false);
const [interesseEnviado, setInteresseEnviado] = useState(false);

  const filtroRef = useRef(); 

  useEffect(() => {
    buscarEventos();
    buscarOngs();
  }, []);

  const buscarEventos = async () => {
    try {
     const response = await api.get("/eventos/public");

      const hoje = new Date().toISOString().slice(0, 10);
      const eventosFiltrados = response.data.filter((evento) => evento.data >= hoje);
      setEventos(eventosFiltrados.sort((a, b) => a.data.localeCompare(b.data)));
    } catch (err) {
      console.error("Erro ao buscar eventos:", err);
    }
  };

  const buscarOngs = async () => {
    try {
     const response = await api.get("/public/ongs");

      setOngs(response.data);
    } catch (error) {
      console.error("Erro ao buscar ONGs:", error);
    }
  };

  const handleCheckboxChange = (id) => {
    setFiltros((prev) => {
      const novaLista = prev.ongsSelecionadas.includes(id)
        ? prev.ongsSelecionadas.filter((i) => i !== id)
        : [...prev.ongsSelecionadas, id];
      return { ...prev, ongsSelecionadas: novaLista };
    });
  };

  const aplicarFiltros = (evento) => {
  const ongId = typeof evento.ong === "object" ? evento.ong._id : evento.ong;
  const ongOk = !filtros.ong || filtros.ong === ongId;

  const cidadeOk =
    filtros.cidade.trim() === "" ||
    evento.cidade?.toLowerCase().includes(filtros.cidade.trim().toLowerCase());

  const estadoOk =
    filtros.estado === "" ||
    evento.estado?.toUpperCase() === filtros.estado.toUpperCase();

  const dataOk = filtros.data === "" || evento.data === filtros.data;

  return ongOk && cidadeOk && estadoOk && dataOk;
};

const enviarVoluntario = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  try {
    const [ano, mes, dia] = modalEvento.data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;

    // 1. Salvar no banco de dados
    await api.post("/voluntarios", {
      nome: formData.get("nome"),
      telefone: formData.get("telefone"),
      evento: modalEvento._id
    });

    // 2. Enviar e-mail para ONG
    await api.post("/contato", {
      name: formData.get("nome"),
      phone: formData.get("telefone"),
      message: `Quero ser voluntário para o evento ${modalEvento.nome}\n\nData: ${dataFormatada}\nLocal: ${modalEvento.endereco || "Endereço não informado"}\nCidade: ${modalEvento.cidade} - ${modalEvento.estado}`,
      email: modalEvento?.ong?.email || "contato@acolhapatas.org"
    });

    setFormEnviado(true);
    setTimeout(() => {
      setFormEnviado(false);
      setModalEvento(null);
    }, 3000);
  } catch (err) {
    alert("Erro ao enviar. Tente novamente.");
  }
};

  const gerarLinkGoogleCalendar = (evento) => {
    const inicio = new Date(evento.data + "T" + (evento.horaInicio || "10:00"));
    const fim = new Date(evento.data + "T" + (evento.horaFim || "12:00"));
    const formatar = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      evento.nome
    )}&dates=${formatar(inicio)}/${formatar(fim)}&details=${encodeURIComponent(
      evento.descricao || "Evento do AcolhaPatas"
    )}&location=${encodeURIComponent(evento.endereco + ", " + evento.cidade + " - " + evento.estado)}`;
  };

  

  return (
    <div className="pagina-eventos">
      <header className="page-header headerEventos w-full h-60 md:h-72 lg:h-80 flex items-center bg-emerald-50 shadow-inner overflow-hidden page-header">
        <div className="w-1/2 h-full"></div>
        <div className="w-1/2 h-full flex items-center justify-center px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-emerald-800 text-right">
            Eventos
          </h1>
        </div>
      </header>
<button
  onClick={() => setModalInteresse(true)}
  className="fixed bottom-4 right-4 z-50 bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 flex items-center gap-2 botaoReceberEventos"
>
  <span className="material-icons">email</span>
  Receber novos eventos
</button>

      <div className="p-4">
        <button
          onClick={() => setShowSlideFiltro((prev) => !prev)}
          className="fixed top-4 left-4 z-50 bg-white border border-emerald-300 p-2 rounded-full shadow-md hover:bg-emerald-100 md:hidden"
        >
          <span className="material-icons text-emerald-700">filter_list</span>
        </button>

        <div className="flex flex-col md:flex-row">
          <aside
            ref={filtroRef}
            className={`transition-transform duration-300 ease-in-out fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform ${
              showSlideFiltro ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0 md:block p-4 rounded-lg`}
          >
            <h2 className="text-xl font-semibold mb-4">Filtrar</h2>
            <div className="campoFiltro mb-3">
              <h3 className="font-semibold">ONG</h3>
              {ongs.map((ong) => (
             /*    <label key={ong._id} className="block text-sm">
                  <input
                    type="checkbox"
                    value={ong._id}
                    checked={filtros.ongsSelecionadas.includes(ong._id)}
                    onChange={() => handleCheckboxChange(ong._id)}
                    className="mr-2"
                  />
                  {ong.name}
                </label> */
            
          <select value={filtros.ong} onChange={(e) => setFiltros({ ...filtros, ong: e.target.value })}>
  <option value="">Todas</option>
  {ongs.map((ong) => (
    <option key={ong._id} value={ong._id}>{ong.name}</option>
  ))}
</select>
      
              ))}
            </div>
            <div className="campoFiltro mb-3">
              <h3 className="font-semibold">Data</h3>
              <input
                type="date"
                value={filtros.data}
                onChange={(e) => setFiltros({ ...filtros, data: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="campoFiltro mb-3">
              <h3 className="font-semibold">Cidade</h3>
              <input
                type="text"
                placeholder="Cidade"
                value={filtros.cidade}
                onChange={(e) => setFiltros({ ...filtros, cidade: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="campoFiltro mb-3">
              <h3 className="font-semibold">Estado</h3>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
                className="w-full p-2 border rounded"
              >
                <option value="">Todos</option>
                {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>
          </aside>

          <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {eventos.filter(aplicarFiltros).map((evento) => (
              <div key={evento._id} className="bg-white rounded-xl shadow-lg p-4">
                <img
                  src={evento.imagem}
                  alt={evento.nome}
                  className="w-full  rounded mb-2 imagemEvento"
                />
                <h2 className="text-lg font-bold text-emerald-700 mb-1">{evento.nome}</h2>
              <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
  <span className="material-icons text-base text-emerald-600">calendar_today</span>
 {(() => {
  const [ano, mes, dia] = evento.data.split("-");
  return `${dia}/${mes}/${ano}`;
})()}

</p>

                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <span className="material-icons text-base text-emerald-600">access_time</span>
                  {evento.horaInicio} às {evento.horaFim}
                </p>
                <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                  <span className="material-icons text-base text-emerald-600">place</span>
                  {evento.endereco}, {evento.cidade} - {evento.estado}
                </p>
                {(evento.ong?.nome || evento.ong?.name) && (
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
  <span className="material-icons text-base text-emerald-600">business</span>
    ONG: {evento.ong?.nome || evento.ong?.name}
</p>

                )}
                {evento.ong?.instagram && (
                  <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                    <span className="material-icons text-base text-emerald-600">photo_camera</span>
                    <a
                      href={`https://instagram.com/${evento.ong.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:underline"
                    >
                      @{evento.ong.instagram.replace("@", "")}
                    </a>
                  </p>
                )}
                {evento.descricao && (
                  <p className="text-sm italic text-gray-700 mb-2">"{evento.descricao}"</p>
                )}
                <div className="flex gap-2">
                  <a
                    href={gerarLinkGoogleCalendar(evento)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-600 items-center"
                  >
                    <span className="material-icons align-middle text-sm">event</span> Me lembrar
                  </a>
                  {evento.precisaVoluntario && (
                    <button
                      onClick={() => setModalEvento(evento)}
                      className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm hover:bg-emerald-600 items-center"
                    >
                      <span className="material-icons align-middle text-sm">volunteer_activism</span> Me voluntariar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </main>

          {modalEvento && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-80 relative">
                <button onClick={() => setModalEvento(null)} className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl">✕</button>
                <h3 className="text-lg font-bold mb-4 text-center">Quero ser voluntário</h3>
                 {/* Instruções da ONG */}
      {modalEvento.informacoesVoluntario && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-3 text-sm">
          <strong>Instruções da ONG:</strong><br />
          {modalEvento.informacoesVoluntario}
        </div>
      )}
                {formEnviado ? (
                  <p className="text-green-600 font-semibold text-center">Mensagem enviada com sucesso!</p>
                ) : (
                  
                  <form onSubmit={enviarVoluntario} className="space-y-3">
                    <input type="text" name="nome" placeholder="Seu nome" className="w-full p-2 border rounded" required />
                    <input type="text" name="telefone" placeholder="Telefone" className="w-full p-2 border rounded" required />
                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded">Confirmar</button>
                  </form>
                )}
              </div>
            </div>
          )}
          {modalInteresse && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative">
      <button onClick={() => setModalInteresse(false)} className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl">✕</button>
      <h3 className="text-lg font-bold mb-4 text-center">Receber avisos de novos eventos</h3>

      {interesseEnviado ? (
        <p className="text-green-600 font-semibold text-center">Cadastro realizado com sucesso!</p>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
              nome: formData.get("nome"),
              email: formData.get("email"),
              cidade: formData.get("cidade"),
              estado: formData.get("estado"),
            };
            try {
              await api.post("/interesse-eventos", data);
              setInteresseEnviado(true);
              setTimeout(() => {
                setModalInteresse(false);
                setInteresseEnviado(false);
              }, 3000);
            } catch (err) {
              alert("Erro ao enviar. Tente novamente.");
            }
          }}
          className="space-y-3"
        >
          <input type="text" name="nome" placeholder="Seu nome" className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="Seu e-mail" className="w-full p-2 border rounded" required />          
                  <input type="text" name="cidade" placeholder="Cidade (ou deixe em branco)" className="w-full p-2 border rounded" />
          
          <select name="estado" className="w-full p-2 border rounded">
            <option value="">Todos os estados</option>
            {["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"].map((uf) => (
              <option key={uf} value={uf}>{uf}</option>
            ))}
          </select>

          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded">
            Confirmar
          </button>
        </form>
      )}
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}

