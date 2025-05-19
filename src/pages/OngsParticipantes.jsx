import React from "react";

function OngsParticipantes() {
  return (
    <div style={{ display: "flex" }}>
      {/* COLUNA DA ESQUERDA */}
      <div style={{ flex: 7, padding: "20px" }}>
        <h1>🐾 O que é ser um Lar Temporário?</h1>

        <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.8" }}>
          <li>🛏️ <strong>Acolher com carinho:</strong> ofereça abrigo temporário a um animal resgatado.</li>
          <li>🍲 <strong>Cuidar bem:</strong> forneça alimentação, água fresca e ambiente seguro.</li>
          <li>💊 <strong>Acompanhar tratamentos:</strong> alguns animais podem precisar de cuidados especiais.</li>
          <li>🚫 <strong>Segurança é prioridade:</strong> sem acesso à rua e janelas com telas para gatos.</li>
          <li>❤️ <strong>Dar amor e atenção:</strong> carinho, paciência e presença fazem toda a diferença.</li>
        </ul>
      </div>

      {/* COLUNA DA DIREITA */}
      <div style={{ flex: 3, padding: "20px", backgroundColor: "#f2f2f2" }}>
        <h2>Preencha o cadastro para ser um lar temporário:</h2>
        <form>
          <h3>👤 Dados Pessoais</h3>
          <input type="text" placeholder="Nome completo" className="input" required />
          <input type="text" placeholder="CEP" className="input" required />
          <input type="text" placeholder="Rua" className="input" required />
          <input type="text" placeholder="Número" className="input" required />
          <input type="text" placeholder="Complemento" className="input" />
          <input type="text" placeholder="Cidade" className="input" required />
          <input type="text" placeholder="Estado" className="input" required />

          <h3 className="mt-4">🐶🐱 Sobre o(s) animal(is) que quer hospedar:</h3>
          <div>
            <label><input type="checkbox" name="especie" value="cachorro" /> Cachorro</label><br/>
            <label><input type="checkbox" name="especie" value="gato" /> Gato</label>
          </div>

          <div className="mt-2">
            <label><strong>Porte:</strong></label><br/>
            <label><input type="checkbox" name="porte" value="pequeno" /> Pequeno</label><br/>
            <label><input type="checkbox" name="porte" value="medio" /> Médio</label><br/>
            <label><input type="checkbox" name="porte" value="grande" /> Grande</label>
          </div>

          <div className="mt-2">
            <label><strong>Idade:</strong></label><br/>
            <label><input type="checkbox" name="idade" value="filhote" /> Filhote</label><br/>
            <label><input type="checkbox" name="idade" value="adulto" /> Adulto</label><br/>
            <label><input type="checkbox" name="idade" value="idoso" /> Idoso</label>
          </div>

          <div className="mt-2">
            <label><input type="checkbox" /> Pode estar tomando medicação?</label><br/>
            <label><input type="checkbox" /> Pode estar em tratamento?</label><br/>
            <label><input type="checkbox" /> Pode ter necessidades especiais?</label>
          </div>

          <div className="mt-3">
            <label><strong>Quantos animais você pode abrigar por vez?</strong></label><br/>
            <input type="number" className="input" min="1" />
          </div>

          <div className="mt-3">
            <label><strong>Você garante:</strong></label><br/>
            <label><input type="radio" name="bemestar" value="sim" /> Sim</label>
            <label><input type="radio" name="bemestar" value="nao" /> Não</label><br/>
            <small>Que os animais hospedados receberão tudo para seu bem-estar, saúde e alegria?</small><br/><br/>

            <label><input type="radio" name="acessoRua" value="sim" /> Sim</label>
            <label><input type="radio" name="acessoRua" value="nao" /> Não</label><br/>
            <small>Que os animais não terão acesso à rua, exceto para passeios com coleira?</small><br/><br/>

            <label><input type="radio" name="tela" value="sim" /> Sim</label>
            <label><input type="radio" name="tela" value="nao" /> Não</label><br/>
            <small>(Apenas para quem vai hospedar gatos) Você tem tela nas janelas?</small>
          </div>

          <div className="mt-4">
            <label><strong>📸 Envie uma foto sua:</strong></label><br/>
            <input type="file" accept="image/*" className="input" />
          </div>

          <button type="submit" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Enviar cadastro
          </button>
        </form>
      </div>
    </div>
  );
}

export default OngsParticipantes;
