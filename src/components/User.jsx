import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  // Dati fittizi dell'utente
  const user = {
    username: "nunzia",
    email: "nunzia.biele@virgilio.it",
    registrationDate: "2024-10-17",
    role: "Admin",
    profileImage: "/images/user.webp",
  };

  // Notifiche fittizie
  const notifications = [
    "Hai un nuovo messaggio da Giovanni.",
    "Il tuo profilo è stato aggiornato.",
    "Nuovi termini di servizio disponibili.",
  ];

  // Messaggi fittizi
  const messages = [
    { from: "Maria", text: "Ciao Luca! Come stai?" },
    { from: "Giovanni", text: "Hai ricevuto il documento?" },
  ];

  // Funzione per il logout
  const handleLogout = () => {
    // Logica per il logout
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-300 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Benvenuto, {user.username}!
      </h1>

      {/* Sezione Immagine Profilo */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <img
          src={user.profileImage}
          alt="Profilo"
          className="rounded-full h-32 w-32 mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">{user.username}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Data di Registrazione:</strong> {user.registrationDate}
        </p>
        <p>
          <strong>Ruolo:</strong> {user.role}
        </p>
      </div>

      {/* Sezione Notifiche */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Notifiche</h2>
        <ul className="list-disc pl-5">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index} className="mb-2">
                {notification}
              </li>
            ))
          ) : (
            <li>Nessuna notifica.</li>
          )}
        </ul>
      </div>

      {/* Sezione Messaggi */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Messaggi Recenti</h2>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="border-b py-2">
              <strong>{message.from}:</strong> {message.text}
            </div>
          ))
        ) : (
          <p>Nessun messaggio recente.</p>
        )}
      </div>

      {/* Opzioni per modificare informazioni aggiuntive */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-6">
        <h2 className="text-2xl font-semibold mb-4">Preferenze</h2>
        <div className="flex flex-col space-y-4">
          {" "}
          {/* Aggiunta Flexbox con spazio verticale */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/preferences")}
          >
            Modifica Preferenze
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => navigate("/edit-profile")}
          >
            Modifica Profilo
          </button>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default User;
