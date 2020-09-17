<template>
  <div class="footer">
    <div>
      <input 
        class="footer__searchBar"/>
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f2f2f2"
          stroke-width="2"
          class="footer__searchButton">

          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyFooter"
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  height: 95px;
  background-color: #455a6c;

  &__searchBar {
    position: relative;
    background-color: #f2f2f2;
    width: 40%;
    height: 30px;
    top: 20px;
    border: none;
  }

  &__searchButton {
        position: relative;
        top: 31px;
        padding: 4px;
        background-color:#EB9836;

        &:hover {
            stroke: #333;
        }
  }
}
</style>