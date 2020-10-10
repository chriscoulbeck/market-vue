<template>
  <div id="app">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="./assets/images/logo.png"
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
            <a class="logout" href="#" v-if="loggedIn" @click="logOutUser">Log out</a>
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
      EventBus.$emit("$loggedOut");

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

.navbar-menu {
  background-color: $primary-shade;
  height: 60px;
}

.navbar-brand {
  background-color: $primary-shade;
  height: 60px;
  padding-left: 15px;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar-admin {
  @include flex-direction(row);
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  background: $off-white;
  font-size: 0.8em;
}

.logout {
  color: $secondary;
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
    color: $secondary-tint;
  }
}

.router-link {
  margin: 0 10px;
  font-weight: lighter;
  color: $off-white;
  &:hover {
    text-decoration: underline;
    color: $secondary-tint;
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

  .logout {
    text-decoration: none;
    color: $off-white;

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
.burger {
  color: $light-grey !important;
  height: 3.7rem !important;
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
  .router-link {
  margin: 2px 10px;
  font-weight: lighter;
  color: $primary-shade;
  &:hover {
    text-decoration: underline;
    color: $secondary-tint;
  }
}
.navbar-menu {
  height: 110px !important;
}
}
</style>
