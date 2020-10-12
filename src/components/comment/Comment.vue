<template>
  <article class="media">
  <figure class="media-left">
    <p class="image is-32x32">
      <img class="img-id" src="https://bulma.io/images/placeholders/128x128.png">
    </p>
  </figure>
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{comment.user}}</strong> <small>31m</small>
        <br>
        {{comment.body}}
      </p>
    </div>
  </div>
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
@import "../../scss/bulma";

.container {
  @include flex-direction(column);
}

.media-content {
  width: 100%;
}

p {
  width: 100%;
  overflow-wrap: break-word;
}

.img-id {
  border-radius: 50%;
}
</style>