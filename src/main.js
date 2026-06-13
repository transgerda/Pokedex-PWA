import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useFavicon, useTitle } from "@vueuse/core";

import favicon from "./assets/favicon.png";

useFavicon(favicon);
useTitle("Pokedex");

const app = createApp(App);

app.use(router);

app.mount("#app");
