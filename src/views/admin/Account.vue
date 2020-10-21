<template>
  <div>
    <div class="edit-wrapper">
      <h2>Your Items</h2>
      <ul>
        <!-- Activity / Title -->
        <div
          class="product"
          v-for="(product, index) in products"
          v-bind:key="index"
        >
          <li class="product-title">{{ product.title }}</li>
          <div class="product-links">
            <router-link
              class="product-link"
              v-bind:to="{ name: 'Edit', params: { productId: product._id } }"
              >Edit</router-link
            >
            <a
              href
              class="product-link"
              v-on:click.prevent="deleteProduct(product._id)"
              >Delete</a
            >
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      loggedIn: "",
    };
  },
  methods: {
    deleteProduct: function(productId) {
      this.$http
        .delete(`${process.env.VUE_APP_API_URL}products/${productId}`)
        .then(function() {
          this.getProducts();
        });
    },

    getProducts: function() {
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}users/${localStorage.userId}/products`
        )
        .then(function(data) {
          this.products = data.body;
        });
    },
  },
  created() {
    this.getProducts();
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

h2 {
  font-weight: 500;
}

.product-links {
  @include flex-direction(row);
}

.product-link {
  margin-left: 20px;
  &:hover {
    color: $secondary;
    text-decoration: underline;
  }
}

.edit-wrapper {
  margin: auto;
  padding: 0 20px;
  max-width: 800px;
}

.product-title {
  margin-right: 15px;
  font-size: 20px;
}

.banner {
  background: grey;
}

.product {
  @include flex-direction(row);
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  padding: 9px 0;
  border-radius: 3px;
  border-bottom: 1px solid $grey;
}

li {
  list-style: none;
}

@media (max-width: 700px) {
  .product-links {
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
}
</style>
