<template>
  <div class="edit-wrapper">
    <h2>Edit posts</h2>
    <ul>
      <!-- Activity / Title -->
      <div class="product" v-for="(product, index) in products" v-bind:key="index">
        <li class="edit-active">{{product.active}}</li>
        <li class="edit-title">{{product.title}}</li>

        <!-- EDIT BUTTON -->
        <div class="product__edit">
          <router-link
            class="edit"
            v-bind:to="{ name: 'Edit', params: { productId: product._id} }"
          >Edit</router-link>
          <a href class="delete" v-on:click.prevent="deleteProduct(product._id)">Delete</a>
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

.edit-wrapper {
  margin: 10%;
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

  &__edit {
    display: flex;
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

@media only screen and (max-width: 1150px) {
  .edit {
    position:absolute;
    left: 80%;
    color: #333;
    }
  .delete {
    position:absolute;
    left: 84%;
    color: #333;
  }
}

@media only screen and (max-width: 855px) {
  .edit {
  position:absolute;
  left: 74%;
  color: #333;
}
.delete {
  position:absolute;
  left: 80%;
  color: #333;
}
}

@media only screen and (max-width: 550px) {
  .edit {
  position:absolute;
  left: 68%;
  color: #333;
}
.delete {
  position:absolute;
  left: 76%;
  color: #333;
}
}

</style>