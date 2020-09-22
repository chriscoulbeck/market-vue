<template>
        <div class="category__allBox">
          <img class="category__allImg" v-bind:src="'https://picsum.photos/200/300'">
          <div class="category__allListing">
            <h6 class="category__allLocation">{{ project.location }}</h6>
            <h6 class="category__allDate">{{ project.date }}</h6>
          </div>
          <div class="category__allDetails">
            <h2 class="category__allTitle">{{ project.title }}</h2>
            <p class="category__allDescription">{{ project.description }}</p>
          </div>
          <h2 class="category__allPrice">{{ project.price }}</h2>
        </div>
</template>

<style lang="scss">
.category {
  display:flex;
  flex-direction: row;
  justify-content: center;


&__allBox { 
    margin: 10px;
    width: 275px;
    height: 376px;
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
  }
  &__allImg {
    width: 100%;
    height: 197px;
  }
  &__allListing {
    display:flex;
    justify-content:space-evenly;
  }
  &__allTitle {
    padding: 0;
    margin: 0;
  }
    &__allDescription {
    padding: 0;
    margin: 0;
  }
  &__allPrice {
    display:flex;
    flex-direction:row-reverse;
    margin-right: 20px;
  }
}
</style>

<script>
export default {
    name: "AllListingCard",
      
    data: function() {
      return {
        // Dummy data
        project: {
          title: "Dummy Title",
          description: "Dummy description",
          price: "$150",
          img: "https://picsum.photos/200/300",
          location: "Christchurch, NZ",
          date: "19/04/20"
        },
        expanded: false, // If the listing has been expanded
        currentIndex: 0
      }
    },
    props: {
      title: String,
      description: String,
      price: String,
      img: String,
      location: String,
      date: String
    },
}
</script>
