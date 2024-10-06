import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Registrazione = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Le password non corrispondono!");
      return;
    }

    // Dati per la chiamata di login
    const loginData = {
      username: username,
      email: email,
      phone: phone,
    };

    try {
      const url = "https://66fc0e66c3a184a84d15e4f0.mockapi.io/Users";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registrazione avvenuta con successo!🎉");

        setTimeout(() => {
          // Trasformo i dati ricevuti dal backend in stringa, usando JSON.stringify
          const resultToString = JSON.stringify(result);
          // Salvo i dati dell'utente nel localStorage
          localStorage.setItem("userData", resultToString);
          // Navigo verso la homepage
          navigate("/login");
        }, 2000);
      } else {
        toast.error(
          result.message || "❌ Si è verificato un errore durante il login"
        );
      }
    } catch (error) {
      toast.error("❌ Errore durante la connessione al server");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('images/background.jpg')` }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-200 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Registrazione</h1>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="sr-only">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              placeholder="Inserisci username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              placeholder="inserisci email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="sr-only">
              Phone
            </label>
            <input
              type="phone"
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              placeholder="inserisci telefono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              placeholder="Crea una password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Conferma Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
              placeholder="Conferma la password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500"
          >
            Registrati
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Hai già un account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Accedi qui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registrazione;
