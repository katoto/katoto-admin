<template>
    <div class="dashboard-container">
        <div class="dashboard-text">Hello : {{ userinfo.username }}</div>
        <el-carousel 
            :interval="5000" 
            height="400px">
            <el-carousel-item 
                v-for="item in imgArr" 
                :key="item">
                <div>
                    <img 
                        :src="item" 
                        class="bannerClass" 
                        alt="">
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import img_banner1 from '@/assets/madsports/banner1.png'
import img_banner2 from '@/assets/madsports/banner2.png'
import img_banner3 from '@/assets/madsports/banner3.png'

export default {
    name: 'Dashboard',
    data() {
        return {
            imgArr: [img_banner1, img_banner2, img_banner3]
        }
    },
    computed: {
        ...mapGetters([
            'userinfo'
        ])
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.bannerClass {
  display: block;
  width: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
