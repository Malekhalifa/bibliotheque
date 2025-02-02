<template>
  <!-- Icone de Bibliothèque avec le nombre de livres -->
  <div class="fixed bottom-4 right-4">
    <button @click="goToMaCollection" class="flex items-center bg-blue-500 text-white rounded-full p-4 shadow-lg">
      <i class="fas fa-book"></i> <!-- Icone de la bibliothèque -->
      <span v-if="store.collection.value?.length > 0" class="ml-2 text-lg">{{ store.collection.value.length }}</span>
    </button>
  </div>
  
  <div class="p-6">
    <!-- Section Ma Collection de Livres -->
    <section>
      <h1 class="text-2xl font-bold mb-4">Ma Collection de Livres</h1>
      <div v-if="!store.collection.value?.length" class="text-center">
        <img :src="emptyFolderImage" alt="Collection vide" class="mx-auto w-64" />
        <p class="text-gray-500">Votre collection est vide. Ajoutez des livres pour commencer !</p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CarteLivre
          v-for="livre in store.collection.value"
          :key="livre.id"
          :livre="livre"
          @toggle-lu="(id) => store.toggleLu(id)"
          @supprimer="(id) => store.supprimerLivre(id)"
        />
      </div>
    </section>
    
    <!-- Section Recherche et ajout de Livre -->
    <section class="mt-12">
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
            @ajouter-livre="ajouterLivre"
            @afficher-fiche="afficherFicheLivre"
          />
        </div>
      </div>
      <div v-else class="text-center mt-4">
        <p class="text-gray-500">Aucun livre correspondant à votre recherche.</p>
      </div>
    </section>
    
    <!-- Section Collection de Livres avec pagination -->
    <section class="mt-12">
      <h1 class="text-2xl font-bold mb-4">Collection de Livres</h1>
      <div v-if="isLoading" class="text-center">
        <p>Chargement des livres...</p>
      </div>
      <div v-else>
        <div v-if="books.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FicheLivre
              v-for="livre in paginatedBooks"
              :key="livre.id"
              :livre="livre"
              @ajouter-livre="ajouterLivre"
              @afficher-fiche="afficherFicheLivre"
            />
          </div>
          
          <!-- Pagination -->
          <div class="flex justify-center mt-4">
            <button
              :disabled="currentPage === 1"
              @click="goToPage(currentPage - 1)"
              class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            <span class="mx-4 text-lg">
              Page {{ currentPage }} sur {{ totalPagesCount }}
            </span>
            <button
              :disabled="currentPage === totalPagesCount"
              @click="goToPage(currentPage + 1)"
              class="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
        <div v-else class="text-center">
          <img :src="emptyFolderImage" alt="Collection vide" class="mx-auto w-64" />
          <p class="text-gray-500">Aucun livre disponible.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CarteLivre from '../components/CarteLivre.vue';
import FicheLivre from '../components/FicheLivre.vue';
import emptyFolderImage from '../assets/empty-folder.png';
import { store } from '../stores/livresStore';

const books = ref([]); // Livres de l'API Google
const isLoading = ref(true);
const currentPage = ref(1);
const booksPerPage = 10;
const searchQuery = ref(''); // Variable de recherche
const router = useRouter();

const totalPagesCount = computed(() => Math.ceil(books.value.length / booksPerPage));

const fetchBooks = async () => {
  try {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
      params: {
        q: 'programming',
        maxResults: 30,
        key: 'AIzaSyCsVqGp33ldLw187ugnrbN0KOPWru-lnRo',
      },
    });
    books.value = response.data.items.map(item => ({
      id: item.id,
      titre: item.volumeInfo.title || 'Titre inconnu',
      auteur: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Auteur inconnu',
      image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des livres :', error);
  } finally {
    isLoading.value = false;
  }
};

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * booksPerPage;
  return books.value.slice(start, start + booksPerPage);
});

const filteredBooks = computed(() => {
  if (!searchQuery.value) {
    return books.value;
  }
  return books.value.filter(livre =>
    livre.titre.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPagesCount.value) {
    currentPage.value = page;
  }
};

const ajouterLivre = (livre) => {
  store.ajouterLivre(livre);
};

const afficherFicheLivre = (livre) => {
  router.push({
    path: '/fiche-livre-details',
    query: { id: livre.id },
  });
};

const goToMaCollection = () => {
  router.push('/ma-collection');
};

onMounted(() => {
  fetchBooks();
});
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
