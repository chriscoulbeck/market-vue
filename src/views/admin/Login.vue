<template>
  <!-- Sign in Component -->
   <main class="post-container">
      <div class="post-form">
        <h4 class="post-form__header">Sign in</h4>
         <span class="register-link">New Here? <router-link to="/register" class="register-link--router">Create an account</router-link></span>
        <form @submit="checkForm" action="">
          <div class="input-field">
            <label for="title-field">Email</label>
            <input
              type="email"
              name="email"
              id="email-field"
              v-model="user.email"
            />
          </div>
          <div class="input-field">
            <label for="password-field">Password</label>
            <input
              type="password"
              name="password"
              id="password-field"
              v-model="user.password"
            />
          </div>
          <button class="btn--submit" type="submit">Sign in</button>
         
        </form>
      </div>
    </main>
</template>

<script>
import EventBus from "../../eventBus";
export default {
  name: "login",
  data: function() {
    return {
      user: {
        // the email from the input is bound to this property, they are always going to be the same
        email: "",
        password: ""
      },
      errors: [],
      errorMessage: "" 
    };
  },
  methods: {
    // this method uses an if statement to determin if the data entered in the form is valid, and if there are errors pushes them to the errors array where they will be displayed by the template
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("Email required");
        this.errorMessage = "Please enter an email address";
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
          this.errorMessage = "User not found";
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../scss/variables";





</style>
