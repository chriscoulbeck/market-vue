<template>

<div class="log-in-container">
  <form @submit.prevent="checkForm">
    <div class="log-in-header">
      <h2>Log In</h2>
    </div>

    <div class="input-field">
      <input id="email" name="email" v-model="user.email" type="email" placeholder="Email">
      <p v-if="errors.length" class="input-error">{{errorMessage}}</p>
    </div>
    <input type="submit" value="Log In">
     <div class="login-flex">
      <p>Don't have an account?</p>
      <router-link class="router-link" to="/register">Register Now</router-link>
    </div>
  </form>
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

<style lang="scss">
@import "../../scss/variables";

.log-in-container {
  @include flex-direction(column);
  flex-basis: 100px;
  max-width: 500px;
  margin: auto;
  padding: 40px 30px;
  & input[type="submit"] {
    width: 100%;
    background: $secondary;
    padding: 12px;
    color: $off-white;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    margin-bottom: 30px;
    cursor: pointer;
    &:hover {
      background: $secondary-tint;
    }
  }
}

.login-flex {
  @include flex-direction(row);
  align-items: flex-start;
  & p {
    margin-right: 10px;
  }
}

h2 {
  font-weight: 500;
  padding-bottom: 20px;
  font-size: 22px;
}

label {
  font-size: 16px;
}

.input-field {
  @include flex-direction(column);
  padding-bottom: 10px;
  & label {
    padding-bottom: 10px;
  }
  & input {
    padding: 12px 15px;;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 1em;
    border-radius: 2px;
    border: solid 1px $grey;
  }
  p {
    margin-bottom: 10px;
  }
}

.log-in-header {
  @include flex-direction(row);
  justify-content: space-between;
  align-items: center;
}

.input-error {
  font-weight: 300;
  color: rgb(240, 99, 99);
}


@media (max-width: 500px) {


.login-flex {
  @include flex-direction(column);
  align-items: center;
  & p {
    margin-right: 0;
    margin-bottom: 10px;
  }
}


}
</style>
