<template>
  <div>
    <form v-on:submit.prevent="checkForm">
      <div class="input-field">
        <label for="title">Title</label>
        <input v-model="product.title" type="text" name="title" id="title" />
      </div>
      <div>
        <input type="submit" value="Post" />
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

<style></style>
