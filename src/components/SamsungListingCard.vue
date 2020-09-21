<template>
        <div class="category__samsungBox">
          <img class="category__samsungImg" v-bind:src="'https://picsum.photos/200/300'">
          <div class="category__samsungListing">
            <h6 class="category__samsungLocation">{{ project.location }}</h6>
            <h6 class="category__samsungDate">{{ project.date }}</h6>
          </div>
          <div class="category__samsungDetails">
            <h2 class="category__samsungTitle">{{ project.title }}</h2>
            <p class="category__samsungDescription">{{ project.description }}</p>
          </div>
          <h2 class="category__samsungPrice">{{ project.price }}</h2>
        </div>
</template>

<style lang="scss">
.category {
  display:flex;
  flex-direction: row;
  justify-content: center;


  &__allbox, &__appleBox, &__samsungBox, &__pcBox  { 
    margin: 10px;
    width: 275px;
    height: 376px;
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
  }
  &__appleImg {
    width: 100%;
    height: 197px;
  }
}
</style>

<script>
export default {
    name: "SamsungListingCard",
      
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
