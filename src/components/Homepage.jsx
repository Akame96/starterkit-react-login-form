import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Homepage = () => {
  // Stato per le carte Pokémon
  const [pokemonCards, setPokemonCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [searchTerm, setSearchTerm] = useState(""); // Stato per la ricerca per nome
  const [selectedType, setSelectedType] = useState(""); // Stato per il tipo
  const [selectedSet, setSelectedSet] = useState(""); // Stato per il set
  const cardsPerPage = 12; // Numero di carte per pagina

  // Funzione per fetch delle carte Pokémon
  const fetchPokemonCards = async () => {
    try {
      const response = await fetch(
        "https://api.pokemontcg.io/v2/cards?pageSize=100" // Otteniamo 100 carte per la paginazione
      );
      const data = await response.json();
      setPokemonCards(data.data); // Salviamo le carte nello stato
    } catch (error) {
      console.error("Errore nel recupero delle carte Pokémon:", error);
    }
  };

  // Effettuiamo la fetch quando il componente viene montato
  useEffect(() => {
    fetchPokemonCards();
  }, []);

  // Funzione per cambiare pagina
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcoliamo le carte da visualizzare in base alla pagina corrente
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  // Filtro delle carte in base ai criteri di ricerca
  const filteredCards = pokemonCards.filter((card) => {
    const matchesName = card.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? card.types.includes(selectedType) : true;
    const matchesSet = selectedSet ? card.set.name === selectedSet : true;
    return matchesName && matchesType && matchesSet;
  });

  // Selezioniamo le carte da visualizzare in base alla paginazione
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  // Numero totale di pagine
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  // Trova i tipi e i set disponibili per i filtri
  const getTypesAndSets = () => {
    const typesSet = new Set();
    const setsSet = new Set();

    pokemonCards.forEach((card) => {
      card.types.forEach((type) => typesSet.add(type));
      setsSet.add(card.set.name);
    });

    return {
      types: [...typesSet],
      sets: [...setsSet],
    };
  };

  const { types, sets } = getTypesAndSets();

  return (
    <div>
      <header className="bg-purple-200 sticky top-0 z-50">
        <div className="mx-auto flex h-24 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
          <a href="#">
            <img
              src="images/logo-pokemon.png"
              alt="Pokemon-Logo"
              className="h-16 w-auto"
            />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-8 text-lg">
                <li>
                  <a
                    className="text-black text-2xl transition hover:text-violet-700"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-black text-2xl transition hover:text-violet-700"
                    href="#"
                  >
                    Carte
                  </a>
                </li>
                <li>
                  <a
                    className="text-black text-2xl transition hover:text-violet-700"
                    href="#"
                  >
                    Tipo
                  </a>
                </li>
                <li>
                  <a
                    className="text-black text-2xl transition hover:text-violet-700"
                    href="#"
                  >
                    Impostazioni
                  </a>
                </li>
              </ul>
            </nav>

            {/* Pulsanti a forma di Pokéball per Login e Registrati */}
            <div className="flex items-center gap-8">
              {/* Pokéball per il Login */}
              <div className="relative group">
                <Link to="/login">
                  <button className="w-14 h-14 rounded-full border-4 border-black bg-red-500 relative transition-all duration-300 transform group-hover:scale-110 group-hover:bg-red-400 group-hover:shadow-lg">
                    <div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full border-t-2 border-black"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                  </button>
                </Link>
                <p className="text-center mt-2 text-black text-sm">Login</p>
              </div>

              {/* Pokéball per Registrati */}
              <div className="relative group">
                <Link to="/registrazione">
                  <button className="w-14 h-14 rounded-full border-4 border-black bg-red-500 relative transition-all duration-300 transform group-hover:scale-110 group-hover:bg-red-400 group-hover:shadow-lg">
                    <div className="absolute bottom-0 w-full h-1/2 bg-white rounded-b-full border-t-2 border-black"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-2 border-black flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                  </button>
                </Link>
                <p className="text-center mt-2 text-black text-sm">
                  Registrati
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('images/background-pokemon.jpg')" }}
      >
        {/* Barra di ricerca e filtri */}
        <div className="flex flex-col md:flex-row gap-4 p-8 text-violet-700">
          <input
            type="text"
            placeholder="Cerca per nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded"
          />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded text-violet-700"
          >
            <option value="">Tutti i tipi</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select
            value={selectedSet}
            onChange={(e) => setSelectedSet(e.target.value)}
            className="p-2 border rounded text-violet-700"
          >
            <option value="">Tutti i set</option>
            {sets.map((set) => (
              <option key={set} value={set}>
                {set}
              </option>
            ))}
          </select>
        </div>

        {/* Visualizzazione delle carte */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
          {currentCards.map((card) => (
            <div
              key={card.id}
              className="bg-gray-300 rounded-lg shadow-md p-4 border border-black"
            >
              <img
                src={card.images.small}
                alt={card.name}
                className="w-full h-auto"
              />
              <h2 className="text-xl font-bold mt-2">{card.name}</h2>
              <p>{card.set.name}</p>
            </div>
          ))}
        </div>

        {/* Paginazione */}
        <div className="flex justify-center space-x-2 mt-4">
          {currentPage > 1 && (
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-3 py-1 mb-4 border rounded bg-gray-200 text-black hover:bg-gray-300"
            >
              &lt; Precedente
            </button>
          )}

          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;

            // Modifica la condizione logica per mostrare sempre la prima e l'ultima pagina
            if (
              pageNumber === 1 || // Mostra sempre la pagina 1
              pageNumber === totalPages || // Mostra sempre l'ultima pagina
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) // Mostra la pagina corrente e le vicine
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 mb-4 border rounded ${
                    currentPage === pageNumber
                      ? "bg-violet-500 text-white"
                      : "bg-violet-200 text-black"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }

            return null;
          })}

          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-3 mb-4 py-1 border rounded bg-gray-200 text-black hover:bg-gray-300"
            >
              Successivo &gt;
            </button>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-200 text-center py-8 md-8">
        <p className="text-black">
          &copy; {new Date().getFullYear()} pokemonCards. Tutti i diritti
          riservati.
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
