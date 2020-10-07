<template>
  <div>
    <section class="section row-1">
      <div class="columns">
        <div class="column is-two-thirds-desktop is-full-mobile listing-photos">
          <img src=../../assets/images/phone.jpg alt="">
        </div>
        <div class="column is-one-third">
          <h1 class="title">{{ product.title }}</h1>
        </div>
      </div>
    </section>
    <section class="section row-2">
      <div class="column is-two-thirds-desktop is-full-mobile">
        <div class="container">
          <h5 class="title is-5">Description</h5>
          <p class="is-small">{{ dummyProduct.description }}</p>
        </div>
        <div class="container">
          <h5 class="title is-5">Comments ({{ lengthOfComments }})</h5>
          <comment
            v-for="(comment, index) in comments"
            v-bind:key="index"
            :comment="comment"
          />
        </div>
        <form v-if="loggedIn" v-on:submit.prevent="checkForm">
          <!-- Error  Handling -->
          <div v-if="errors.length">
            <ul v-for="(error, index) in errors" v-bind:key="index">
              <li>{{ error }}</li>
            </ul>
          </div>
          <!-- Input -->
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </figure>
            <div class="media-content">
              <div class="field">
                <p class="control">
                  <textarea
                    v-model="comment.body"
                    class="textarea"
                    placeholder="Add a comment..."
                  ></textarea>
                </p>
              </div>
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <input type="submit" class="button is-primary" Value="Post Comment">
                  </div>
                </div>
              </nav>
            </div>
          </article>
        </form>
      </div>
    </section>
  </div>
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
        price: "10,000",
        description: `LEARANCE PRICING!

Condition: New
1-day Warranty: 12 Months
What's in the Box?

    Samsung Galaxy Smartphone
    Charging Plug 

The result of 10 years of pioneering mobile firsts, the next generation of Galaxy has arrived - the phone that doesn't just stand out, it stands apart...

The Most Immersive Display Yet: With on-screen security, and a Dynamic AMOLED that's easy on the eyes, there's virtually nothing to get in the way of your viewing. Not even the screen you're viewing it on.

Ultrasonic Fingerprint Security: We've moved security from the back of the phone to the front, fusing the Ultrasonic Fingerprint directly into the screen.`,
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
@import "../../scss/bulma";

* {
  font-family: Arial, Helvetica, sans-serif;
}

.section {
  width: 1100px;
  margin: auto;
}

.listing-photos {
  @include flex-direction(row);
  justify-content: center;
  background: $light-grey;
}

.button {
  width: 150px;
}

.container {
  margin: 0;
  width: 100%;
}
</style>
