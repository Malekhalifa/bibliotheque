<template>
  <div class="carte-livre">
    <div class="gauche">
      <!-- Image de couverture -->
      <img 
        v-if="livre.image" 
        :src="livre.image" 
        alt="Couverture du livre" 
      />
    </div>
    <div class="droite">
      <!-- Titre -->
      <div class="groupe">
        <p>Titre</p>
        <h3>{{ livre.titre || "Titre non disponible" }}</h3>
      </div>

      <!-- Auteur -->
      <div class="groupe">
        <p>Auteur</p>
        <h3>{{ livre.auteur || "Auteur non disponible" }}</h3>
      </div>

      <!-- Statut Lu/Non lu -->
      <div class="groupe">
        <p>Statut de lecture</p>
        <h3 
          :class="{
            'lu': livre.lu, 
            'non-lu': !livre.lu
          }"
        >
          Lu : {{ livre.lu ? "Oui" : "Non" }}
        </h3>
      </div>

      <!-- Boutons -->
      <div class="actions">
        <button 
          @click="$emit('toggle-lu', livre.id)"
          class="action-btn lu-toggle"
        >
          Marquer comme {{ livre.lu ? "non lu" : "lu" }}
        </button>
        <button 
          @click="$emit('supprimer', livre.id)"
          class="action-btn supprimer"
        >
          Supprimer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  livre: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['toggle-lu', 'supprimer']);
</script>

<style scoped>
.carte-livre {
  display: flex;
  background-color: #242424;
  box-shadow: 10px 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  overflow: hidden;
  margin: 15px;
}

.gauche {
  width: 40%;
  text-align: center;
  background-color: #f0f0f0;
}

.gauche img {
  width: 100%;
  height: auto;
}

.droite {
  width: 60%;
  padding: 15px;
}

.groupe {
  margin-bottom: 10px;
}

.groupe p {
  font-size: 14px;
  margin: 0;
  color: gray;
}

.groupe h3 {
  font-size: 18px;
  margin: 5px 0;
}

.lu {
  color: green;
  font-weight: bold;
}

.non-lu {
  color: gray;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.action-btn {
  padding: 10px 15px;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-btn.lu-toggle {
  background-color: #007bff;
}

.action-btn.lu-toggle:hover {
  background-color: #0056b3;
}

.action-btn.supprimer {
  background-color: #dc3545;
}

.action-btn.supprimer:hover {
  background-color: #a71d2a;
}

.action-btn.ajouter {
  background-color: #28a745;
}

.action-btn.ajouter:hover {
  background-color: #1c7c31;
}
</style>
