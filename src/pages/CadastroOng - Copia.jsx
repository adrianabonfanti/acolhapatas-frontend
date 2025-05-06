export default function CadastroOng() {
  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Cadastro de ONG</h1>
      <p className="mb-2 text-sm text-gray-600 text-center">Após o envio, o cadastro será analisado e aprovado manualmente.</p>
      <form className="space-y-4">
        <input type="text" placeholder="Nome da ONG" className="w-full p-2 border rounded" />
        <input type="text" placeholder="Telefone de contato" className="w-full p-2 border rounded" />
        <input type="text" placeholder="Instagram" className="w-full p-2 border rounded" />
        <input type="file" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full">
          Enviar Cadastro
        </button>
      </form>
    </div>
  );
}
