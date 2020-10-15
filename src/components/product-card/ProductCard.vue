<template>
  <!-- main container -->
  <div class="product-card">
    <!-- image -->
    <img
      class="product-card__img"
      v-bind:src="'https://picsum.photos/200/300'"
    />

    <!-- Listing title -->
    <div class="product-card__copy">
      <router-link
        v-bind:to="{
          name: 'product-details',
          params: { productId: product._id },
        }"
        class="router-link product-card__title"
        >{{ product.title }}</router-link
      >
    <h5 class="product-card__price">${{ product.price }}</h5>
    </div>

    <!-- Listing price -->
  </div>
</template>

<script>
export default {
  name: "productCard",
  props: ["product"],
};
</script>

<style lang="scss">
@import "../../scss/variables";

.product-card {
  @include flex-direction(column);
  justify-content: space-around;
  margin: 10px;
  width: 250px;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  &__img {
    height: 200px;
    object-fit: cover;
    padding-bottom: 20px;
  }
  &__copy {
    @include flex-direction(column);
    align-items: flex-end;
    padding: 0 10px;
  }
  &__title {
    padding-bottom: 40px;
    color: $primary;
  }
  &__price {
    padding-bottom: 20px;
    margin-right: 10px;
    font-weight: 500;
    font-size: 1.2em;
    float: right;
  }
}
</style>
