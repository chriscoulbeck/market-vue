<template>
  <div id="app">
    <div id="nav">
      <router-link class="router-link" to="/">Home</router-link>
      <router-link v-if="!loggedIn" class="router-link" to="/register">Register</router-link>
      <router-link v-if="!loggedIn" class="router-link" to="/login">Login</router-link>
      <router-link v-if="loggedIn" class="router-link" to="/account">{{name}}</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import EventBus from "./eventBus";
export default {
  data: function() {
    return {
      loggedIn: false,
      name: String
    };
  },
  created() {
    EventBus.$on("$loggedIn", (data) => {
      console.log("Event recieved...");
      this.loggedIn = data.log;
      this.name = data.name;
    });
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;
}

.router-link {
  margin: 0 10px;
}

#nav {
  padding: 30px;


  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
