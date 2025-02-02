<template>
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
</template>

<script setup>
import CarteLivre from '../components/CarteLivre.vue';  
import { useRouter } from 'vue-router';
import { store } from '../stores/livresStore';

const router = useRouter();
// Définir l'image par défaut pour un dossier vide
const emptyFolderImage = '/src/assets/empty-folder.png';
</script>

<style scoped>

</style>
