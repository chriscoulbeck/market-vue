<template>
  <div>
    <h2>My Items</h2>
    <ul>
      <div class="product" v-for="(product, index) in products" v-bind:key="index">
        <li>{{product.title}}</li>
        <router-link
          class="router-link"
          v-bind:to="{ name: 'Edit', params: { productId: product._id} }"
        >Edit</router-link>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts: function() {
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}users/${localStorage.userId}/products`
        )
        .then(function(data) {
          this.products = data.body;
        });
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style lang="scss">
li {
  list-style: none;
}
.product {
  display: flex;
}
</style>