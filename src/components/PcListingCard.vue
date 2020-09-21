<template>
        <div class="category__pcBox">
          <img class="category__pcImg" v-bind:src="'https://picsum.photos/200/300'">
          <div class="category__pcListing">
            <h6 class="category__pcLocation">{{ project.location }}</h6>
            <h6 class="category__pcDate">{{ project.date }}</h6>
          </div>
          <div class="category__pcDetails">
            <h2 class="category__pcTitle">{{ project.title }}</h2>
            <p class="category__pcDescription">{{ project.description }}</p>
          </div>
          <h2 class="category__pcPrice">{{ project.price }}</h2>
        </div>
</template>

<style lang="scss">
.category {
  display:flex;
  flex-direction: row;
  justify-content: center;


  &__allBox, &__appleBox, &__samsungBox, &__pcBox  { 
    margin: 10px;
    width: 275px;
    height: 376px;
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
  }
  &__pcImg {
    width: 100%;
    height: 197px;
  }
  &__pcListing {
    display:flex;
    justify-content:space-evenly;
  }
  &__pcTitle {
    padding: 0;
    margin: 0;
  }
    &__pcDescription {
    padding: 0;
    margin: 0;
  }
  &__pcPrice {
    display:flex;
    flex-direction:row-reverse;
    margin-right: 20px;
  }
}
</style>

<script>
export default {
    name: "PcListingCard",
      
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
