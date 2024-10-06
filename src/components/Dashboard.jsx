import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera i dati dal localStorage
    const storedData = localStorage.getItem("userData");

    // Controlla se i dati esistono e convertili da stringa JSON a oggetto
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      navigate("/login"); // Reindirizza a login se non ci sono dati utente
    }
  }, [navigate]);

  // Funzione per gestire il logout
  const handleLogout = () => {
    // Rimuove i dati dal localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("loginData");

    // Reindirizza alla pagina di login
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{
        backgroundImage: `url('images/background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className="bg-purple-800 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </nav>

      {/* Contenuto della Dashboard */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">
          Recap
        </h2>

        {/* User Profile Section */}
        {userData && ( // Controlla se userData è presente
          <div className="bg-gray-200 shadow-md p-4 rounded-full mb-8 flex flex-col items-center justify-center text-center flex-1 h-full">
            <h2 className="text-xl font-semibold text-violet-500">
              User Profile
            </h2>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Numero:</strong> {userData.phone}
            </p>
          </div>
        )}

        {/* Cards Section */}
        <div className="grid grid-cols-3 gap-4 flex-1">
          <div className="bg-gray-200 shadow-lg p-4 rounded-xl flex flex-col items-center justify-center text-center flex-1 h-full">
            <h2 className="text-xl font-semibold text-violet-500">
              Statistiche
            </h2>
            <p>
              <strong>Accessi Totali:</strong> 25
            </p>
            <p>
              <strong>Tempo Speso:</strong> 2 ore
            </p>
            <p>
              <strong>Ultima Attività:</strong> 3 ore fa
            </p>
          </div>

          <div className="bg-gray-200  shadow-md p-4 rounded-xl flex flex-col items-center justify-center text-center flex-1 h-full">
            <h2 className="text-xl font-semibold text-violet-500">
              Attività Recenti
            </h2>
            <ul>
              <li>Aggiunto un nuovo post.</li>
              <li>Modificato il profilo.</li>
            </ul>
          </div>

          <div className="bg-gray-200 shadow-md p-4 rounded-xl flex flex-col items-center justify-center text-center flex-1 h-full">
            <h2 className="text-xl font-semibold text-violet-500">
              Progetti Correnti
            </h2>
            <ul>
              <li>Progetto React.js - Progresso: 70%</li>
              <li>Progetto Node.js - Progresso: 45%</li>
              <li>Progetto HTML & CSS - Progresso: 90%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
