<template>
  <main class="a-body">
    <div class="a-container">
      <div class="a-body__header">
        <h4>My Listings</h4>
      </div>
      <ul class="a-list">
        <li
          class="a-list__item"
          v-for="(product, index) in products"
          v-bind:key="index"
        >
          <article class="a-article">
            <div class="a-article__media">
              <img src="../assets/images/laptop.jpg" alt="" />
            </div>
            <div class="a-article__body">
              <div class="a-article__text">
                <h4>{{ product.title }}</h4>
              </div>
              <div class="a-article__icons">
                <router-link v-bind:to="{ name: 'Edit', params: { productId: product._id } }">
                  <ion-icon style="font-size: 20px;" name="create-outline"></ion-icon>
                </router-link>
                <ion-icon @click.prevent="deleteProduct(product._id)" style="color: red; font-size: 20px;" name="trash-outline"></ion-icon>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </main>

  <!-- <div>
    <div class="edit-wrapper">
      <h2>Your Items</h2>
      <ul>

        <div
          class="product"
          v-for="(product, index) in products"
          v-bind:key="index"
        >
          <li class="product-title">{{ product.title }}</li>
          <div class="product-links">
            <router-link
              class="product-link"
              v-bind:to="{ name: 'Edit', params: { productId: product._id } }"
              >Edit</router-link
            >
            <a
              href
              class="product-link"
              v-on:click.prevent="deleteProduct(product._id)"
              >Delete</a
            >
          </div>
        </div>
      </ul>
    </div>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      products: [],
      loggedIn: "",
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
    },
  },
  created() {
    this.getProducts();
    this.loggedIn = localStorage.loggedIn;
    if (!this.loggedIn) {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style lang="scss">
@import "../scss/variables";

.a-body {
  height: 90vh;
  &__header {
    font-size: 1.4em;
    margin-bottom: 2em;
    & h4 {
      font-weight: 600;
      padding: 0 0.5em;

    }
  }
}

ion-icon {
  margin-left: 15px;
}

ion-icon:hover {
  cursor: pointer;
}

.a-container {
  max-width: 1000px;
  margin: auto;
  padding: 110px 0;
}

.a-list {
  padding: 0 0.75em;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.product-link {
  margin-left: 20px;
  &:hover {
    color: $secondary;
    text-decoration: underline;
  }
}

.edit-wrapper {
  margin: auto;
  padding: 0 20px;
  max-width: 800px;
}

.product-title {
  margin-right: 15px;
  font-size: 20px;
}

.banner {
  background: grey;
}

.product {
  @include flex-direction(row);
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  padding: 9px 0;
  border-radius: 3px;
  border-bottom: 1px solid $grey;
}

li {
  list-style: none;
}

.a-list__item {
  margin: 0 .75em 2em 0.75em;
  width: calc(25% - 1.5em);
}

.a-article {
  height: 100%;
}

.a-article__media {
  height: 180px;
  width: 100%;
  border-radius: 5px;
  margin-right: 1em;
  margin-bottom: 1em;
  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
}

.a-article__body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-right: 2em;
}

.a-article__text {
  flex: 3;
}

.a-article__text h4 {
  font-size: 14px;
  margin-bottom: 1em;
  line-height: 1.5em;
  font-weight: 600;
}

.a-article p {
  font-size: 1em;
}

.a-article__icons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  flex: 1;

}

@media (max-width: 875px) {

  
  .a-article__text h4 {
    font-size: 12px;
  }

  .a-list {
    display: flex;
  }

  .a-list__item {
    width: calc(33.333333% - 1.5em);
  }

  .a-article {
    flex-direction: column;
  }

  .a-article__media {
    margin: 0 0 1rem 0;
    max-width: 100%;

  }

  .a-article__body {
    padding: 0; 
    flex-direction: column;
    width: 100%;
  }

  .a-article__text h4 {
    font-size: 14px;
    line-height: 1.5;
  }

  .a-article__text p {
    display: none;
  }


}

@media (max-width: 600px) {

  .a-list__item {
    width: calc(50% - 1.5em);
  }

  .a-article__text h4 {
    font-size: 0.9em;
    font-weight: 600;
  }


}

@media (max-width: 400px) {

  .a-list {
    padding: 0.75em;
  }

  .a-body__header {
    margin-bottom: 1em;
  }

  .a-body__header h4 {
    font-size: 1.2em;
    margin-bottom: .5em;
  }

  .a-list__item {
    width: calc(100%);
    margin-left: 0;
    margin-right: 0;
  }

  .a-article__text h4 {
    font-size: 0.9em;
    font-weight: 0.8em;
  }

}

</style>
