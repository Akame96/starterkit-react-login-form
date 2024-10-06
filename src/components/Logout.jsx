import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Rimuovi i dati di login dal localStorage
    localStorage.removeItem("loginData");

    // Reindirizza alla pagina di login
    navigate("/login");
  }, [navigate]);

  return null; // Non renderizziamo nulla nel DOM
};

export default Logout;
