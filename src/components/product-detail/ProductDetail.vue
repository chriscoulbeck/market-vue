<template>
  <div>
   <section>
     <div class="photo-container">
       <img src="../../assets/images/phone.jpg">
     </div>
     <div class="details">
       Details
     </div>
     <div class="comments">
       Comments
     </div>
   </section>
  </div>
</template>

<script>
// import Comment from "../comment/Comment";

export default {
  name: "ProductDetail",
  components: {
    // comment: Comment
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

section {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  grid-template-rows: 500px auto ;
  grid-gap: 1em;
  max-width: 1200px;
  margin: auto;
  padding: 1em;
}

.photo-container {
  @include flex-direction(row);
  justify-content: center;
  background: $off-white;
  width: 100%;
  & img {
    height: 100%;
    object-fit: cover;
  }
}

.details {
  grid-column: 2 / 3;
  background: red
}

.comments {
  grid-column: 1 / 2;
  background: red;
}

//Mobile 
@media (max-width: 700px) {

  .photo-container {
    grid-column: 1 / 3;
  }

  .comments {
    grid-column: 1 / 3;
    grid-row: 3;
  }

  .details {
    grid-column: 1 / 3;
    grid-row: 2;
  }
}

</style>
