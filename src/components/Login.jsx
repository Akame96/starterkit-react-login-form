import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    try {
      const url = 'https://66fc0e66c3a184a84d15e4f0.mockapi.io/Users';
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Login avvenuto con successo!🎉");

        // Trasforma i dati ricevuti dal backend in stringa
        const resultToString = JSON.stringify(result);

        // Salva i dati dell'utente nel localStorage
        localStorage.setItem('userData', resultToString);

        // Naviga verso la dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } else {
        // In caso di errore lato server
        toast.error(result.message || "❌ Errore nel login. Verifica le tue credenziali.");
      }
    } catch (error) {
      // Gestione errori di connessione
      toast.error("❌ Errore durante la connessione al server. Riprova più tardi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-200 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              placeholder="Inserisci email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              placeholder="Inserisci password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500"
          >
            Accedi
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Non hai un account?{" "}
          <Link to="/registrazione" className="text-blue-500 hover:underline">
            Iscriviti
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

