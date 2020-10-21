<template>
  <div class="container" v-bind:class="{fixed: modal}">
    <div class="photo-wrapper">
      <img src="../../assets/images/phone.jpg" />
    </div>
    <div class="col-2">
      <h3>{{ product.title }}</h3>
      <div class="category-links">
        <a href="#">Mobile Phones</a>
        <a href="#">Samsung</a>
      </div>
      <h3 class="product-price">${{ product.price }}</h3>
      <div class="description">
        <h4>Description</h4>
        <p>{{ product.description }}</p>
      </div>
    </div>
    <div class="comments">
      <h4>Comments ({{lengthOfComments}})</h4>
      <comment
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
      />
      <p class="log-in-tip" v-if="!loggedIn" @click="modal = true">Login to leave a comment</p>
      <div v-bind:class="{'is-hidden': !modal}" class="comment-box-modal">
          <div class="modal-content">
            <login class="login"/>
          </div>
        </div>
      <div v-if="loggedIn" class="comment-box-container">
        <form @submit.prevent="checkForm">
          <div class="comment-box">
            <textarea
              v-model="comment.body"
              maxlength="100"
              placeholder="Write a comment..."
            ></textarea>
            <p v-bind:class="{'comment-box-error': errorMessage == 'This field is required'}">{{errorMessage}}</p>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
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
    login: Login,
  },

  data: function() {
    return {
      errorType: "",
      errorMessage: "100 characters remaining",
      modal: false,
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
        lastname: "",
      },
    };
  },
  watch: {
    "comment.body": function() {
      this.errors = [];
      this.errorType = "";
      this.errorMessage = `${100 -
        this.comment.body.length} characters remaining`;
    },
  },
  computed: {
    lengthOfComments: function() {
      return this.comments.length;
    },
  },
  methods: {
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.comment.body) {
        this.errors.push("Comment required");
        this.errorMessage = `This field is required`;
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
          (response) => {
            if (response.body) {
              this.comment.body = "";
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
      this.$http
        .get(`${process.env.VUE_APP_API_URL}products/${id}/comments`)
        .then(function(data) {
          this.comments = data.body;
        });
    },
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
      this.modal = false;
    });
    EventBus.$on("$loggedOut", () => {
      localStorage.loggedIn = "";
      this.loggedIn = localStorage.loggedIn;
      this.id = localStorage.username;
    });
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

p {
  line-height: 24px;
}
body {
  background: rgb(250, 250, 250);
  font-size: 14px;
}

.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto auto;
  max-width: 1150px;
  margin: auto;
  padding: 0 20px 50px 20px;
}

.product-price {
  margin-bottom: 10px;
}

.log-in-tip {
  padding: 20px 0;
  cursor: pointer;
}

.comment-box-modal {
  @include flex-direction(row);
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.26);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
}

.modal-content {
  position: fixed;
  z-index: 100;
}

.screen-lock {
  position: fixed;
}

input[type="submit"] {
  font-size: 16px;
  font-weight: 400;
  border: none;
  border-radius: 3px;
  background: $secondary;
  color: white;
  padding: 25px 0;
  width: 150px;
  &:hover {
    background: $secondary-tint;
    cursor: pointer;
  }
}

.comments {
  grid-column: 1;
  grid-row: 2;
  margin: 0 25px;
  & h4 {
    font-weight: 500;
    padding-bottom: 20px;
  }
}

.login {
  background: white;
  margin: 0 20px;
}

.comment-input {
  @include flex-direction(column);
  width: 100%;
}

.comment-box {
  padding: 10px 0;
  &-container {
    padding: 10px 0;
    & input[type="submit"] {
    padding: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  }
  &-error {
    color: rgb(240, 99, 99);;
  }
}

.is-hidden{
  display: none;
}

.comment-box-container {
  & input[type="submit"] {
    padding: 10px;
  }
}

textarea {
  padding: 10px;
  font-family: lato;
  font-size: 1em;
  border-radius: 2px;
  border-style: solid;
  width: 100%;
}

.photo-wrapper {
  @include flex-direction(row);
  grid-column: 1;
  justify-content: center;
  background: $off-white;
  border: 1px solid $grey;
  margin: 0 25px 50px 25px;
  height: 500px;
  & img {
    width: 100%;
    object-fit: contain;
  }
}

.col-2 {
  grid-column: 2;
  grid-row: 1 / 3;
  margin: 0 25px;
  & h3 {
    font-weight: 500;
    padding-bottom: 10px;
  }
}

.category-links {
  padding-bottom: 20px;
  & a {
    margin-right: 10px;
  }
}

h3 {
  font-size: 2em;
}

h4 {
  font-size: 1.4em;
}

.description {
  width: 100%;
  padding-bottom: 25px;
  & h4 {
    font-weight: 500;
    padding-bottom: 10px;
  }
}

//Mobile
@media (max-width: 1000px) {
  .photo-wrapper {
    grid-column: 1 / 3;
  }

  .col-2 {
    grid-row: 2;
    grid-column: 1 / 3;
  }

  .details {
    flex: 1;
    padding-top: 50px;
  }

  .description {
    width: 100%;
  }

  .comments {
    grid-column: 1 / 3;
    grid-row: 3;
  }
}
</style>
