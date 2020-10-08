<template>
<!-- Update listing -->
  <div class="title-wrapper">
    <h1>UPDATE YOUR LISTING DETAILS</h1>
      <form class="title-form" v-on:submit.prevent="checkForm">
      <div class="title-flex">
        <!-- Listing title -->
        <label class="title" for="title">Listing title</label>
        <input v-model="product.title" maxlength="16" type="text" name="title" id="title" />

        <!-- Listing details -->
        <label class="title" for="details">Product details</label>
        <input v-model="product.details" maxlength="26" type="text" name="details" id="title" />

        <!-- Listing description -->
        <label class="title" for="description"> Description </label>
        <textarea  v-model="product.description" maxlength="500" type="details" name="description" id="titleD" >
        </textarea>

        <!-- Listing price -->
        <label class="title" for="price"> Price </label>
        <input v-model="product.price" maxlength="8" placeholder="$" type="text" name="price" id="title" />

        <!-- Update button -->
        <button class="update-button">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        title: null,
        description: null,
        price: null,
        details: null,
      }
    };
  },
  methods: {
    checkForm: function() {
      this.errors = [];
      if (!this.product.title) {
        this.errors.push("Title Required");
      }
      this.editProduct(this.product);
    },
    editProduct: function(product) {
      this.$http
        .put(
          `${process.env.VUE_APP_API_URL}products/${this.$route.params.productId}`,
          product
        )
        .then(function() {
          this.$router.push({ path: "/account" });
        });
    }
  },
  created() {
    if (this.$route.params.productId) {
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}products/${this.$route.params.productId}`
        )
        .then(function(data) {
          this.product = data.body;
        });
    }
  }
};
</script>

<style lang="scss">

h1 {
  padding: 25px;
}

.title-wrapper {
  margin: 0 10% 10% 10%;
}

.title-form {
  background-color: #E3E3E3;
  padding: 9px;
  border-radius:3px;
}
.title-flex {
  display: flex;
  flex-direction: column;
}
.title {
  margin: 25px 6% 2px;
  font-weight: bold;
}
#title {
  margin: 11px 6%;
  border: none;
  padding: 5px;
}
#titleD {
resize: none;
height: 100px;
margin: 11px 6%;
border: none;
padding: 10px;
}

.update-button {
  width: 118px;
  height: 48px;
  margin: 11px 6%;
  border: none;
  padding: 5px;
  background-color: #EB9836;
  color: #f6f6f6;
  border-radius: 3px;
  font-size: 20px;
}
</style>