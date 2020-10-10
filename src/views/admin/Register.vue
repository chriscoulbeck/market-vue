<template>
  <section>
      <form @submit.prevent="checkForm">
        <b-field class="test" label="Firstname">
          <b-input v-model="user.firstname" type="text" placeholder="Your email" required></b-input>
        </b-field>
        <b-field class="test" label="Lastname">
          <b-input v-model="user.lastname" type="text" placeholder="Your email" required></b-input>
        </b-field>
        <b-field class="test" label="Username">
          <b-input v-model="user.username" type="text" placeholder="Your email" required></b-input>
        </b-field>
        <b-field class="test" label="Email">
          <b-input v-model="user.email" type="email" placeholder="Your email" required></b-input>
        </b-field>
        <b-button expanded tag="input" native-type="submit" type="is-primary" value="Submit input" />
      </form>
  </section>
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
@import "../../scss/bulma";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

section {
  @include flex-direction(column);
  align-items: center;
  justify-content: center;
  flex-basis: 100px;
  max-width: 400px;
  margin: auto;
}

h1 {
  margin: 0 0 10px 0;
  font-size: 1.4em;
}

form {
  @include flex-direction(column);
  // align-items: flex-start;
  width: 100%;
  padding: 10px;
  
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
</style>
