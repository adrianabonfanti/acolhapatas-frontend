export default function DashboardLar() {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Painel do Lar Temporário 🏡</h1>

      <div className="bg-green-100 p-6 rounded shadow mb-8">
        <p className="text-lg">
          Você está apto a acolher <span className="font-bold">--</span> animal(is) com base nas suas preferências.
        </p>
        <a href="/painel-lar/meus-dados" className="text-green-700 underline mt-2 inline-block">
          Atualizar minhas preferências
        </a>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Animais que combinam com seu perfil:</h2>

      <div className="grid gap-6">
        {/* Aqui futuramente serão listados os animais que combinam */}
        <div className="bg-white p-4 rounded shadow border">
          <h3 className="text-xl font-bold">Nome do Animal</h3>
          <p>Espécie: --</p>
          <p>Sexo: --</p>
          <p>Porte: --</p>
          <p>Idade: --</p>
          <p>Necessidades Especiais: --</p>
          <p>Medicação: --</p>
          <button className="bg-green-600 hover:bg-green-700 text-white mt-4 px-4 py-2 rounded">
            🐾 Quero Acolher
          </button>
        </div>
      </div>

      {/* Caso não tenha nenhum animal */}
      <div className="text-center mt-10 text-gray-500">
        Nenhum animal corresponde ao seu perfil no momento.
      </div>
    </div>
  );
}