import { useParams } from "react-router-dom";

export default function Ong() {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Perfil da ONG</h1>
      <p>ID da ONG: {id}</p>
      <p>Aqui vamos exibir o nome, telefone, Instagram e animais desta ONG.</p>
    </div>
  );
}
