<template>
  <div class="page">
    <ul :style="{ visibility: ready ? 'visible' : 'hidden' }">
      <transition
        v-for="(item, index) in list"
        :key="item"
        name="item">
        <li
          v-if="list.length - (index) <= 4"
        >
          {{ item }}{{ index }}
        </li>
      </transition>
    </ul>
  </div>
</template>

<script>
export default {
    data () {
        return {
            list: [
                "123", "456", "789", "1234"
            ],
            ready: false
        }
    },
    mounted () {
        setInterval(() => {
            this.list.push(Date.now())
        }, 3000)
        setTimeout(() => {
            this.ready = true
        }, 300)
    }
}
</script>

<style lang="less" scoped>
    .page {
        ul {
            position: fixed;
            right: 10px;
            top: 100px;
            li {
                background: #DDD;
                border: solid 1px #DDD;
                list-style: none;
                padding: 20px;
                min-width: 300px;
                border-radius: 5px;
                color: #333;
                margin-bottom: 20px;
                position: absolute;
                top: 0px;
                right: 0px;
                transition: all .3s;
                animation: 300ms entry;
                transform: translate(0px, 400px);
                &:nth-child(1) {
                    transform: translate(0, 80px)
                }
                &:nth-child(2) {
                    transform: translate(0, 160px)
                }
                &:nth-child(3) {
                    transform: translate(0, 240px)
                }
                &:nth-child(4) {
                    transform: translate(0, 320px)
                }
            }
        }
    }
    .item-leave {
        opacity: 1;
        transform: translate(0px, 80px) !important;
    }
    .item-leave-active {
        opacity: 0.5;
    }
    .item-leave-to  {
        opacity: 0;
        transform: translate(200px, 80px) !important;
    }

    .item-enter {
        opacity: 0;
        transform: translate(200px, 400px) !important;
    }
    .item-enter-active {
        opacity: 0.5;
    }
    .item-enter-to  {
        opacity: 1;
        transform: translate(0px, 400px) !important;
    }
</style>
