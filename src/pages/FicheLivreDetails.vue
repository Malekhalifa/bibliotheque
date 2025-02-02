<template>
    <div>
      <div v-if="livreSelectionne && livreSelectionne.volumeInfo">
        <h1>{{ livreSelectionne.volumeInfo.title }}</h1>
        <p>Auteur : {{ livreSelectionne.volumeInfo.authors?.join(', ') }}</p>
        <p>Date de publication : {{ livreSelectionne.volumeInfo.publishedDate }}</p>
        <p>ISBN : {{ livreSelectionne.volumeInfo.industryIdentifiers?.[0]?.identifier }}</p>
        <p>Nombre de pages : {{ livreSelectionne.volumeInfo.pageCount }}</p>
        <div>
          <p class="font-bold">Description :</p>
          <div v-html="livreSelectionne.volumeInfo.description" class="description-content"></div>
        </div>
      </div>
      <div v-else>
        <p>Chargement des détails du livre...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import useLivres from '../composables/apiGoogleLivres';
  import { store } from '../stores/livresStore';

  const route = useRoute();
  const { fetchLivreById } = useLivres();
  const livreSelectionne = ref(null);

  onMounted(async () => {
    const id = route.query.id;
    if (id) {
      const livre = await fetchLivreById(id);
      if (livre) {
        livreSelectionne.value = livre;
        store.setLivreSelectionne(livre);
      }
    }
  });

  </script>
  
  <style scoped>
  .description-content {
    margin-top: 0.5rem;
    line-height: 1.6;
  }

  .description-content :deep(p) {
    margin-bottom: 1rem;
  }

  .description-content :deep(b) {
    font-weight: 600;
  }
  </style>
  