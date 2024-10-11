import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// registrare i componenti
ChartJS.register(ArcElement, Tooltip, Legend);

// creare un immagine per il background
const image = new Image();
image.src = "https://www.chartjs.org/img/chartjs-logo.svg";

// immagine background
const plugin = {
  id: "customCanvasBackgroundImage",
  beforeDraw: (chart) => {
    if (image.complete) {
      const ctx = chart.ctx;
      const { top, left, width, height } = chart.chartArea;
      const x = left + width / 2 - image.width / 2;
      const y = top + height / 2 - image.height / 2;
      ctx.drawImage(image, x, y);
    } else {
      image.onload = () => chart.draw();
    }
  },
};

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [chartData, setChartData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      navigate("/registrazione");
    }
  }, [navigate]);

  // Fetch data per charts
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.pokemontcg.io/v2/cards?pageSize=100"
      );
      const data = await response.json();

      console.log(data); 

      const typesCount = {
        water: 8,
        glass: 44,
        lightning: 6,
        metal: 9,
        dragon: 3,
        darkness: 6,
        psychic: 8,
        fire: 12,
        colorless: 6,
        fighting: 5,
      };

      data.data.forEach((card) => {
        if (card.types) {
          card.types.forEach((type) => {
            // eslint-disable-next-line no-prototype-builtins
            if (typesCount.hasOwnProperty(type)) {
              typesCount[type] += 1;
            }
          });
        }
      });

      const types = Object.keys(typesCount);
      const values = types.map((type) => typesCount[type]);

      setChartData({
        labels: types,
        datasets: [
          {
            label: "Element Types",
            data: values,
            backgroundColor: [
              "rgba(38, 50, 56, 0.6)", // blu scuro
              "rgba(233, 30, 99, 0.6)", // rosa scuro
              "rgba(0, 150, 136, 0.6)", // verde scuro
              "rgba(255, 87, 34, 0.6)", // arancione scuro
              "rgba(255, 235, 59, 0.6)", // giallo scuro
              "rgba(66, 66, 66, 0.6)", // grigio scuro
              "rgba(103, 58, 183, 0.6)", // viola scuro
              "rgba(244, 67, 54, 0.6)", // rosso scuro
              "rgba(27, 94, 32, 0.6)", // verde foresta
              "rgba(0, 121, 107, 0.6)", // verde acqua scuro
            ],

            borderColor: "rgba(0, 0, 0, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      setChartData({
        labels: [],
        datasets: [],
      });
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  // Funzione per gestire il logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("loginData");
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{
        backgroundImage: `url('images/dashboard_image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Navbar */}
      <nav className="bg-purple-800 p-4 flex justify-between items-center">
      <img src="images/logo-pokemon.png" alt="Logo" className="h-16 w-auto mr-2" />
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
        <h1 className="text-4xl font-bold mb-4 text-4xl text-center">
          Benvenuto nella tua Dashboard!
        </h1>

      {/* User Profile Section */}
{userData && ( // Controlla se userData è presente
  <div className="bg-gray-400 shadow p-4 rounded-full mb-8 flex flex-col items-center justify-center text-center flex-1 h-full">
    <h2 className="text-2xl font-semibold text-violet-800">
      User Profile
    </h2>
    <p className="text-lg">
      <strong>Username:</strong> {userData.username}
    </p>
    <p className="text-lg">
      <strong>Email:</strong> {userData.email}
    </p>
    <p className="text-lg">
      <strong>Numero:</strong> {userData.phone}
    </p>
  </div>
)}

{/* Cards Section */}
<div className="grid grid-cols-3 gap-4 flex-1">
  <div className="bg-gray-400 shadow-lg p-4 rounded-xl flex flex-col items-center justify-center text-center flex-1 h-full">
    <h2 className="text-2xl font-semibold text-violet-800">
      Statistiche Carte Pokémon
    </h2>
    <p className="text-lg">
      <strong>Carte Totali:</strong> 100
    </p>
    <p className="text-lg">
      <strong>Tempo Speso a Giocare:</strong> 5 ore
    </p>
    <p className="text-lg">
      <strong>Carta Preferita Giocata:</strong> Charizard
    </p>
  </div>

  <div className="bg-gray-400 shadow-md p-4 rounded-xl flex flex-col items-center justify-center text-center flex-1 h-full">
    <h2 className="text-2xl font-semibold text-violet-800">
      Attività Recenti
    </h2>
    <ul className="text-lg">
      <li>Giocata una carta di Pikachu.</li>
      <li>Scambiato un Gengar.</li>
    </ul>
  </div>

  <div className="bg-gray-400 shadow-md p-4 rounded-xl flex flex-col items-center justify-center text-center flex-1 h-full">
    <h2 className="text-2xl font-semibold text-violet-800">
      Carte in Gioco
    </h2>
    <ul className="text-lg">
      <li>Charizard - Punti Vita: 150</li>
      <li>Pikachu - Punti Vita: 100</li>
      <li>Gengar - Punti Vita: 130</li>
    </ul>
  </div>
</div>

{/* Chart Section */}
<div className=" p-4 rounded-xl flex flex-col items-center justify-center text-center flex-1 h-full mt-8">
  <h2 className="text-2xl font-semibold text-violet-800 text-center mb-4">
    Grafico tipi di Pokemon
  </h2>
  {chartData.datasets && chartData.datasets.length > 0 ? (
    <div className="w-70 h-70">
      <Doughnut
        data={chartData}
        options={{ plugins: [plugin], responsive: true }}
      />
    </div>
  ) : (
    <p className="text-center text-black">Loading...</p>
  )}
</div>

      </div>
    </div>
  );
};

export default Dashboard;
