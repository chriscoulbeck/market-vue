<template>
        <div class="category__appleBox">
          <img class="category__appleImg" v-bind:src="'https://picsum.photos/200/300'">
          <div class="category__appleListing">
            <h6  class="category__appleLocation">{{ project.location }}</h6>
            <h6 class="category__appleDate">{{ project.date }}</h6>
          </div>
          <div class="category__appleDetails">
            <h2 class="category__appleTitle">{{ project.title }}</h2>
            <p class="category__appleDescription">{{ project.description }}</p>
          </div>
          <h2 class="category__applePrice">{{ project.price }}</h2>
        </div>
</template>

<style lang="scss">
.category {
  display:flex;
  flex-direction: row;
  justify-content: center;


  &__appleBox { 
    margin: 10px;
    width: 20%;
    height: 100%;
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
  }
  &__appleImg {
    width: 100%;
    height: 197px;
  }
  &__appleListing {
    display:flex;
    justify-content:space-evenly;
  }
  &__appleTitle {
    padding: 0;
    margin: 0;
  }
    &__appleDescription {
    padding: 0;
    margin: 0;
  }
  &__applePrice {
    display:flex;
    flex-direction:row-reverse;
    margin-right: 20px;
  }
  @media only screen and (max-width: 1266px) {
  .category {
  display:flex;
  flex-direction: column;
    &__appleBox {
      width: 250px;
      height: 100%;
    }
  }
}
  @media only screen and (max-width: 1060px) {
  .category {
  display:flex;
  flex-direction: column;
    &__appleBox {
      width: 250px;
      height: 100%;
    }
  }
}
@media only screen and (max-width: 627px) {
  .category {
    &__appleBox {
      width: 250px;
      height: 100%;
    }
  }
}
@media only screen and (max-width: 576px) {
  .category {
    &__appleBox {
      width: 230px;
    }
  }
}
@media only screen and (max-width: 537px) {
  .category {
    &__appleBox {
      width: 210px;
      height: 100%;
    }
  }
}
}



</style>

<script>
export default {
    name: "AppleListingCard",
      
    data: function() {
      return {
        // Dummy data
        project: {
          title: "Dummy Title",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacus lacus, vulputate et facilisis at, suscipit id sem.",
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
