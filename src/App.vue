<template>
  <div id="app">
    <div id="nav">
      <router-link class="router-link" to="/">Home</router-link>
      <router-link v-if="!loggedIn" class="router-link" to="/register">Register</router-link>
      <router-link v-if="loggedIn" class="router-link" to="/account">{{id}}</router-link>
      <router-link v-if="!loggedIn" class="router-link" to="/login">Login</router-link>
      <router-link class="router-link" to="/post">Post Listing</router-link>
      <a v-if="loggedIn" v-on:click="logOutUser" href="#">Logout</a>
    </div>
    <router-view/>
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
    this.id = localStorage.userId;
    EventBus.$on("$loggedIn", () => {
      localStorage.loggedIn = "yes";
      this.loggedIn = localStorage.loggedIn;
      this.id = localStorage.userId;
    })
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
}

.router-link {
  margin: 0 10px;
  color: #fff;
}

#nav {
  height:60px;
  width: 100%;
  background-color: #455A6C;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;


  a {
    font-weight: bold;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
