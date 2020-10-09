<template>
  <div class="edit-wrapper">
    <h2>Edit posts</h2>
    <ul>
      <!-- Activity / Title -->
      <div class="product" v-for="(product, index) in products" v-bind:key="index">
        <li class="edit-active">{{product.active}}</li>
        <li class="edit-title">{{product.title}}</li>

        <!-- EDIT BUTTON -->
        <div class="product-edit">
          <router-link
            class="product-edit__edit"
            v-bind:to="{ name: 'Edit', params: { productId: product._id} }"
          >Edit</router-link>
          <a href class="product-edit__delete-icon" v-on:click.prevent="deleteProduct(product._id)">Delete</a>
        </div>

      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      loggedIn: ""
    };
  },
  methods: {
    deleteProduct: function(productId) {
      this.$http
      .delete(`${process.env.VUE_APP_API_URL}products/${productId}`)
      .then(function() {
        this.getProducts();
      });
    },

    getProducts: function() {
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}users/${localStorage.userId}/products`
        )
        .then(function(data) {
          this.products = data.body;
        });
    }
  },
  created() {
    this.getProducts();
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({ path: "/login" })
    }
  }
};
</script>

<style lang="scss">

h2 {
  padding: 25px;
  font-weight: bold;
  font-size:40px;
}

.edit-wrapper {
  margin: 5% 10% 10% 10%;
}
.edit-active {
  margin-right:15px;
  color: #EB9836 ;
}
.edit-title {
  margin-right:15px;
}

.product {
  display: flex;
  width: 100%;
  background-color: #E3E3E3;
  margin-top: 10px;
  padding: 9px;
  border-radius:3px;
}
.product-edit {
    display: flex;
    position:absolute;
    right: 12%;
    color:#EB9836;

  &__edit {

  }

  &__delete-icon {
    margin-left: 10px;
  }
}
.router-link2 {
  position:absolute;
  left: 81.5%;
  color: #333;
}
.router-link3 {
  position:absolute;
  left: 85%;
  color: #333;
}
li {
  list-style: none;
}


</style>