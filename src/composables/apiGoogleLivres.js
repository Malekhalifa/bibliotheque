import { ref } from "vue";

const livres = ref([]); // Liste des livres partagée

export default function useLivres() {
  // Mettre à jour la liste des livres
  const setLivres = (nouveauxLivres) => {
    livres.value = nouveauxLivres;
  };

  // Rechercher un livre par ID dans la liste
  const getLivreById = (id) => {
    console.log('Searching for book with id:', id); // Add debug logging
    const found = livres.value.find((livre) => livre.id === id);
    console.log('Found book:', found); // Add debug logging
    return found;
  };

  // Rechercher des livres via l'API Google Books
  const rechercher = (titre) => {
    if (titre !== "") {
      // Formatage du titre pour la requête
      const titreFormate = titre.replace(/\s+/g, "+");
      const url = `https://www.googleapis.com/books/v1/volumes?q=${titreFormate}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.items && data.items.length > 0) {
            livres.value = data.items; // Met à jour les livres avec les résultats
          } else {
            livres.value = []; // Aucun résultat
          }
        })
        .catch((error) => {
          console.error("Erreur :", error);
          livres.value = []; // En cas d'erreur
        });
    } else {
      // Réinitialiser si le titre est vide
      livres.value = [];
    }
  };

  // New function to fetch a single book by ID
  const fetchLivreById = async (id) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données.");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération du livre:", error);
      return null;
    }
  };

  return {
    livres,       // Liste des livres partagée
    setLivres,    // Fonction pour mettre à jour la liste
    getLivreById, // Trouver un livre par ID
    rechercher,   // Rechercher des livres via l'API Google Books
    fetchLivreById,  // Export the new function
  };
}
