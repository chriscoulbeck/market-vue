<template>
  <li class="n-card">
    <div class="n-card__media">
      <img src="../assets/images/laptop.jpg" />
    </div>
    
    <div class="n-card__text">
      <p class="router-link n-card__title">{{product.title}}</p>
      <!-- <router-link
        
        class="router-link n-card__title"
        >{{ product.title }}</router-link
      > -->
      <!-- <p class="n-card__desc">{{product.desc}}</p> -->
      <p class="n-card__price">${{ product.price }}</p>
    </div>
  </li>
</template>

<script>
export default {
  name: "productCard",
  props: ["product"],
};
</script>

<style lang="scss">
@import "../scss/variables";

  .n-card {
     width: calc(25% - 1.5em);
     min-width: 150px;
      margin: 0 0.75em 4em 0.75em;
    &__media {
      height: 0;
      padding-bottom: 65.25%;
      margin-bottom: 1.5em;
      width: 100%;
      overflow: hidden;
        margin-bottom: 1.5em;
        position: relative;
        background-color: #ddd;
        border-radius: 4px;
      & img {
        width: 100%;
        height: 100%;
        max-height: 200px;
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        border-radius: 4px;
        
      }
    }
  }

  .n-card__title {
    margin-bottom: 5px;
    color: rgb(68, 74, 95);
    font-weight: 600;
    font-size: 14px;
    line-height: 1.5;
  }
  .n-card__price {
    color: rgb(42, 42, 42);
    font-weight: 400;
    font-size: 13px;
  }
  .n-card__desc {
    color: rgb(79, 79, 79);
    font-weight: 400;
    font-size: 14px;
  }

@media (max-width: 800px) {

  .n-card {
    width: calc(50% - 1.5em);
    &__media {
      padding-bottom: 50%;
    }
  }

}

@media (max-width: 500px) {


  .n-card {
    width: calc(100% - 1.5em);
  }

}

</style>
