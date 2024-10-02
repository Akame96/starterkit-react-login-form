import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Recupera i dati dal localStorage
    const storedData = localStorage.getItem('userData');

    // Controlla se i dati esistono e convertili da stringa JSON a oggetto
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-green-200 p-6 rounded-lg shadow-md max-w-md w-full border border-black">
        <h1 className="text-2xl font-bold mb-4 text-orange-500">Dashboard</h1>

        {userData ? (
          <div>
            <h2 className="text-xl mb-5 text-blue-500">Dati utente:</h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-green-300">
                  <th className="px-6 py-2">Campo</th>
                  <th className="px-6 py-2">Valore</th>
                </tr>
              </thead>
              <tbody>
                {/* Cicla attraverso i dati dell'utente e li mostra */}
                {Object.entries(userData).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border px-4 py-4 bg-green-100">{key}</td>
                    <td className="border px-4 py-4 bg-green-100">{(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-red-500">Nessun dato disponibile nel localStorage.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

