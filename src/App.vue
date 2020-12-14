<template>
  <div id="app">
    <div class="app-container">
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet"
      />
      <header class="n-header">
        <div class="n-main-navigation">
          <router-link style="font-weight:600;" to="/">
            Marketplace
          </router-link>
          <div class="nav-links">
            <router-link class="router-link--nav" to="/post">List an Item</router-link>
            <router-link v-if="loggedIn" class="router-link--nav" to="/account"
              >My Items</router-link
            >
            <router-link v-if="!loggedIn" class="router-link--nav" to="/login"
              >Sign in</router-link
            >
            <a class="router-link--nav" href="#" v-if="loggedIn" @click="logOutUser"
              >Sign out</a
            >
          </div>
        </div>
        <!-- <div class="n-header-header">
          <h1>Marketplace</h1>
          <p>
            Calculate your high school, college and cumulative GPA, check your
            grades and understand how the GPA scale works.
          </p>
        </div> -->
      </header>

      <!-- <header class="app-header">
        <nav class="app-navigation">
          <router-link class="router-link" to="/">Marketplace</router-link>
          <div class="app-navigation__group">
            <router-link v-if="!loggedIn" class="router-link" to="/login"
              >Sign in</router-link
            >
            <router-link v-if="loggedIn" class="router-link btn--link" to="/post"
              >List an Item</router-link
            >
            <router-link v-if="loggedIn" class="router-link" to="/account"
              >My Items</router-link
            >
            <a class="router-link" href="#" v-if="loggedIn" @click="logOutUser"
              >Sign out</a
            >
          </div>
        </nav>
      </header> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import EventBus from "./eventBus";

// Buefy Modal

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
      dropDown.classList.contains("is-hidden")
        ? dropDown.classList.remove("is-hidden")
        : dropDown.classList.add("is-hidden");
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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-style: normal;
}

// Brand New Stuff

.n-header {
  // background: rgba(0, 0, 255, 0.233);
  padding: 1.25rem 0;
  // max-width: 1200px;
  margin: auto;
  // border-bottom: 1px solid #ddd;
  border-radius: none;
  display: flex;
}

.n-header-header {
  & h1 {
    font-size: 2.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
}

.n-btn {
  border: none;
  background-color: #ebedf1;
  padding: 0.6rem 1.5rem;
  color: rgb(79, 79, 118);
  font-weight: 600;
  font-size: 13px;
  border-radius: 3px;
  margin: 0 1.5rem;
  &:hover {
    cursor: pointer;
    background-color: #dde0e7;
  }
}

.n-main-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;
  width: 1100px;
  margin: auto;
}

.nav-links {
  display: flex;
  align-items: center;
}
// End of Brand New Stuff

#app {
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}

html {
  font-family: "Inter", sans-serif;
}

body {
  background: #fafafa;
  color: 21395a;
}

.app-container {
  margin: auto;
  height: 100vh;
}

.app-header {
  display: flex;
  align-items: center;
  height: 10vh;
  margin-bottom: 25px;

  // background-color: rgb(75, 98, 129);
}

.app-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  & .router-link {
    margin: 0 10px;
  }
  &__group {
    display: flex;
  }
}

p {
  line-height: 24px;
}

ul {
  & li {
    list-style: none;
    margin: 5px 0;
    border-radius: 5px;
  }
}

input,
textarea {
  display: block;
  border: 1px solid rgb(199, 199, 199);
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 3px;
  color: rgb(43, 43, 43);
  width: 100%;
  outline: none;
  background-color: #fafafa;
  &:focus {
    border-color: #3273dc;
    border: 1px solid #3273dc;
    box-shadow: 0 0 0 0.125em #c1d4f3;
  }
}

.btn--submit {
  padding: 12px;
  width: 100%;
  background-color: rgb(40, 76, 159);
  color: #fafafa;
  border-radius: 3px;
  border: none;
  outline: none;
  // width: 100%;
  font-weight: 600;
  font-size: 14px;
  margin: 1rem 0;
  font-family: "Inter", sans-serif;
  &:hover {
    background-color: rgb(46, 83, 204);
    cursor: pointer;
  }
}

.router-link {
  font-weight: 400;
  color: #262e42;
  font-size: 14px;
  &--nav {
    font-weight: 600;
    color: #262e42;
    font-size: 14px;
    margin-right: 1.5em;
  }
}

a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.btn--link {
  background-color: rgb(119, 119, 208);
  padding: 5px 20px;
  border-radius: 4px;
  font-weight: 600;
  letter-spacing: 0.5px;
  font-size: 12px;
  color: rgb(0, 68, 255);
}

// New MQ

@media (max-width: 1200px) {
  .app-container {
    padding-top: 0rem;
  }
}

.post-container {
  
  height: 90vh;
}

.post-form {
  // margin: auto;
  max-width: 400px;
  padding-top: 110px;
  padding-left: 1em;
  padding-right: 1em;
  width: 100%;
  margin: auto;
  & h4 {
    font-weight: 600;
    margin-bottom: 1rem;
    font-size: 26px;
    color: rgb(38, 47, 61);
  }
}

.input-field {
  margin: 1rem 0;
}

label {
  margin-bottom: 0.8rem;
  font-weight: 600;
  font-size: 14px;
  display: inline-block;
}

span {
  display: block;
  font-size: 12px;
  margin-top: 5px;
}

.register-link {
  display: flex;
}

.register-link {
  font-size: 15px;
  font-weight: 500;
  &--router {
    font-size: 15px;
    text-decoration: underline;
    color: blue;
    margin-left: .5em;
  }
}

// End of New MQ
</style>
