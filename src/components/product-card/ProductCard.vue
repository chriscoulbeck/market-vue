<template>
        <!-- main container -->
        <div class="category__allBox">

          <!-- Image container -->
          <div class="category_allBoxImg">
          <img class="category__allImg" v-bind:src="'https://picsum.photos/200/300'" style="object-fit: cover;">
          </div>

          <!-- Listing location / date -->
          <div class="category__allListing">
            <h6 class="category__allLocation">{{ product.location }}</h6>
            <h6 class="category__allDate">{{ product.date }}</h6>
          </div>

          <!-- Listing title / details -->
          <div class="category__allDetails">
            <router-link v-bind:to="{name: 'product-details', params: {productId: product._id}}" class="router-link1">{{ product.title }}</router-link>
            <p class="category__allDescription">{{ product.details }}</p>
          </div>

          <!-- Listing price -->
          <h5 class="category__allPrice">{{ product.price }}</h5>
        </div>
</template>

<script>
export default {
    name: "productCard",
    props: ["product"],
    
}
</script>

<style lang="scss">

.router-link1 {
  display:inline-block;
  font-weight:bold;
  color: #333;
  text-decoration: none;
  width: 100%;
  padding-top: 10px;
  font-size: 20px;
  &:hover {
    color: #f6f6f6;
    background-color:#EB9836;
    width:100%;
  }
}
.category {
  text-align: center;
  display: flex;
  flex-direction: flex-start;
  justify-content: space-around;

  &__allBox {
    margin: 10px;
    width: 250px;
    background: #ffffff;
    border: 1px solid #c4c4c4;

      &__allBoxImg {
      height: 10px;
    }
  }
  &__allListing {
    display: flex;
    justify-content:space-evenly;
  }
  &__allLocation {
    margin: 8px;
  }

  &__allImg {
    width: 100%;
    height: 280px;
    background-size: cover;
  }

  &__allDate {
    color: #333;
    margin:8px;
  }

  &__allListing {
    display: flex;

  }
  &__allTitle {
    padding: 0;
    margin: 0;
  }
  &__allDescription {
    padding: 0;
    margin: 4%;
  }
  &__allPrice {
    display: flex;
    justify-content: center;
    padding-bottom: 8px;
    font-size:32px;
    font-weight: bold;
  }
}
</style>
