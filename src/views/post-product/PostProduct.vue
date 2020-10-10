<template>
  <div class="main-page">
    <div class="sub-header">
      <div class="sub-header__container">
<div class="sub-header__title">
      <h5>TechHeadsNZ</h5>
    </div>
    <div class="sub-header__img1">
      <!-- <img src="../../assets/images/<.png" alt=""> -->
     
       <!-- <img src="../../assets/images/<.png" alt=""> -->
 </div>
     <div class="sub-header__myaccount">

      <h5>My Account</h5>
     </div>
    <div class="sub-header__img2">
      <!-- <img src="../../assets/images/<.png" alt=""> -->
   
       <!-- <img src="../../assets/images/<.png" alt=""> -->
    </div>
          <div class="sub-header__titleitem">
      <h5>List an Item</h5>
          </div>
      </div>
      <div class="btn-go-back">
      <router-link class="btn-go-back-list-an-item" v-bind:to="'/'">Go Back</router-link>
      </div>
    </div>
    <div class="container-item">
      <div class="container-item-wrapper">
    <div class="title-post-item">
      <h1 class="title-post-item__h1">Post a New Item</h1>
    </div>
    <form v-on:submit.prevent="checkForm" class="form-post-item">
      <div class="inputfields">
      <div class="input-field-title">
        <label for="title">Title</label>
        <input v-model="product.title" type="text" name="title" id="title" />
      </div>
      
         <div class="input-field-price">
        <label for="price">Price</label>
        <input v-model="product.price" type="text" name="price" id="price" />
      </div>

       <div class="input-field-details">
        <label for="details">Details of the Product</label>
        <textarea v-model="product.details" type="text" name="details" id="details" />
      </div>

      <div class="input-field-description">
        <label for="description">Description of the Product</label>
        <textarea v-model="product.description" type="text" name="description" id="description" />
      </div>
      <div>
        <input class="btn-post" type="submit" value="Post Product" />
      </div>
       </div>
    </form>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: "",
      product: {
        title: "",
        price:"$",
        listed:"",
        username:"",
        details:"",
        description: ""

      },
    };
  },
  methods: {
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
@import "../../scss/variables.scss";
@import "../../scss/main.scss";

.main-page{
  background-color: #F3F3F3
}

.container-item{
  height: 100vh;
justify-content: center;
width: 100%;
display: flex;
}
.container-item-wrapper{
  width: 40%
}
.title-post-item{
  margin: 1.5rem 0;
  
&__h1{
  font-weight: bold;
  font-size: 1.5rem
}
}
.inputfields{
  text-align: center;
}
.input-field-title{
width: 100%;
justify-content: center;
text-align: start;

}
 .input-field-price{
margin:1rem 0;
justify-content: center;
text-align: start;

 }

.input-field-description{
justify-content: center;
text-align: start;
margin:1rem 0;


}
.input-field-details{
justify-content: center;
text-align: start;
margin:1rem 0;


}
.input-field-username{
justify-content: center;
text-align: start;
margin:1rem 0;


}
#title{
  border: none;
  background-color:#DBDBDB;
 width:100%;
 padding: 0.7rem 0.3rem;
}

#price{
  border: none;
  background-color:#DBDBDB;
 width: 100%;
 padding: 0.7rem 0.3rem;
}

#username-field{
  border: none;
  background-color:#DBDBDB;
 padding: 0.7rem 0.3rem;
  width: 100%;
}
#details{
  border: none;
  background-color:#DBDBDB;
 padding:0.5rem 0.3rem;
   resize: none;
   height: 100px;
    width:100%;
}

#description{
  border: none;
  background-color:#DBDBDB;
 width:100%;
 padding:0.5rem 0.3rem;
 height: 100px;
  resize: none;
}

.btn-go-back-list-an-item{
background-color: $secondary;
  border: 3px solid $secondary;
  padding: 0.4rem;
  color: white;
  font-size: 0.6rem;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none
}
.btn-go-back-list-an-item:hover{
text-decoration: none;
 color: white;
background-color: #ffb257;
border: 3px solid #ffb257;
}

.btn-post{
  background-color: $secondary;
  border: 3px solid $secondary;
  padding: 10px 50px;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
}

.sub-header{
  background-color: $light-grey;
padding: 20px;
  display: flex;
  justify-content: space-between;
  box-shadow:0 3px 0 0 rgba(188,190,192,0.69);
  &__container{
    display: flex
  }
  &__title{
    margin-right: 0.5rem
  }
  &__myaccount{
        margin-right: 0.5rem;
            margin-left: 0.5rem;
  }
  &__titleitem{
    margin-left: 0.5rem;
  }
}


//-------------------------------------------------------------

@media all and (max-width: 768px) {
.container-item-wrapper{
  width: 100%;
  margin: 2rem;
}
}

@media all and (max-width: 479px) {
.container-item-wrapper{
 margin: 2rem;
  width: 100%
}
}
</style>
