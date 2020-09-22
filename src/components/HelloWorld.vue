<template>
  <div class="hello">
    <h1>Welcome to the worlds most beautiful site</h1>
    <h3>Apple</h3>
    <ul>
      <div v-bind:to="'/'" class="category">
        <apple-listing-card></apple-listing-card>
        <apple-listing-card></apple-listing-card> 
        <apple-listing-card></apple-listing-card>
        <apple-listing-card></apple-listing-card>
      </div>
    </ul>

    <h3>Samsung</h3>
    <ul>
      <div v-bind:to="'/'" class="category">
        <samsung-listing-card></samsung-listing-card>
        <samsung-listing-card></samsung-listing-card>
        <samsung-listing-card></samsung-listing-card>
        <samsung-listing-card></samsung-listing-card>
      </div>
    </ul>

    <h3>PC</h3>
    <ul>
      <div v-bind:to="'/'" class="category">
        <pc-listing-card></pc-listing-card>
        <pc-listing-card></pc-listing-card>
        <pc-listing-card></pc-listing-card>
        <pc-listing-card></pc-listing-card>
      </div>
    </ul>
    
    <h3>All listings</h3>
    <ul>
      <div v-bind:to="'/'" class="category">
        <all-listing-card></all-listing-card>
        <all-listing-card></all-listing-card>
        <all-listing-card></all-listing-card>
        <all-listing-card></all-listing-card>
      </div>
    </ul>

  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h1 { 
font-family: SeoulNamsan CL;
font-style: normal;
font-weight: normal;
font-size: 52px;
line-height: 52px;
}
h3 {
  // margin-left: 7%;
  padding-left: 10%;
  text-align: left;
  font-size: 24px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.category {
  margin-left: 5%;
  margin-right: 5%;
  display:flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}

@media only screen and (max-width: 1150px) {
  .category {
    display: flex;
    margin-left: 10%;
    margin-right: 10%;
  }
  h3 {
  margin-left: 15%;
  }
}

@media only screen and (max-width: 775px) {
  .category {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
    
  }
  h1 {
    text-align: center;
    margin: 0;
    font-size: 30px;
    padding: 30px;
  }
    h3 {
    text-transform: uppercase;
    display: inline;
    text-align: center;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid;
    width: 50%;
  }
}
</style>

<script>
import AppleListingCard from "./AppleListingCard.vue";
import SamsungListingCard from "./AppleListingCard.vue";
import PcListingCard from "./PcListingCard.vue";
import AllListingCard from "./AllListingCard.vue";


export default {
    components: {
    "apple-listing-card": AppleListingCard,
    "samsung-listing-card": SamsungListingCard,
    "pc-listing-card": PcListingCard,
    "all-listing-card": AllListingCard,
  },
}
</script>
