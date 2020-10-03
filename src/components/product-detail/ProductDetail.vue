<template>
  <div>
    <div class="backtosearch">
      <router-link to="/" class="router-link"
        >Back to search results</router-link
      >
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
      <div class="comments">
        <h2>Comments</h2>
        <comment v-for="(comment, index) in comments" v-bind:key="index" :comment="comment"/>
        <router-link to="/login"></router-link>
        <div v-if="!loggedIn">
          You need to
          <router-link v-if="!loggedIn" class="router-link" to="/login"
            >Login</router-link
          >
        </div>
        <form
          v-if="loggedIn"
          v-on:submit.prevent="checkForm"
          class="comments__input"
        >
          <div v-if="errors.length">
            <ul v-for="(error, index) in errors" v-bind:key="index">
              <li>{{ error }}</li>
            </ul>
          </div>
          <input
            v-model="comment.body"
            type="text"
            name="comment"
            id="comment"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "../comment/Comment";
export default {
  name: "ProductDetail",
  components: {
    comment: Comment,
  },

  data: function() {
    return {
      errors: [],
      loggedIn: "",
      product: {},
      image: [],
      comments: [],
      comment: {
        body: "",
        product: null,
        user: null
      }
    };
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.comment.body) {
        this.errors.push("Comment required");
      }
      // if no errors then log the user in
      if (!this.errors.length) {
        this.postComment(this.comment);
      }
    },
    postComment: function(comment) {
      const id = this.$route.params.productId;
      this.comment.product = id;
      this.comment.user = localStorage.username;
      this.$http
        .post(`${process.env.VUE_APP_API_URL}products/${id}/comments`, comment)
        .then(
          (response) => {
            if (response.body) {
              this.getProductById();
              this.getComments();
            }
          },
          (response) => {
            this.errors.push(response.body.message);
          }
        );
    },
    getProductById: function() {
      const id = this.$route.params.productId;
      this.$http
        .get(`${process.env.VUE_APP_API_URL}products/${id}`)
        .then(function(data) {
          this.product = data.body;
        });
    },
    getComments: function() {
      const id = this.$route.params.productId;
      this.$http.get(`${process.env.VUE_APP_API_URL}products/${id}/comments`).then(function(data) {
        this.comments = data.body;
      })
    }
  },

  created: function() {
    // const id = this.$route.params.articleId;
    (this.product = {}),
      (this.loggedIn = localStorage.loggedIn),
      this.getProductById();
      this.getComments();
  },
};
</script>

<style lang="scss">
@import "./scss/main.scss";
</style>
