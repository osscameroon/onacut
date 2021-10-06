import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import axios from "axios";
window.axios = require("axios");

createApp(App)
  .use(router)
  .mount("#app");
