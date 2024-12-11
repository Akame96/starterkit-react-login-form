import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users"); // Richiesta al backend
      if (!response.ok) {
        throw new Error("Errore durante il recupero degli utenti");
      }
      const data = await response.json();
      setUsers(data); // Aggiorna lo stato con i dati degli utenti
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Chiamata API per ottenere gli utenti quando il componente viene montato
  }, []);

  const handleBackToDashboard = () => {
    navigate("/dashboard"); // Torna alla dashboard
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-300 p-6">
      <h1 className="text-4xl text-center font-bold mb-4">Area Admin</h1>

      <button
        onClick={handleBackToDashboard}
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded mb-4"
      >
        Torna alla Dashboard
      </button>

      {loading ? (
        <p className="text-center">Caricamento...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nome Utente</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Ruolo</th>
              <th className="py-2 px-4 border-b">Stato</th>
              <th className="py-2 px-4 border-b">Data di Registrazione</th>
              <th className="py-2 px-4 border-b">Azione</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-300 transition-colors">
                  <td className="py-2 px-4 border-b text-center">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.username}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.role_id}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-white ${
                        user.isActive ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {user.isActive ? "Attivo" : "Inattivo"}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">{user.created_at}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded mr-2">
                      Modifica
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded">
                      Elimina
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-2 px-4 border-b text-center">
                  Nessun utente trovato
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;




