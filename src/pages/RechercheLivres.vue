<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Recherche de Livre</h1>
      
      <!-- Recherche par titre de livre -->
      <input
        v-model="searchQuery"
        type="text"
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Rechercher un livre par titre..."
      />
      
      <div v-if="filteredBooks.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <FicheLivre
            v-for="livre in filteredBooks"
            :key="livre.id"
            :livre="livre"
            @ajouter-livre="ajouterLeLivre"
            @afficher-fiche="afficherFicheLivre"
          />
        </div>
      </div>
      <div v-else class="text-center mt-4">
        <p class="text-gray-500">Aucun livre correspondant à votre recherche.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import FicheLivre from '../components/FicheLivre.vue';
  import { store } from '../stores/livresStore';
  
  const router = useRouter();
  const books = ref([]);  
  const searchQuery = ref('');  
  
  const fetchBooks = async () => {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=programming&maxResults=30');
    const data = await response.json();
    books.value = data.items.map(item => ({
      id: item.id,
      titre: item.volumeInfo.title || 'Titre inconnu',
      auteur: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Auteur inconnu',
      image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
    }));
  };
  
  const filteredBooks = computed(() => {
    if (!searchQuery.value) {
      return books.value;
    }
    return books.value.filter(livre =>
      livre.titre.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  
  const ajouterLeLivre = (livre) => {
    store.ajouterLivre(livre);
  };
  
  const afficherFicheLivre = (livre) => {
    router.push({
      path: '/fiche-livre-details',
      query: { id: livre.id },
    });
  };
  
  fetchBooks();
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 1rem;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button {
    transition: all 0.2s ease-in-out;
  }
  
  button:hover:not(:disabled) {
    transform: scale(1.05);
    background-color: #2563eb;
  }
  </style>
  