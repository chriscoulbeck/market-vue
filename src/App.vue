<template>
  <div id="app">
    <div id="nav">
      <!-- Left -->
      <router-link class="router-link" to="/">Home</router-link>
      <!-- Right -->
      <div class="nav-right">
        <div class="admin">
          <router-link v-if="!loggedIn" class="router-link" to="/login">Log in</router-link>
          <router-link v-if="!loggedIn" class="router-link" to="/register">Register</router-link>
          <a v-if="loggedIn" v-on:click="logOutUser" class="router-link" href="#">Logout</a>
        </div>
        <div>
          <router-link class="router-link" to="/post">List Item</router-link>
          <router-link v-if="loggedIn" class="router-link" to="/account">{{ id }}</router-link>
          <router-link v-if="!loggedIn" class="router-link" to="/account">My Account</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import EventBus from "./eventBus";
export default {
  data: function() {
    return {
      loggedIn: "",
      id: "",
    };
  },
  methods: {
    logOutUser: function() {
      localStorage.loggedIn = "";
      //Local Storage can only set strings
      this.loggedIn = localStorage.loggedIn;
      this.$router.push({ path: "/" });
    },
  },
  created() {
    this.loggedIn = localStorage.loggedIn;
    this.id = localStorage.username;
    EventBus.$on("$loggedIn", () => {
      localStorage.loggedIn = "yes";
      this.loggedIn = localStorage.loggedIn;
      this.id = localStorage.username;
    });
  },
};
</script>

<style lang="scss">
@import "scss/variables";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  
}

.router-link {
  margin: 0 10px;
  color: white;
  font-weight: lighter;
}

#nav {
  height: 75px;
  width: 100%;
  background: $primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;

  a {
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.admin {
  font-size: 0.8em;
  margin-bottom: 5px;
}
</style>
