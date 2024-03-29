import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import Buefy from "buefy";
import VeeValidate from "vee-validate";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;
Vue.use(Buefy);
Vue.use(VeeValidate);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
