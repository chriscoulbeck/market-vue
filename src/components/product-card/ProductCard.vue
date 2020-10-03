<template>
        <div class="category__allBox">
          <img class="category__allImg" v-bind:src="'https://picsum.photos/200/300'">
          <div class="category__allListing">
            <h6 class="category__allLocation">{{ product.location }}</h6>
            <h6 class="category__allDate">{{ product.date }}</h6>
          </div>
          <div class="category__allDetails">
            <router-link v-bind:to="{name: 'product-details', params: {productId: product._id}}" class="router-link">{{ product.title }}</router-link>
            <p class="category__allDescription">{{ product.description }}</p>
          </div>
          <h2 class="category__allPrice">{{ product.price }}</h2>
        </div>
</template>

<script>
export default {
    name: "productCard",
    props: ["product"],
    
}
</script>

<style lang="scss">
.category {
  display: flex;
  flex-direction: row;
  justify-content: center;

  &__allBox {
    margin: 10px;
    width: 20%;
    height: 100%;
    background: #ffffff;
    border: 1px solid #c4c4c4;
  }
  &__allImg {
    width: 100%;
    height: 197px;
  }
  &__allListing {
    display: flex;
    justify-content: space-evenly;
  }
  &__allTitle {
    padding: 0;
    margin: 0;
  }
  &__allDescription {
    padding: 0;
    margin: 0;
  }
  &__allPrice {
    display: flex;
    flex-direction: row-reverse;
    margin-right: 20px;
  }
  @media only screen and (max-width: 1266px) {
    .category {
      display: flex;
      flex-direction: column;
      &__allBox {
        width: 250px;
        height: 100%;
      }
    }
  }
  @media only screen and (max-width: 1060px) {
    .category {
      display: flex;
      flex-direction: column;
      &__allBox {
        width: 250px;
        height: 100%;
      }
    }
  }
  @media only screen and (max-width: 627px) {
    .category {
      &__allBox {
        width: 250px;
        height: 100%;
      }
    }
  }
  @media only screen and (max-width: 576px) {
    .category {
      &__allBox {
        width: 230px;
      }
    }
  }
  @media only screen and (max-width: 537px) {
    .category {
      &__allBox {
        width: 210px;
        height: 100%;
      }
    }
  }
}
</style>
