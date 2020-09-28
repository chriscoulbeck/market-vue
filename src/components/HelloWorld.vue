<template>
  <div class="hello">
    <h1>Welcome to the worlds most beautiful site</h1>
    <h3>All listings</h3>
    <ul>
      <div class="category">
        <all-listing-card v-for="(product, index) in products" v-bind:key="index" />
      </div>
    </ul>
    <!-- <button class="allButton">SEE MORE</button> -->
  </div>
</template>

<script>
import AllListingCard from "./AllListingCard.vue";

export default {
  components: {
    // "apple-listing-card": AppleListingCard,
    // "samsung-listing-card": SamsungListingCard,
    // "pc-listing-card": PcListingCard,
    "all-listing-card": AllListingCard
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
    console.log(this.products);
  }
};

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-family: SeoulNamsan CL;
  font-style: normal;
  font-weight: normal;
  font-size: 52px;
  line-height: 52px;
}
h3 {
  // margin-left: 7%;
  padding-left: 10%;
  text-align: left;
  font-size: 24px;
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
  margin-left: 5%;
  margin-right: 5%;
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
    margin-left: 10%;
    margin-right: 10%;
  }
  h3 {
    margin-left: 15%;
  }
}

@media only screen and (max-width: 775px) {
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
    margin: 0;
    font-size: 30px;
    padding: 30px;
  }
  h3 {
    text-transform: uppercase;
    display: inline;
    text-align: center;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid;
    // width: 50%;
  }
}
</style>
