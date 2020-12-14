<template>


    <ul>
      <productCard v-for="(product, index) in products" v-bind:key="index" :product="product" />
    </ul>
</template>

<script>
import ProductCard from "../product-card/ProductCard";

export default {
  components: {
    productCard: ProductCard
  },

  data: function() {
    return {
      products: []
    };
  },

  methods: {
    getProducts: function() {
      this.$http
        .get(`${process.env.VUE_APP_API_URL}products`)
        .then(function(data) {
          this.products = data.body;
        });
    }
  },
  created: function() {
    this.getProducts();
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../scss/variables.scss";



</style>
