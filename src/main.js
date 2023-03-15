import { firebaseApp } from "@/firebase";
import { createApp } from "vue";
import { VueFire } from "vuefire";
import { createPinia } from "pinia";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
	components,
	directives,
});

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(VueFire, {
	firebaseApp,
	modules: [],
});
app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
