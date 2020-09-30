<template>
  <div>
      <form v-on:submit.prevent="checkForm">
      <div>
        <label for="title">Title</label>
        <input v-model="product.title" type="text" name="title" id="title" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        title: null
      }
    };
  },
  methods: {
    checkForm: function() {
      // finally, a set of if statements determine which, if any, inputs aren't filled out and add the corresponding error message to the array of error messages in the data object
      this.errors = [];
      if (!this.product.title) {
        this.errors.push("Title Required");
      }
      this.editProduct(this.product);
    },
    editProduct: function(product) {
      this.$http
        .put(
          `${process.env.VUE_APP_API_URL}products/${this.$route.params.productId}`,
          product
        )
        .then(function() {
          this.$router.push({ path: "/account" });
        });
    }
  },
  created() {
    if (this.$route.params.productId) {
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}products/${this.$route.params.productId}`
        )
        .then(function(data) {
          this.product = data.body;
        });
    }
  }
};
</script>

<style lang="scss">
</style>