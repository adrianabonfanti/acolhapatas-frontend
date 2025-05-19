const React = require("react");


function DetalhesModal({ isOpen, onClose, data, title }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <ul className="flex flex-col gap-2">
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              <strong>{formatarCampo(key)}:</strong> {value || "Não informado"}
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}

module.exports = DetalhesModal;


function formatarCampo(campo) {
  // Deixa as chaves bonitinhas para exibir
  return campo
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
}
