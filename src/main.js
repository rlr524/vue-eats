import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
import { firebaseApp } from "@/firebase";
import { VueFire } from "vuefire";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
	components,
	directives,
});

const app = createApp(App);

app.use(VueFire, {
	firebaseApp,
	modules: [],
});
app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
