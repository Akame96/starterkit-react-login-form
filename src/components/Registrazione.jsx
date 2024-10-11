/* eslint-disable react/prop-types */
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

    // Controllo che le password corrispondano
    if (password !== confirmPassword) {
      toast.error("Le password non corrispondono!");
      return;
    }

    const registrationData = { username, email, phone, password };

    try {
      const response = await fetch("http://localhost:3000/registrazione", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registrazione avvenuta con successo!🎉");

        // Store the result directly, including the password
        localStorage.setItem("userData", JSON.stringify(result));

        // Naviga verso la pagina di login
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(result.message || "❌ Si è verificato un errore durante la registrazione");
      }
    } catch (error) {
      toast.error("❌ Errore durante la connessione al server");
      console.error("Errore nella registrazione:", error);
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
          <InputField
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="tel"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputField
            type="password"
            label="Crea una password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            type="password"
            label="Conferma Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-500"
          >
            Registrati
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Hai già un account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">Accedi qui</Link>
        </p>
      </div>
    </div>
  );
};

// Reusable InputField component for better readability
const InputField = ({ type, label, value, onChange }) => (
  <div>
    <label className="sr-only">{label}</label>
    <input
      type={type}
      className="w-full px-4 py-3 rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500"
      placeholder={label}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default Registrazione;
