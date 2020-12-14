<template>
  
  
  
  
  
   <main class="post-container">
      <div class="post-form">
        <h4 class="post-form__header">Register</h4>
         <span class="register-link">Already registered? <router-link to="/login" class="register-link--router">Sign in</router-link></span>
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
        <!-- <div class="input-field">
          <label for="username-field">Username</label>
          <input 
            type="text"
            name="username"
            id="username-field"
            v-model="user.username"
          />
        </div> -->
          <div class="input-field">
            <label for="password-field">Password</label>
            <input
              type="password"
              name="password"
              id="password-field"
              v-model="user.password"
            />
          </div>
          <button class="btn--submit" type="submit">Sign Up</button>
         
        </form>
      </div>
    </main>
  
  
  
  
  
  
  
  
  
  <!-- <main class="form-body">
    <div class="form-container">
      <h4>Register</h4>
      <form @submit="checkForm" action="">

        <div class="input-field" style="margin-right: .35em;">
          <label for="firstname-field">Firstname</label>
          <input 
            type="text"
            name="firstname"
            id="firstname-field"
            v-model="user.firstname"
          />
        </div>
        <div class="input-field" style="margin-left: .35em;">
          <label for="username-field">Username</label>
          <input 
            type="text"
            name="username"
            id="username-field"
            v-model="user.username"
          />
        </div>

      <div class="input-field">
          <label for="email-field">Email</label>
          <input
            type="email"
            name="email"
            id="email-field"
            v-model="user.email"
          />
      </div>
      <button class="btn--submit" type="submit">Register</button>
    </form>
    </div>
  </main> -->
</template>

<script>
import EventBus from "../../eventBus";
export default {
  data: function() {
    return {
      user: {
        // s
        // lastname: "",
        // username: "",
        email: "",
      },
      errors: [],
    };
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      // if (!this.user.firstname) {
      //   this.errors.push("First name required!");
      // }
      // if (!this.user.lastname) {
      //   this.errors.push("Last name required");
      // }
      // if (!this.user.username) {
      //   this.errors.push("Username required");
      // }
      if (!this.user.email) {
        this.errors.push("Email required");
      }
      if (!this.errors.length) {
        this.registerUser(this.user);
        console.log(localStorage);
      }
    },
    registerUser: function(user) {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}users/`, user)
        // .then takes two params, a success callback and an error callback
        .then(
          (response) => {
            if (response.body) {
              localStorage.loggedIn = "yes";
              localStorage.user = user.email;
              localStorage.username = user.username;
              localStorage.firstname = user.firstname;
              // localStorage.lastname = user.lastname;
              EventBus.$emit("$loggedIn");
              this.$router.push({ path: "/" });
            }
          },
          (response) => {
            this.errors.push(response.body.message);
          }
        );
    },
  },
};
</script>

<style lang="scss" >
@import "../../scss/variables";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



</style>
