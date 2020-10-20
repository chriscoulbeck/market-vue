<template>
  <!-- Update listing -->
  <div class="title-wrapper">
    <form class="title-form" v-on:submit.prevent="checkForm">
      <h4>Edit</h4>
      <div class="title-flex">
        <!-- Listing title -->
        <div class="input-field">
          <label for="title">Listing title</label>
          <input
            v-model="product.title"
            type="text"
            name="title"
            id="titles"
            required
          />
        </div>

        <!-- Listing description -->
        <div class="input-field">
          <label for="description"> Description </label>
          <textarea
            v-model="product.description"
            maxlength="500"
            rows="5"
            type="details"
            name="description"
            id="titleD"
            required
          >
          </textarea>
        </div>

        <!-- Listing price -->
        <div class="input-field">
          <label for="price"> Price </label>
          <input
            v-model="product.price"
            maxlength="8"
            type="text"
            name="price"
            id="titles"
          />
        </div>

        <!-- Update button -->
        <input type="submit" value="Submit" />
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
      },
    };
  },
  methods: {
    checkForm: function() {
      this.errors = [];
      if (!this.product.title) {
        this.errors.push("Title Required");
      } else if (!this.product.description) {
        this.errors.push("Title Required");
      } else if (!this.product.price) {
        this.errors.push("Title Required");
      } else {
        this.editProduct(this.product);
      }
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
    },
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
  },
};
</script>

<style lang="scss">
@import "../../scss/variables";

h4 {
  margin-top: 20px;
  line-height: 2.7rem;
  font-weight: 500;
  padding-bottom: 15px;
  font-size: 24px;

}

.input-field {
  @include flex-direction(column);
  padding-bottom: 20px;
  & label {
    padding-bottom: 10px;
  }
  & input {
    padding: 10px;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
  }
}

input,
textarea {
  padding: 10px;
  font-size: 14px;
  line-height: 18px;
}

.title-wrapper {
  margin: auto;
  padding: 0 20px;
  max-width: 500px;
}

.title-form {
  border-radius: 6px;
}
.title-flex {
  display: flex;
  flex-direction: column;
}
.title {
  font-size: 24px;
  font-weight: 300;
}

input[type="submit"] {
  width: 150px;
    background: $secondary;
    padding: 15px;
    color: white;
    border: none;
    border-radius: 3px;
    font-size: 16px;
    margin-bottom: 30px;
    &:hover {
      background: $secondary-tint;
      cursor: pointer;
    }
}
</style>
