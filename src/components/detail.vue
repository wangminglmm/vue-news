<template>
    <div class="tmpl">
        <h1>detail页面{{ids}}</h1>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    ids: function(){
        return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.tmpl{
    padding-top: 40px;

}
</style>