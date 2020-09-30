<template>
  <div>
    <div class="backtosearch">
      <router-link to="/" class="router-link">Back to search results</router-link>
    </div>
    <div class="container">
      <div class="product-listing">
        <div class="img-phone">
          <img src=../../assets/images/phone.jpg alt="">
        </div>
      </div>
      <div class="right-container">
        <h1 class="right-container__title">{{ product.title }}</h1>
        <h3 class="right-container__price">{{ product.price }}</h3>
        <h5 class="right-container__listed">{{ product.listed }}</h5>

        <button class="right-container__button-send-message" type="submit">
          Message Seller
        </button>

        <div class="usercontainer">
          <h4 class="usercontainer__sellerinfo">Seller Information</h4>
          <h5 class="usercontainer__username">{{ product.username }}</h5>
          <h5 class="usercontainer__userrating">{{ product.userrating }}</h5>
          <div class="stars">
            <img src="../../assets/images/star.png" alt="" />
            <img src="../../assets/images/star.png" alt="" />

            <img src="../../assets/images/star.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="details-container">
      <div class="details1">
        <h5 class="details1__h5">Details</h5>
        <p class="details1__p">{{ product.details }}</p>
      </div>
      <div class="description">
        <h5 class="ddescription__h5">Description</h5>
        <p class="description__p">{{ product.description }}</p>
      </div>
    </div>
    <div class="line">
      <h2 class="line__lineorange"><span></span></h2>
    </div>
    <div class="items">
      <div class="similar-items">
        <h2>Similar Items</h2>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ProductDetail",

  data: function() {
    return {
      product: {
        title: null,
        price: null,
        listed: null,
        username: null,
        details: null,
        description: null
      },
      image: []
    };
  },

  created: function() {
    // const id = this.$route.params.articleId;
    this.product = {
      title: "",
      price: "",
      listed: "",
      username: "",
      details:"",
      description:""
    };
    // this.$http
    // .get(`${process.env.MONGODB_URI}product/${id}`)
    // .then(function(data) {
    //     this.product = data.body
    // })
  }
};
</script>

<style lang="scss" >
@import "./scss/main.scss";
</style>