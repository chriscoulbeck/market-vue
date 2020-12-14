<template>
  <main class="h-container">
    <!-- <div class="h-container__header">
      <h1>Beautifully crafted open source icons</h1>
      <p>Premium designed icons for use in web, iOS, Android, and desktop apps. Support for SVG and web font. Completely open source, MIT licensed and built by the Ionic Framework team.</p>
      <input type="text">
    </div> -->
    <div class="h-header">
      <div class="h-header__text">
        <h1>Marketplace</h1>
        <p>Kia ora, what can we help you find?</p>
      </div>
      <!-- <div class="h-header__query">
        <input style="padding: 10px 20px; width: 400px; font-size: 14px; border-radius: 6px;" type="text" placeholder="Search marketplace">
      </div> -->
    </div>
    <div class="body-container">
      <!-- <div class="filter">
        <h4 class="filter__header">Categories</h4>
        <ul class="filter-list">
          <li class="filter-list__item">Filter1</li>
          <li class="filter-list__item">Filter1</li>
          <li class="filter-list__item">Filter1</li>
          <li class="filter-list__item">Filter1</li>
          <li class="filter-list__item">Filter1</li>
          <li class="filter-list__item">Filter1</li>
          <li class="filter-list__item">Filter1</li>
          <li class="filter-list__item">Filter1</li>
        </ul>
      </div> -->
       <ul class="product-list">
      <productCard
        v-for="(product, index) in products"
        v-bind:key="index"
        :product="product"
      />
    </ul>
    </div>
  </main>
</template>

<script>
import ProductCard from "../components/ProductCard";

export default {
  components: {
    productCard: ProductCard,
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
    },
  },
  created: function() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
.h-container {
  height: 100%;
  padding-top: 90px;
  padding-left: 1em;
  padding-right: 1em;
}



.h-header {
  display: flex;
  // justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  max-width: 1000px;
  margin: auto;
  & h1 {
    font-weight: 500 !important;
    font-size: 1.8em;
    margin-bottom: .25em;
  }
  & p {
    font-size: 1em;
    color: rgb(113, 113, 113);
    font-weight: 400;
  }
}

.h-header__text {
  margin-bottom: 1em;
}

.body-container {
  display: flex;
  max-width: 1000px;
  padding: 50px 0;
  margin: auto;
}

.filter {
  width: 250px;
}

.filter__header {
  margin-bottom: 1em;
  font-weight: 500;
}

.filter-list__item {
  padding: 10px 15px;
  font-weight: 400;
  &:hover {
    background-color: rgba(226, 230, 235, 0.483);
  }
}

.product-list {
  display: flex;
  flex: 1;
  margin: auto;
  flex-wrap: wrap;
  
}






.home-header {
  font-size: 16px;
  padding: 10px;
  margin-bottom: 25px;
  & h1 {
    font-size: 2em;
    font-weight: 600;
    color: #21395a;
  }
  & p {
    color: #262e42;
  }
}

.page-section {
  display: flex;
  & div {
    margin: 10px;
  }
}

.input-field {
  display: flex;
  border: 1px solid #b3b5bd;
  align-items: center;
  border-radius: 3px;
  padding: 10px;
}

.listing-wrapper {
  padding: 10px;
  flex: 3;
  margin: auto;
  & form,
  input {
    width: 100%;
  }
}

.ion-icon {
  margin-right: 10px;
  color: rgb(90, 90, 90);
}

</style>
