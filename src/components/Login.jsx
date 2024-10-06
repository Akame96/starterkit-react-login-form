import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Recupero i dati dal localStorage
    const storedUserData = localStorage.getItem("userData");
    const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;

    if (parsedUserData && parsedUserData.email === email) {
      toast.success("Login avvenuto con successo!🎉");

      // Naviga verso la dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      // In caso di errore
      toast.error("❌ Email o password non corretti.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url('images/background.jpg')` }}
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-200 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
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
            <label htmlFor="password" className="sr-only">
              Password
            </label>
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
