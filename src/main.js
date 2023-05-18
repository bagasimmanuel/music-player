import "./assets/main.scss";

import { createApp } from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

library.add(faPlay);
library.add(faAngleLeft);
library.add(faAngleRight);
library.add(faPause);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
