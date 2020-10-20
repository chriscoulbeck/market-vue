<template>

<div class="register-container">
  <form @submit.prevent="checkForm">
    <div class="log-in-header">
      <h2>Register</h2>
    </div>
    <div class="input-field">
      <input id="firstname" name="firstname" v-model="user.firstname" type="text" placeholder="Firstname">
      <p v-if="errors.length" class="input-error">{{errorMessage}}</p>
    </div>
    <div class="input-field">
      <input id="lastname" name="lastname" v-model="user.lastname" type="text" placeholder="Lastname">
      <p v-if="errors.length" class="input-error">{{errorMessage}}</p>
    </div>
    <div class="input-field">
      <input id="username" name="username" v-model="user.username" type="text" placeholder="Username">
      <p v-if="errors.length" class="input-error">{{errorMessage}}</p>
    </div>
    <div class="input-field">
      <input id="email" name="email" v-model="user.email" type="email" placeholder="Email">
      <p v-if="errors.length" class="input-error">{{errorMessage}}</p>
    </div>
    <input type="submit" value="Register">
    <div class="register-flex">
      <p>Already have an Account?</p>
      <router-link class="router-link register-link" to="/login">Log in</router-link>
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
              localStorage.username = user.username;
              localStorage.firstname = user.firstname;
              localStorage.lastname = user.lastname;
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

<style lang="scss" scoped>
@import "../../scss/variables";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.register-container {
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

.register-flex {
  @include flex-direction(row);
  justify-content: flex-start;
  & p {
    margin-right: 10px;
  }
}

h2 {
  font-weight: 500;
  padding-bottom: 20px;
  font-size: 22px;
}

.input-field {
  @include flex-direction(column);
  padding-bottom: 10px;
  & label {
    padding-bottom: 10px;
  }
  & input {
    padding: 12px 15px;
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

section {
  @include flex-direction(column);
  align-items: center;
  justify-content: center;
  flex-basis: 100px;
  max-width: 400px;
  margin: auto;
}

@media (max-width: 500px) {


.register-flex {
  @include flex-direction(column);
  align-items: center;
  & p {
    margin-right: 0;
    margin-bottom: 10px;
  }
}

}
</style>
