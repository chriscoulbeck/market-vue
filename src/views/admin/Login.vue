<template>
  <div class="section">
    <div class="container">
      <form @submit.prevent="checkForm">
        <b-field class="test" label="Log in">
          <b-input v-model="user.email" type="email" placeholder="Your email" required></b-input>
        </b-field>
        <b-button expanded tag="input" native-type="submit" type="is-primary" value="Submit input" />
      </form>
    </div>
  </div>
</template>

<script>
import EventBus from "../../eventBus";
// the event bus is imported here so that this file knows about it and can listen to or emit events on the bus
// import EventBus from "../../eventBus.js";
export default {
  name: "login",
  data: function() {
    return {
      user: {
        // the email from the input is bound to this property, they are always going to be the same
        email: ""
      },
      errors: []
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
            if (this.$route.path == "/login") {
              this.$router.push({ path: "/" });
            }
          }
        },
        function(response) {
          //error callback
          this.errors.push(response.body);
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/bulma";

h1 {
  display: inline-block;
}

.section {
  margin: auto;
}

.container {
  flex-basis: 100px;
  max-width: 400px;
  margin: auto;
}

form {
  @include flex-direction(column);
}
</style>
