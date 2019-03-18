<template>
    <svg 
        :class="svgClass" 
        aria-hidden="true" 
        v-on="$listeners">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
// 语义化的隐藏 aria-hidden="true"
// xlink:href = id  id 是通过base.conf 配置的  options: { symbolId: 'icon-[name]' }
export default {
    name: 'SvgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        }
    }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor; /* 填充的颜色 */
  overflow: hidden;
}
</style>
