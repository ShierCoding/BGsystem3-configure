import { createApp } from "vue";

// import "./tailwind.css";

import "primeflex/primeflex.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/aura-dark-cyan/theme.css";
import "./style.css";


import App from "./App.vue";

import { createPinia } from "pinia";

import PrimeVue from "primevue/config";

import "primeicons/primeicons.css";

import LoadComp from "./loadComp";
import { router } from "./router";

const pinia = createPinia();
const app = createApp(App);

app.use(PrimeVue, { ripple: true });

LoadComp(app);

app.use(pinia);

app.use(router);

// import LoadVMarkdown from "./vMarkdown";

// LoadVMarkdown(app);

app.mount("#app");

