<template>


 <main class="post-container">
      <div class="post-form">
        <h4 class="post-form__header">Create listing</h4>
         <!-- <span class="register-link">Already registered? <router-link to="/login" class="register-link--router">Sign in</router-link></span> -->
        <form @submit="checkForm" action="">
          <div class="input-field">
            <label for="title-field">Listing Title</label>
            <input
              type="text"
              name="title"
              id="title-field"
              v-model="product.title"
            />
          </div>
        <!-- <div class="input-field">
          <label for="username-field">Username</label>
          <input 
            type="text"
            name="username"
            id="username-field"
            v-model="user.username"
          />
        </div> -->
          <div class="input-field">
            <label for="price-field">Price</label>
            <input
              type="text"
              name="price"
              id="price-field"
              v-model="product.price"
            />
          </div>
          <div class="input-field">
          <label for="desc-field">Listing description</label>
          <textarea
            name="desc"
            id="desc-field"
            cols="30"
            rows="5"
            v-model="product.desc"
          ></textarea>
        </div>
          <button class="btn--submit" type="submit">Post listing</button>
         
        </form>
      </div>
    </main>




  <!-- <main class="post-container">
    <div class="post-form">
      <h4 class="post-form__header">Post listing</h4>
      <form @submit="checkForm" action="">
        <div class="input-field">
          <label for="title-field">Listing title</label>
          <input
            type="text"
            name="title"
            id="title-field"
            v-model="product.title"
            placeholder="iPhone 5"
          />
        </div>
        <div class="input-field">
          <label for="price-field">Listing price</label>
          <input
            type="text"
            name="price"
            id="price-field"
            v-model="product.price"
            placeholder="200"
          />
        </div>
        <div class="input-field">
          <label for="desc-field">Listing description</label>
          <textarea
            name="desc"
            id="desc-field"
            cols="30"
            rows="5"
            v-model="product.desc"
          ></textarea>
        </div>
        <div class="input-field">
          <label for="image-field">Image</label>
          <input type="file" name="image" id="image-field" @change="onFileSelected" />
        </div>
        <button class="btn--submit" type="submit">Post Listing</button>
      </form>
    </div>
  </main> -->
</template>

<script>
export default {
  data() {
    return {
      loggedIn: "",
      product: {
        title: "",
        price: "",
        listed: "",
        username: "",
        details: "",
        desc: "",
        file: null,
      },
      errors: [],
    };
  },
  methods: {
    onFileSelected: function(event) {
      this.product.file = event.target.files[0];
    },
    checkForm: function(event) {
      event.preventDefault();
      this.errors = [];
      if (!this.product.title) {
        this.errors.push("Title required!");
      }
      if (!this.errors.length) {
        this.postProduct(this.product);
      }
    },
    postProduct: function(product) {
      this.product.username = localStorage.user;
      this.$http.post(`${process.env.VUE_APP_API_URL}products`, product).then(
        (response) => {
          if (response.body) {
            this.$router.push({ path: "/" });
          }
        },
        (response) => {
          this.errors.push(response.body.message);
        }
      );
    },
  },
  created() {
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";

// New Styling
</style>
