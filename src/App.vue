<template>
  <div id="app">
       <header>
      <nav>
        <router-link class="router-link" to="/">Home</router-link>
          <div>
            <router-link v-if="!loggedIn" class="router-link" to="/login">Sign in</router-link>
            <router-link v-if="loggedIn" class="router-link" to="/post">List an Item</router-link>
            <router-link v-if="loggedIn" class="router-link" to="/account">My Items</router-link>
            <a class="router-link" href="#" v-if="loggedIn" @click="logOutUser">Sign out</a>
          </div>
      </nav>
    </header>
    
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
      EventBus.$emit("$loggedOut");
      this.$router.push({ path: "/" });
    },
    toggleUser: function() {
      const dropDown = document.querySelector(".dropdown-menu");
      dropDown.classList.contains("is-hidden") ? dropDown.classList.remove("is-hidden")
      : dropDown.classList.add("is-hidden");
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
  },
};
</script>

<style lang="scss">
@import "scss/variables";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: gibson, sans-serif;
  font-style: normal;
}

#app {
  font-family: canada-type-gibson, sans-serif;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  @include flex-direction(row);
  align-items: center;
  background: $primary;
  height: 60px;
  margin-bottom: 50px;
}

nav {
  @include flex-direction(row);
  justify-content: space-between;
  width:100%;
  & :first-child {
    margin-left: 25px;
  }
  & :last-child {
    margin: 0 25px;
  }
}

.user-dropdown {
  position: relative;
}

.dropdown-menu {
  @include flex-direction(column);
  position: absolute;
  right: 0px;
  top: 5px;
  border: 1px solid $grey;
  width: 200px;
  background: $off-white;
  margin-top: 25px;
  padding: 5px 0;
  border-radius: 2px;
}

.dropdown-item {
  padding: 12px;
  font-size: 14px;
  &:hover {
    background: $light-grey;
  }
}

.dropdown-divider {
  border-bottom: 1px solid $grey;
  margin: 5px;
}

.is-hidden {
  display: none;
}

.logout {
  color: $secondary;
  margin: 0 10px;
  &:hover {
    text-decoration: underline;
    color: $secondary-tint;
  }
}

a {
  text-decoration: none;
  color: $dark-grey;
}

.router-link {
  margin: 0 10px;
  font-weight: lighter;
  color: $grey;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.5px;
  &:hover {
    text-decoration: underline;
    color: $secondary-tint;
  }
}
</style>
