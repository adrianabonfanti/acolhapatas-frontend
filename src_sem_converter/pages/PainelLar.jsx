import { useState, useEffect } from "react";
import HomeLar from "./HomeLar";
import "../styles/Home.css";
export default function PainelLar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.tipo === "lar") {
      setUser(userData);
    }
  }, []);

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
        <p>Você precisa estar logado como lar temporário para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
     
      <HomeLar />
    </div>
  );
}
