<template>
  <div>
    <h1>Register User</h1>

    <form v-on:submit.prevent="checkForm">
      <!-- error display -->
      <div v-if="errors.length">
        <p>
          <b>Please correct the following this.errors:</b>
        </p>
        <ul v-for="(error, index) in errors" v-bind:key="index">
          <li>{{error}}</li>
        </ul>
      </div>
      <div class="input-field">
        <label for="firstname">First Name</label>
        <input v-model="user.firstname" type="text" name="firstname" id="firstname" />
      </div>
      <div class="input-field">
        <label for="lastname">Last Name</label>
        <input v-model="user.lastname" type="text" name="lastname" id="lastname" />
      </div>
      <div class="input-field">
        <label for="username">Username</label>
        <input v-model="user.username" type="text" name="username" id="username" />
      </div>
      <div class="input-field">
        <label for="email">Email</label>
        <input v-model="user.email" type="text" name="email" id="email" />
      </div>
      <div>
        <input type="submit" value="Register" />
      </div>
    </form>
  </div>
</template>

<script>
import EventBus from "../../eventBus";
export default {
  data: function() {
    return {
      user: {
        firstname: "",
        lastname: "",
        username: "",
        email: ""
      },
      errors: []
    };
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.user.firstname) {
        this.errors.push("First name required!");
      }
      if (!this.user.lastname) {
        this.errors.push("Last name required");
      }
      if (!this.user.username) {
        this.errors.push("Username required");
      }
      if (!this.user.email) {
        this.errors.push("Email required");
      }
      if (!this.errors.length) {
        this.registerUser(this.user);
      }
    },
    registerUser: function(user) {
      this.$http
        .post(`${process.env.VUE_APP_API_URL}users`, user)
        // .then takes two params, a success callback and an error callback
        .then(
          response => {
            if (response.body) {
              localStorage.loggedIn = "yes";
              localStorage.user = user.email;
              localStorage.userId = user.username;
              EventBus.$emit("$loggedIn");
              this.$router.push({ path: "/" });
            }
          },
          response => {
            this.errors.push(response.body.message);
          }
        );
    }
  }
};
</script>

<style lang="scss">
@import "../../scss/variables";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  padding-bottom: 50px;
}

form {
  @include flex-direction(column);
  // align-items: flex-start;
  margin: auto;
  max-width: 400px;
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
