<template>
  <div id="app">
    <router-view/>
    <scrollTop/>
  </div>
</template>

<script>
import scrollTop from "@/components/scrollTop.vue"

export default {
    components:{
        scrollTop
    }
}
</script>
