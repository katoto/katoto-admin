<template>
  <div class="app-container">
    <el-tabs 
      v-model="activeName" 
      type="card" 
      @tab-click="handleClick">
      <el-tab-pane 
        label="发送通知" 
        name="first">
        <sendmsg/>
      </el-tab-pane>
      <el-tab-pane 
        label="通知列表" 
        name="second">
        <msglist ref="msglistDom"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import sendmsg from "@/views/main/mailmsg/sendmsg"
import msglist from "@/views/main/mailmsg/msglist"

export default {
    components:{
        sendmsg,
        msglist
    },
    data () {
        return {
            list: null,
            listLoading: true,
            activeName: "first"
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        handleClick (tab, event) {
            if (tab && tab.name === "second") {
                this.$refs.msglistDom.getnoticeList(1, true)
            }
        },
        fetchData () {
            this.listLoading = true
        }
    }
}
</script>
