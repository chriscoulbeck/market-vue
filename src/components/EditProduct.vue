<template>
  <main class="post-container">
      <div class="post-form">
        <h4 class="post-form__header">Update listing</h4>
         <!-- <span class="register-link">Already registered? <router-link to="/login" class="register-link--router">Sign in</router-link></span> -->
        <form @submit="checkForm" action="">
          <div class="input-field">
            <label for="title-field">Listing Title</label>
            <input
              type="text"
              name="title"
              id="title-field"
              v-model="product.title"
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
            <label for="price-field">Price</label>
            <input
              type="text"
              name="price"
              id="price-field"
              v-model="product.price"
            />
          </div>
          <div class="input-field">
          <label for="desc-field">Listing description</label>
          <textarea
            name="desc"
            id="desc-field"
            cols="30"
            rows="5"
            v-model="product.desc"
          ></textarea>
        </div>
          <button class="btn--submit" type="submit">Update listing</button>
         
        </form>
      </div>
    </main>
</template>

<script>
export default {
  data() {
    return {
      product: {
        title: null,
        desc: null,
        price: null,
        details: null,
        location: null,
        date: null,
      },
    };
  },
  methods: {
    checkForm: function() {
      this.errors = [];
      if (!this.product.title) {
        this.errors.push("Title Required");
      } else if (!this.product.desc) {
        this.errors.push("Title Required");
      } else if (!this.product.price) {
        this.errors.push("Title Required");
      } else {
        this.editProduct(this.product);
      }
    },
    editProduct: function(product) {
      this.$http
        .put(
          `${process.env.VUE_APP_API_URL}products/${this.$route.params.productId}`,
          product
        )
        .then(function() {
          this.$router.push({ path: "/" });
        });
    },
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
  },
};
</script>

<style lang="scss">
@import "../scss/variables";


</style>
