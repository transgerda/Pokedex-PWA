import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { useFavicon, useTitle } from "@vueuse/core";

useFavicon("/favicon.ico");
useTitle("Pokedex");

const app = createApp(App);

app.use(router);

app.mount("#app");
