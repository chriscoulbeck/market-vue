<template>
  <section class="log-in-container">
    <div class="form-wrapper">
      <h1>Log In</h1>
      <form v-on:submit.prevent="checkForm">
        <!-- error display, this iterates through all the errors present in the error display and shows them. If there are none it doesn't render at all. -->
        <div v-if="errors.length">
          <ul v-for="(error, index) in errors" v-bind:key="index">
            <li>{{ error }}</li>
          </ul>
        </div>
        <!-- this is the email field, which is bound to the email property in the data object via v-model -->
        <div class="input-field">
          <label for="email">Email</label>
          <input v-model="user.email" type="text" name="email" id="email" />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
        <router-link class="router-link" to="/register">Register</router-link>
      </form>
    </div>
  </section>
</template>

<script>
import EventBus from "../../eventBus";
// the event bus is imported here so that this file knows about it and can listen to or emit events on the bus
// import EventBus from "../../eventBus.js";
export default {
  data: function() {
    return {
      user: {
        // the email from the input is bound to this property, they are always going to be the same
        email: "",
      },
      errors: [],
    };
  },
  methods: {
    // this method uses an if statement to determin if the data entered in the form is valid, and if there are errors pushes them to the errors array where they will be displayed by the template
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("Email required");
      }
      // if no errors then log the user in
      if (!this.errors.length) {
        this.loginUser(this.user);
      }
    },
    // this method logs in the user by sending a post request to the api, which responds with the user whose email is submitted if valid
    // variables in localStorage are set that store the user id, email, and the current state of being logged in
    loginUser(user) {
      this.$http.post(`${process.env.VUE_APP_API_URL}users/login`, user).then(
        function(res) {
          if (res.body.email) {
            localStorage.loggedIn = "yes";
            localStorage.user = user.email;
            // if the user is returned due to a valid email, and once the variables are saved in local storage, the eventbus is instructed to emit an event, which any other components can listen for and react too
            // EventBus.$emit("$loggedIn");
            EventBus.$emit("$loggedIn");
            this.$router.push({ path: "/" });
          }
        },
        function(response) {
          //error callback
          this.errors.push(response.body);
        }
      );
    },
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

h1 {
  display: inline-block;
}

section {
  display: flex;
  align-items: center;
  height: 100vh;
  & h1 {
    margin: 0 0 10px 0;
    font-size: 1.4em;
  }
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 500px;
  margin: auto;
  padding: 10px;

}

form {
  width: 100%;
}

.input-field {
  @include flex-direction(column);
  align-items: flex-start;
  & label {
    padding-bottom: 2px;
  }
  & input {
    padding: 7px 0;
    margin-bottom: 10px;
    width: 100%;
  }
}

input[type="submit"] {
  margin-top: 5px;
  padding: 10px;
  width: 100%;
}
</style>
