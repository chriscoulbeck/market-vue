<template>
  <div class="home">
    <ViewList/>
  </div>
</template>

<script>
// @ is an alias to /src
import ViewList from "@/components/view-list/ViewList.vue";

export default {
  name: "Home",
  components: {
    ViewList,
  },
};
</script>
