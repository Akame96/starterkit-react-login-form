import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Login from "./components/Login";
import Registrazione from "./components/Registrazione";
import Homepage from "./components/Homepage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Importa lo stile della libreria
import { Bounce } from 'react-toastify';  // Importa la transizione se la usi
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="App">
      {/* //toast notifiche */}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registrazione" element={<Registrazione />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/Dashboard" element={<Dashboard />}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;



