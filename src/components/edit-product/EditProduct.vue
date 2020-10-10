<template>
<!-- Update listing -->
  <div class="title-wrapper">
    <h2>UPDATE YOUR LISTING DETAILS</h2>
      <form class="title-form" v-on:submit.prevent="checkForm">
      <div class="title-flex">
        <!-- Listing title -->
        <label class="title" for="title">Listing title</label>
        <input v-model="product.title" maxlength="16" placeholder="Samsung Galaxy S7+" type="text" name="title" id="titles" required/>

        <!-- Listing details -->
        <label class="title" for="details">Product details</label>
        <input v-model="product.details" maxlength="26" type="text" name="details" id="titles" required />

        <!-- Listing description -->
        <label class="title" for="description"> Description </label>
        <textarea  v-model="product.description" maxlength="500" type="details" name="description" id="titleD" required >
        </textarea>

        <!-- Listing price -->
        <label class="title" for="price"> Price </label>
        <input v-model="product.price" maxlength="8" placeholder="$" type="text" name="price" id="titles" />

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
        location: null,
        date: null,
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

h2 {
  margin-top:20px;
  line-height: 2.7rem;
  padding: 25px;
  font-weight: bold;
  font-size:40px;
}

.title-wrapper {
  margin: 0 10% 10% 10%;
}

.title-form {
  background-color: #E6E7E8;
  padding: 9px;
  border-radius:6px;
}
.title-flex {
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 24px;
  margin: 50px 6%;
  font-weight: bold;
}
#titles {
  margin: 1px 6% !important;
  padding: 5px;
}
#titleD {
resize: none;
height: 100px;
margin: 11px 6%;
padding: 10px;
}

.update-button {
  width: 118px;
  height: 48px;
  margin: 50px 6%;
  border: none;
  padding: 5px;
  background-color: #EB9836;
  color: #f6f6f6;
  border-radius: 3px;
  font-size: 20px;
}
</style>