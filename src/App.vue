<template>
  <div id="app">
    <div id="nav">
      <!-- admin -->
      <div class="admin">
        <router-link v-if="!loggedIn" class="router-link__admin" to="/login">Login</router-link>
        <router-link v-if="!loggedIn" class="router-link__admin" to="/register">Register</router-link>
        <a v-if="loggedIn" v-on:click="logOutUser" href="#">Logout</a>
      </div>
      <!-- everything else -->
      <div class="everything-else">
        <router-link class="router-link" to="/">Browse</router-link>
      <router-link v-if="loggedIn" class="router-link" to="/account">{{id}}</router-link>
      <router-link class="nav-link" to="/post">Post Listing</router-link>
      <router-link v-if="!loggedIn" class="nav-link" to="/account">My Account</router-link>
      </div>
    </div>
    <router-view />
    <!-- <my-footer></my-footer> -->
  </div>
</template>

<script>
import EventBus from "./eventBus";
export default {
  data: function() {
    return {
      loggedIn: "",
      id: ""
    };
  },
  methods: {
    logOutUser: function() {
      localStorage.loggedIn = "";
      //Local Storage can only set strings
      this.loggedIn = localStorage.loggedIn;
      this.$router.push({ path: "/" });
    }
  },
  created() {
    this.loggedIn = localStorage.loggedIn;
    this.id = localStorage.username;
    EventBus.$on("$loggedIn", () => {
      localStorage.loggedIn = "yes";
      this.loggedIn = localStorage.loggedIn;
      this.id = localStorage.username;
    });
  }
};
</script>

<style lang="scss">
@import "scss/variables";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-link {
  margin: 0 10px;
  color: white;
  &__admin {
    font-weight: 100;
    color: white;
    margin: 0 10px;
    font-size: 0.9em;
  }
}

.nav-link {
  color: white;
  background: $primary-shade;
  padding: 5px 10px;
  border-radius: 2px;
}

.admin {
  margin-bottom: 10px;
}

#nav {
  height: 100px;
  width: 100%;
  background-color: #455a6c;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  margin: 0 0 20px 0;
  padding: 20px;

  a {
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
