<template>
  <div class="title-wrapper">
    <h2>Post</h2>
    <form class="title-form" v-on:submit.prevent="checkForm">
      <div class="title-flex">
        <!-- Listing title -->
        <div class="input-field">
          <label for="title">Listing title</label>
          <input
            v-model="product.title"
            type="text"
            name="title"
            id="titles"
            required
          />
        </div>

        <!-- Listing description -->
        <div class="input-field">
          <label for="description"> Description </label>
          <textarea
            v-model="product.description"
            maxlength="500"
            rows="5"
            type="details"
            name="description"
            id="titleD"
            required
          >
          </textarea>
        </div>

        <!-- Listing price -->
        <div class="input-field">
          <label for="price"> Price </label>
          <input
            v-model="product.price"
            maxlength="8"
            type="text"
            name="price"
            id="titles"
          />
        </div>

        <!-- Update button -->
        <input type="submit" value="Confirm" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: "",
      product: {
        title: "",
        price:"$",
        listed:"",
        username:"",
        details:"",
        description: ""

      },
    };
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.product.title) {
        this.errors.push("Title required!");
      }
      if (!this.errors.length) {
        this.postProduct(this.product);
      }
    },
    postProduct: function(product) {
      this.product.username = localStorage.user;
      this.$http.post(`${process.env.VUE_APP_API_URL}products`, product).then(
        (response) => {
          if (response.body) {
            this.$router.push({ path: "/" });
          }
        },
        (response) => {
          this.errors.push(response.body.message);
        }
      );
    },
  },
  created() {
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style lang="scss">
@import "../../scss/variables.scss";
@import "../../scss/main.scss";


h2 {
  font-size: 24px;
  margin-top: 20px;
  line-height: 2.7rem;
  font-weight: 500;
  padding-bottom: 15px;
}

.input-field {
  @include flex-direction(column);
  padding-bottom: 15px;
  & label {
    padding-bottom: 10px;
  }
  & input {
    padding: 10px;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 1em;
    border-radius: 2px;
    border: solid 1px $grey;
  }
}

input,
textarea {
  padding: 10px;
  border-radius: 2px;
  border: solid 1px $grey;
}

.title-wrapper {
  margin: auto;
  padding: 0 20px;
  max-width: 450px;
}

.title-form {
  border-radius: 6px;
}
.title-flex {
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 24px;
  font-weight: 300;
}

input[type="submit"] {
  font-size: 16px;
  font-weight: 500;
  border: none;
  background: $secondary;
  color: white;
  padding: 15px 0;
  &:hover {
    background: $secondary-tint;
    cursor: pointer;
  }
}
</style>
