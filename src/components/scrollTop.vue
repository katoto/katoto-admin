<template>
  <a
    :class="[scrollTop<400?'hide':'']"
    href="javascript:;"
    class="scrollTop"
    @click="toTop">
    ScrollTop
  </a>
</template>

<script>
export default {
    components: {
    },
    data () {
        return {
            scrollTop: 0
        }
    },
    computed: {
    },
    watch: {
    },
    mounted () {
        this.$nextTick(() => {
            window.addEventListener("scroll", this.handleScroll, false)
        })
    },
    destroyed () {
        window.removeEventListener("scroll", this.handleScroll, true)
    },
    methods: {
        handleScroll () {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        },
        toTop () {
            const c = this.scrollTop
            if (c > 0) {
                window.requestAnimationFrame(this.toTop)
                window.scrollTo(0, c - c / 4)
            }
        }
    }
}
</script>
<style scoped lang="less">
.scrollTop {
  position: fixed;
  bottom: 100px;
  right: 10px;
  z-index: 6;
  display: block;
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 4px;
  font-size: 0;
  text-indent: -9999px;
  background: rgba(0, 0, 0, 0.25) url("../assets/img/icon-arrow-down.png")
    no-repeat center;
  background-size: 14px;
  transform: rotate(180deg);
}
@media (max-width: 768px) {
  .scrollTop {
    bottom: 10/75rem;
    right: 10/75rem;
    width: 70/75rem;
    height: 70/75rem;
  }
}
</style>
