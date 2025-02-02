import { createRouter, createWebHistory } from 'vue-router';
import Accueil from './pages/Accueil.vue';

import FicheLivreDetails from './pages/FicheLivreDetails.vue';

import RechercheLivres from './pages/RechercheLivres.vue';
import MaCollection from './pages/MaCollection.vue';




const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;


const routes = [
  { path: '/', name: 'Accueil', component: Accueil },
 
  { path: '/fiche-livre-details', name: 'FicheLivre',  component: FicheLivreDetails,  props: (route) => ({ id: route.query.id }), // Passe l'ID en prop au composant
  },
  { path: '/Recherche-Livres', name: 'Recherche-Livres', component: RechercheLivres },
  { path: '/ma-collection', name: 'ma-collection', component: MaCollection },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
