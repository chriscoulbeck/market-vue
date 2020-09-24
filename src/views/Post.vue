<template>
  <div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            loggedIn: ""
        }
    },
    created() {
        this.loggedIn = localStorage.loggedIn;
        if (!this.loggedIn) {
            this.$router.push({ path: "/login"})
        }
    }

}
</script>

<style>

</style>