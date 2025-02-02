import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes';
import { API_KEY } from './config';

const apiKey = API_KEY;


createApp(App).use(router).mount('#app');


  

