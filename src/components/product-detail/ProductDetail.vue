<template>
  <!-- section -->
  <section>
    <router-link to="/" class="router-link">Back to search results</router-link>
    <!-- wrapper -->
    <div class="flex-wrapper">
      <!-- col-1 -->
      <div class="col-1">
        <!-- photographs -->
        <div class="photo-wrapper"><img src=../../assets/images/phone.jpg alt=""></div>
        <!-- comments-wrapper -->
        <div class="comment-container">
          <h2 class="comment__header">{{lengthOfComments}} Comments</h2>
          <!-- comments -->
          <div class="comments">
            <comment v-for="(comment, index) in comments" v-bind:key="index" :comment="comment" />
          </div>
          <router-link to="/login"></router-link>
          <div v-if="!loggedIn">
            <span>You must</span>
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
            <textarea maxLength="100"
              placeholder="Write a public comment"
              ref="myTextArea"
              v-model="comment.body"
              rows="2"
              cols="50"
            ></textarea>
            <!-- <input
            v-model="comment.body"
            type="text"
            name="comment"
            id="comment"
            />-->
            <!-- comment post button -->
            <span>{{ letterCount }} characters remaining...</span>
            <button class="comment__submit">Post Comment</button>
          </form>
        </div>
      </div>
      <!-- col-2 -->
      <div class="col-2">
        <h3 class="product__title">{{dummyProduct.title}}</h3>
        <!-- details and description -->
        <div>
          <!-- details -->
          <h4>Description</h4>
          <p>{{dummyProduct.description}}</p>
        </div>
        <div>
          <!-- description -->
          <!-- <h4>Description</h4> -->
        </div>
      </div>
    </div>
  </section>
  
</template>

<script>
import Comment from "../comment/Comment";

export default {
  name: "ProductDetail",
  components: {
    comment: Comment
  },

  data: function() {
    return {
      readOnly: false,
      maxLetters: 100,
      errors: [],
      loggedIn: "",
      product: {},
      image: [],
      comments: [],
      comment: {
        body: "",
        product: null,
        user: null
      },
      dummyProduct: {
        title: "Samsung Galaxy S10+ 128GB G975F Prism Black",
        description: `LEARANCE PRICING!

Condition: New
1-day Warranty: 12 Months
What's in the Box?

    Samsung Galaxy Smartphone
    Charging Plug 

The result of 10 years of pioneering mobile firsts, the next generation of Galaxy has arrived - the phone that doesn't just stand out, it stands apart...

The Most Immersive Display Yet: With on-screen security, and a Dynamic AMOLED that's easy on the eyes, there's virtually nothing to get in the way of your viewing. Not even the screen you're viewing it on.

Ultrasonic Fingerprint Security: We've moved security from the back of the phone to the front, fusing the Ultrasonic Fingerprint directly into the screen.`
      }
    };
  },
  computed: {
    lengthOfComments: function() {
      return this.comments.length;
    },
    letterCount: function() {
      return 100 - this.comment.body.length;
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
          response => {
            if (response.body) {
              this.getProductById();
              this.getComments();
            }
          },
          response => {
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
      this.$http
        .get(`${process.env.VUE_APP_API_URL}products/${id}/comments`)
        .then(function(data) {
          this.comments = data.body;
        });
    }
  },

  created: function() {
    // const id = this.$route.params.articleId;
    (this.product = {}),
      (this.loggedIn = localStorage.loggedIn),
      this.getProductById();
    this.getComments();
  }
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
  max-width: 60%;
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

.comment {
  &__header {
    font-size: 1em;
    font-weight: 500;
    margin-bottom: 20px;
  }
  &__submit {
      margin: 10px 0;
      padding: 15px 25px;
      background: $primary;
      border: none;
      color: white;
      border-radius: 2px;
      font-size: 0.9em;
      display: block;
    }
}

.comments {
  margin-bottom: 15px;
}

textarea {
  width: 100%;
  padding: 20px;
  margin-top: 20px;
  font-size: 0.9em;
}

span {
  display: block;
  margin: 20px 0;
}

.col-2 {
  margin: 0 20px;
}

.product__title {
  font-size: 2em;
}
</style>
