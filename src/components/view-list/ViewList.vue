<template>
  <div class="hello">
    <h1>It's trade time baby.</h1>
    <h3>All listings</h3>
    <ul>
      <div class="category">
        <productCard v-for="(product, index) in products" v-bind:key="index" :product="product" />
      </div>
    </ul>
    <!-- <button class="allButton">SEE MORE</button> -->
  </div>
</template>

<script>
import ProductCard from "../product-card/ProductCard";

export default {
  components: {
    "productCard": ProductCard
  },
  
  data: function() {
    return {
      products: [],
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

.hello {
  margin: 0 10%;;
}

h1 {
  font-style: normal;
  font-weight: normal;
  font-size: 42px;
  line-height: 52px;
  margin-top:60px;
  margin-bottom:40px;
}
h3 {
  // display:inline;
  font-size: 24px;
  text-transform: uppercase;
  border-bottom: 1px solid;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.category {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
button {
  color: #f2f2f2;
  background-color: #333;
  padding: 15px;
  border: none;
}

@media only screen and (max-width: 1150px) {
  .category {
    display: flex;
  }
}

@media only screen and (max-width: 1028px) {
  .category {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
  }

  button {
    color: #f2f2f2;
    background-color: #333;
    padding: 15px;
    margin-bottom: 60px;
    border: none;
  }
  h1 {
    text-align: center;
    font-size: 34px;
    // padding: 30px;
  }
  h3 {
    display: flex;
    justify-content:center;
  }
}
</style>
