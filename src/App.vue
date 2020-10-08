<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div" class="test-class">
          <div class="buttons">
            <router-link v-if="!loggedIn" class="router-link" to="/register">Register</router-link>
            <router-link v-if="!loggedIn" class="router-link" to="/login">Log in</router-link>
            <router-link v-if="loggedIn" class="router-link" to="/post">List Item</router-link>
            <router-link v-if="loggedIn" class="router-link" to="/account">My Items</router-link>
            <a href="#" v-if="loggedIn" @click="logOutUser">Log out</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}

.navbar-admin {
  @include flex-direction(row);
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  background: $off-white;
  font-size: 0.8em;
}

a {
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
  }
}

.router-link {
  margin: 0 10px;
  font-weight: lighter;
  &:hover {
    text-decoration: underline;
  }
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

.mobile {
  display: flex;
}

// MEDIA QUERIES
@media (max-width: 1018px) {
  .mobile {
    display: none;
  }
  .buttons {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
