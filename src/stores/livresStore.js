import { ref } from 'vue';

export const useLivresStore = () => {
    const collection = ref([]);
    const livreSelectionne = ref(null);

    const ajouterLivre = (livre) => {
        if (!collection.value.some(item => item.id === livre.id)) {
            collection.value.push({ ...livre, lu: false });
            // Save to localStorage
            localStorage.setItem('bookCollection', JSON.stringify(collection.value));
        }
    };

    const supprimerLivre = (id) => {
        collection.value = collection.value.filter(livre => livre.id !== id);
        // Save to localStorage
        localStorage.setItem('bookCollection', JSON.stringify(collection.value));
    };

    const toggleLu = (id) => {
        const livre = collection.value.find(livre => livre.id === id);
        if (livre) {
            livre.lu = !livre.lu;
            // Save to localStorage
            localStorage.setItem('bookCollection', JSON.stringify(collection.value));
        }
    };

    const setLivreSelectionne = (livre) => {
        livreSelectionne.value = livre;
    };

    // Initialize from localStorage
    const initializeCollection = () => {
        const savedCollection = localStorage.getItem('bookCollection');
        if (savedCollection) {
            collection.value = JSON.parse(savedCollection);
        }
    };

    // Call initialize when creating store
    initializeCollection();

    return {
        collection,
        livreSelectionne,
        ajouterLivre,
        supprimerLivre,
        toggleLu,
        setLivreSelectionne
    };
};

// Create a single instance of the store
export const store = useLivresStore(); 