<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Category 1</h3>
    <ul>
      <div class="category1">
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
      </div>
    </ul>
    <h3>Category 2</h3>
    <ul>
      <div class="category1">
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
      </div>

    </ul>
    <h3>Category 3</h3>
    <ul>
      <div class="category1">
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
      </div>

    </ul>
    <h3>All listings</h3>
    <ul>
      <div class="category1">
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
        <div class="category1__box">

        </div>
      </div>

    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

h1 { 
font-family: SeoulNamsan CL;
font-style: normal;
font-weight: normal;
font-size: 52px;
line-height: 52px;
width: 70%;
margin-left: 7%;
}
h3 {
  margin-left: 7%;
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

.category1 {
  display:flex;
  flex-direction: row;
  justify-content: center;


  &__box { 
    margin: 10px;
    width: 275px;
    height: 376px;
    background: #FFFFFF;
    border: 1px solid #C4C4C4;
  }
}
</style>
