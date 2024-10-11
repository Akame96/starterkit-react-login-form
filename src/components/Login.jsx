import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login avvenuto con successo!🎉");

        // Store user data securely (consider not storing passwords)
        localStorage.setItem("userData", JSON.stringify(data));

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(`❌ ${data.msg || "Email o password non corretti."}`);
      }
    } catch (error) {
      toast.error("❌ Si è verificato un errore durante il login.");
      console.error("Errore nel login:", error);
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
              id="email"
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
              id="password"
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
          <br />
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

