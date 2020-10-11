<template>
  <div>
    <!-- Flexbox -->
    <section>
      <router-link to="/">Back</router-link>
      <div class="row-1">
        <div class="photo-container">
          <img src="../../assets/images/phone.jpg" />
        </div>
        <div class="details">
          <h3 class="title is-3">{{ product.title }}</h3>
          <h4 class="title is-4">${{ product.price }}</h4>
          <button class="button is-fullwidth">Message Seller</button>
        </div>
      </div>
      <div class="description">
        <h5 class="title is-5">Description</h5>
        <p>{{ product.description }}</p>
      </div>
      <div class="comments">
        <h5 class="title is-5">Comments ({{ lengthOfComments }})</h5>
        <comment
          class="comment"
          v-for="(comment, index) in comments"
          v-bind:key="index"
          :comment="comment"
        />
        <div class="modal-wrapper">
          <h6 v-if="!loggedIn">
            Please log in to
            <span @click="logModal = true">ask a question</span>
          </h6>
          <div v-if="!loggedIn" v-bind:class="{ 'is-active': logModal }" class="modal">
            <div @click="logModal = false" class="modal-background"></div>
            <div class="modal-content">
              <!-- Any other Bulma elements you want -->
              <div class="box">
                <login />
              </div>
            </div>
            <button @click="logModal = false" class="modal-close is-large" aria-label="close"></button>
          </div>
        </div>
        <form v-if="loggedIn" v-on:submit.prevent="checkForm">
          <!-- Input -->
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </figure>

            <div class="media-right">
              <b-field label="Comment" :type="errorType" :message="errorMessage">
                <textarea class="textarea" v-bind:class="{'textarea-type': errorType}"
                  placeholder="Leave a comment"
                  v-model="comment.body"
                  cols="30"
                  rows="5"
                ></textarea>
              </b-field>
              <input type="submit" class="button is-primary" value="Post Comment" />
            </div>
          </article>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Comment from "../comment/Comment";
import Login from "../../views/admin/Login";
import EventBus from "../../eventBus";

export default {
  name: "ProductDetail",
  components: {
    comment: Comment,
    login: Login
  },

  data: function() {
    return {
      errorType: "",
      errorMessage: "100 characters remaining",
      canMessage: false,
      logModal: false,
      readOnly: false,
      errors: [],
      loggedIn: "",
      product: {},
      image: [],
      comments: [],
      comment: {
        body: "",
        product: null,
        user: null,
        firstname: "",
        lastname: ""
      }
    };
  },
  watch: {
    loggedIn: function() {
      if (this.loggedIn) {
        this.logModal = false;
      }
    },
    'comment.body': function() {
      this.errors = [];
      this.errorType = "";
        this.errorMessage = `${100 - this.comment.body.length} characters remaining`;
    }
  },
  computed: {
    lengthOfComments: function() {
      return this.comments.length;
    }
  },
  methods: {

    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.comment.body) {
        this.errors.push("Comment required");
        this.errorType = "is-danger";
        this.errorMessage = `Please leave a comment`;
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
      this.comment.firstname = localStorage.firstname;
      this.comment.lastname = localStorage.lastname;
      this.$http
        .post(`${process.env.VUE_APP_API_URL}products/${id}/comments`, comment)
        .then(
          response => {
            if (response.body) {
              this.comment.body = "";
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
    EventBus.$on("$loggedIn", () => {
      localStorage.loggedIn = "yes";
      this.loggedIn = localStorage.loggedIn;
      this.id = localStorage.username;
    });
    EventBus.$on("$loggedOut", () => {
      localStorage.loggedIn = "";
      this.loggedIn = localStorage.loggedIn;
      this.id = localStorage.username;
    });
  }
};
</script>

<style lang="scss">
@import "../../scss/variables";
@import "../../scss/bulma";

* {
  font-family: canada-type-gibson, sans-serif;
}

section {
  max-width: 1200px;
  margin: auto;
  padding: 1em;
}

.not-visible {
  display: none;
}

.row-1 {
  @include flex-direction(row);
}

.error {
  font-size: 1em;
  color: #f14668;
}

.box {
  width: 50%;
  margin: auto;
}

.photo-container {
  @include flex-direction(row);
  justify-content: center;
  background: $off-white;
  flex: 2;
  & img {
    height: 100%;
    object-fit: cover;
  }
}

.details {
  flex: 1;
  padding: 25px;
  & button {
    padding: 25px 0;
  }
}

.description {
  width: 66%;
  padding: 25px 0;
}

.comments {
  width: 66%;
  padding: 25px 0;
}

.comment {
  width: 100%;
}

.comment-valid {
  @include flex-direction(row);
  justify-content: space-between;
  margin-top: 10px;
  &__text {
    margin: 5px 0;
  }
  & input[type="submit"] {
    margin: 5px 0;
  }
}

.media {
  @include flex-direction(row);
  margin-top: 25px;
}

.media-right {
  flex: 1;
}

.title {
  margin: 0;
}

.textarea-type, .textarea-type:hover {
  border: 1px solid red;
}

.modal-wrapper {
  margin: 25px 0;
  & span {
    color: #eb9836;
    font-weight: bold;
  }
}

.box {
  flex-basis: 100px;
  max-width: 400px;
}

//Mobile
@media (max-width: 700px) {
  .row-1 {
    flex-direction: column;
  }

  .photo-container {
    grid-column: 1 / 3;
  }

  .comments {
    grid-column: 1 / 3;
    grid-row: 3;
  }

  .description {
    width: 100%;
  }

  .comment-valid {
    flex-direction: column;
  }

  .comments {
    width: 100%;
  }

}
</style>
