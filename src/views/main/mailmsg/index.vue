<template>
  <div class="app-container">
    <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="发送通知" name="first">
        <sendmsg></sendmsg>
      </el-tab-pane>
      <el-tab-pane label="通知列表" name="second">
        <msglist></msglist>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import sendmsg from '@/views/main/mailmsg/sendmsg'
import msglist from '@/views/main/mailmsg/msglist'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      activeName: 'first'
    }
  },
  created() {
    this.fetchData()
  },
  components:{
    sendmsg,
    msglist
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    fetchData() {
      this.listLoading = true
    },
  }
}
</script>
