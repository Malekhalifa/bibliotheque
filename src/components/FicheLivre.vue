<template>
  <div class="fiche-livre">
    <div class="entete">
      <div>
        <h2>{{ livre?.titre || 'Titre non disponible' }}</h2>
        <p>{{ livre?.auteur || 'Auteur non disponible' }}</p>
      </div>
      <img 
        v-if="livre?.image" 
        :src="livre.image" 
        :alt="`Couverture du livre ${livre?.titre || ''}`"
      />
    </div>

    <div class="actions">
      <!-- Bouton modifié pour rediriger vers la fiche du livre -->
      <button @click="consulterFicheLivre(livre.id)">
        Consulter la fiche du livre
      </button>

      <button @click="$emit('ajouter-livre', livre)">
        Ajouter à Ma Collection
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';


// Définition de la prop `livre`
const props = defineProps({
  livre: {
    type: Object,
    required: true,
  },
});

// Define emits
const emit = defineEmits(['ajouter-livre', 'afficher-fiche']);

// Gestion du router pour la redirection
const router = useRouter();

// Redirection vers la fiche du livre détaillée
const consulterFicheLivre = (id) => {
  emit('afficher-fiche', props.livre);
};
</script>

<style scoped>
.fiche-livre {
  padding: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.entete {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.entete img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-left: 15px;
}

.entete h2 {
  font-size: 20px;
  font-weight: bold;
}

.entete p {
  font-size: 14px;
  color: #6b7280;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.actions button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.actions button:hover {
  background-color: #2563eb;
}

.actions button:nth-child(2) {
  background-color: #10b981;
}

.actions button:nth-child(2):hover {
  background-color: #059669;
}
</style>
