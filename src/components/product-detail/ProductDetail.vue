<template>
<!-- section -->
<section>
  <router-link to="/" class="router-link">Back to search results</router-link>
  <!-- wrapper -->
  <div class="flex-wrapper">
    <!-- col-1 -->
    <div class="col-1">
      <!-- photographs -->
      <div class="photo-wrapper">
        <img src=../../assets/images/phone.jpg alt="">
      </div>
      <!-- comments-wrapper -->
      <div class="comment-container">
        <h2 class="comment__header">{{lengthOfProducts}} Comments</h2>
        <!-- comments -->
        <div class="comments">
          <comment v-for="(comment, index) in comments" v-bind:key="index" :comment="comment"/>
        </div>
        <router-link to="/login"></router-link>
        <div v-if="!loggedIn">
          <span>You must </span>
          <router-link v-if="!loggedIn" class="router-link" to="/login">Log in</router-link>
          <span>to leave a comment</span>
        </div>
        <!-- comment form -->
        <form v-if="loggedIn" v-on:submit.prevent="checkForm" class="comments__input">
          <!-- errors -->
          <div v-if="errors.length">
            <ul v-for="(error, index) in errors" v-bind:key="index">
              <li>{{ error }}</li>
            </ul>
          </div>
          <!-- comment input -->
          <textarea placeholder="Write a public comment" ref="myTextArea" v-model="comment.body" rows="3" cols="50"></textarea>
          <!-- <input
            v-model="comment.body"
            type="text"
            name="comment"
            id="comment"
          /> -->
          <!-- comment post button -->
          <input type="submit" value="Comment" />
        </form>
      </div>
    </div>
    <!-- col-2 -->
    <div class="col-2">
      <h3 class="product__title">{{product.title}}</h3>
      <!-- details and description -->
      <div>
        <!-- details -->
        <h4>Details</h4>
      </div>
      <div>
        <!-- description -->
        <h4>Description</h4>
      </div>
    </div>
  </div>
</section>






  <!-- <div>
    <div class="backtosearch">
    </div>
    <div class="container">
      <div class="product-listing">
        <div class="img-phone">
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
        
        
        </div>
        
      </div>
    </div>
  </div> -->
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
  computed: {
    lengthOfProducts: function() {
      return this.comments.length;
    }
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
@import "../../scss/variables";

* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.flex-wrapper {
  max-width: 1300px;
  margin: auto;
  padding: 0 20px;

  @include flex-direction(row);
}

.col-1 {
  flex: 2;
  margin: 0 10px;
}

.col-2 {
  flex: 1;
}

.photo-wrapper {
  @include flex-direction(row);
  justify-content: center;
  padding: 20px;
  background: $off-white;
  & img {
    object-fit: cover;
  }
}

.comment-container {
  @include flex-direction(column);
  margin: 40px 0;
}

.comment__header {
  font-size: 1em;
  font-weight: 500;
  margin-bottom: 20px;
}

.comments {
  margin-bottom: 15px;
}

input[type=submit] {
  margin: 10px 0;
  padding: 15px 25px;
  background: $primary;
  border: none;
  color: white;
  border-radius: 2px;
  font-size: 0.9em;
  display: block;
}

textarea {
  width: 75%;
  padding: 20px;
  margin-top: 20px;
  font-size: 0.9em;
}


.col-2 {
  margin: 0 20px;
}

.product__title {
  font-size: 2em;
}



</style>
