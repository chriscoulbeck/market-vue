<template>
  <div class="comment">
      <p class="comment__body">{{comment.body}}</p>
      <p class="comment__user">{{comment.user}}</p>
  </div>
</template>

<script>
export default {
    name: "comment",
    props: ["comment"]
}
</script>

<style lang="scss" >
@import "../../scss/main.scss";
</style>