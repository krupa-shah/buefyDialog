<template>
  <div id="app">
    <section>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :open="isOpen" @open="open"/>
    <button @click="openDialog()" type="=button">Open Dialog</button>
    </section>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    openDialog() {
      this.isOpen = true;
    },
    open(bFlag) {
      this.isOpen = bFlag;
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
