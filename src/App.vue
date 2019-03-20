<template>
    <div id="app">
        <router-view/>
        <scrollTop></scrollTop>
    </div>
</template>

<script>
import scrollTop from '@/components/scrollTop.vue'

export default {
    name: 'App',
    components:{
        scrollTop
    }
}
</script>
