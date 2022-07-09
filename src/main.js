import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueHighlightJS from "vue-highlightjs";
import "highlight.js/styles/default.css";

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
