<template>
  <article class="comment">
    <p class="comment-body">{{comment.body}}</p>
    <p class="comment-user">{{comment.user}}</p>
</article>
</template>

<script>
export default {
    name: "comment",
    props: ["comment"]
}
</script>

<style lang="scss" >
@import "../../scss/variables";

.comment {
  @include flex-direction(column);
  padding: 5px 0;
}

.comment-user {
  font-size: 0.9em;
}

.comment-body {
  font-size: 1.1em;
}

p {
  width: 100%;
  overflow-wrap: break-word;
  font-family: lato;
}
</style>