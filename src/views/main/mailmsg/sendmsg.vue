<template>
  <div>
    <!-- 勾选需要的语言 -->
    <span style="font-size:14px;line-height:28px">语言通知为必填项！</span>
    <!-- <span style="font-size:14px;line-height:28px">勾选即表示发送该语言站内信！</span> -->
    <!-- <el-checkbox-group v-model="langList">
            <el-checkbox label="en"/>
            <el-checkbox label="hi"/>
        </el-checkbox-group> -->
    <div style="margin:14px 0;border:1px solid #ccc;padding:8px">
      <el-radio-group v-model="selUid">
        <el-radio :label="'1'">全体发送</el-radio>
        <el-radio :label="'-1'">部分发送</el-radio>
        <el-radio :label="'2'">纯安卓</el-radio>
        <el-radio :label="'3'">纯IOS</el-radio>
      </el-radio-group>
      <section
        v-if="selUid==='-1'"
        class="someSend"
        style="margin-top:20px">
        <el-input
          v-model="someUid"
          type="textarea"
          size="small"
          placeholder="请输入uid用','区分（部分发送不区分平台哦~）"
          @blur="testUid"/>
        <el-button
            style="margin-top:8px"
          size="small"
          type="primary"
          @click="inpUidFn">批量导入</el-button>
      </section>
    </div>
    <!-- 语言区 -->
    <div
      v-for="(item,index) in langObj"
      :key="index">
      <p style="color:#F56C6C;font-weight:700">{{ item.langtitle }} 通知:</p>
      <el-form
        ref="form"
        :model="item.langmsg"
        size="small"
        label-width="110px">
        <el-form-item label="站内信标题:">
          <el-input
            v-model="item.langmsg.title"
            placeholder="输入48个字符"
            @input="checklen"/><span class="formTitle">{{ item.langmsg.title.length }}/48字符</span>
        </el-form-item>
        <el-form-item label="赠送金额:">
          <el-input
            v-model="item.langmsg.amount"
            type="number"
            placeholder="填写则发送奖励通知！"/>
        </el-form-item>
        <el-form-item label="站内信内容:">
          <el-input
            v-model="item.langmsg.content"
            placeholder="输入500个字符"
            type="textarea"
            @input="checklen_content"/><span class="formContent">{{ item.langmsg.content.length }}/500字符</span>
        </el-form-item>
      </el-form>
    </div>
    <section style="float:right;">
      <el-button
        type="warning"
        @click="sendmsg">发送</el-button>
      <el-button
        type="info"
        @click="clearmsg">清空</el-button>
    </section>

    <!--导入UId弹窗 -->
    <el-dialog
      :visible.sync="dialogTableVisible"
      title="注意！"
      @open="openDialog">
      <div>
        <span>导入的uid信息:</span>
        <hr>
        <el-input
            type="textarea"
          v-model="someUid"
          size="small"
          readonly
          placeholder="导入的信息(只读)"/>
      </div>
      <div style="margin-top:10px">
        <input
          ref="upload"
          type="file">
      </div>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="uplang">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogTableVisible = false" >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx"

export default {
    data () {
        return {
            dialogTableVisible: false,
            // langList: ['en', 'hi'],
            langObj: [{
                langtitle: "en",
                langmsg: {
                    title: "",
                    amount: "",
                    content: ""
                }
            },{
                langtitle: "hi",
                langmsg: {
                    title: "",
                    amount: "",
                    content: ""
                }
            }
            ],
            selUid: "1",
            someUid: null,
            langUidArr: []
        }
    },
    watch:{
        // langList(val){
        // // 展现对应的语言
        //     this.langObj = []
        //     val.forEach((item, index)=>{
        //         this.langObj.push({
        //             langtitle: item,
        //             langmsg: {
        //                 title: '',
        //                 amount: '',
        //                 content: ''
        //             }
        //         })
        //     })
        // }
    },
    beforeDestroy () {
        if(this.$refs.upload){
            this.$refs.upload.removeEventListener("change", this.readExcel)
        }
    },
    methods:{
        checklen_content (val) {
            if (val && val.length > 500) {
                this.$message({
                    type:"error",
                    message: "超过500字符限制长度"
                })
            }
        },
        checklen (val) {
            if (val && val.length > 48) {
                this.$message({
                    type:"error",
                    message: "超过48字符限制长度"
                })
            }
        },
        testUid (val) {
            let reg = /^[0-9,]+$/g
            if (this.someUid && !reg.test(this.someUid)) {
                this.$message({
                    type: "error",
                    message: "uid格式不正确"
                })
            }
        },
        inpUidFn () {
            this.dialogTableVisible = true
        },
        uplang () {
            this.someUid = null
            this.dialogTableVisible = false
        },
        async sendmsg () {
            // 站内信发送
            if (this.langObj && this.langObj.length > 0) {
                let isempty = this.langObj.some((item) => {
                    return item.langmsg.title === "" || item.langmsg.content === "" || !item.langmsg.title || !item.langmsg.content
                })
                if (isempty) {
                    this.$message({
                        type:"error",
                        message: "标题和内容不能为空"
                    })
                    return false
                }
                let istestNaN = this.langObj.some((item) => {
                    return isNaN(item.langmsg.amount)
                })
                if (istestNaN) {
                    this.$message({
                        type:"error",
                        message: "赠送金额只能是数字"
                    })
                    return false
                }
                let tipsmsg = null
                let islen = this.langObj.some((item) => {
                    if (item.langmsg.title.length>48) {
                        tipsmsg = item.langtitle + " 通知下的标题超过48字符限制"
                        return true
                    }
                    if (item.langmsg.content.length>500) {
                        tipsmsg = item.langtitle + " 通知下的内容超过500字符限制"
                        return true
                    }
                })
                if (islen) {
                    this.$message({
                        type:"error",
                        message: tipsmsg
                    })
                    return false
                }
                let baseamount = this.langObj[0].langmsg.amount
                let isequ = this.langObj.every((item) => {
                    return item.langmsg.amount === baseamount
                })
                if (!isequ) {
                    this.$message({
                        type:"error",
                        message: "赠送金额必须一样"
                    })
                    return false
                }
                let sendObj = {
                }
                let to_uids = ""
                if (this.selUid === "-1") {to_uids = this.someUid}
                if (this.selUid === "2") {to_uids = "-1"}
                if (this.selUid === "3") {to_uids = "-2"}
                Object.assign(sendObj,{
                    to_uids
                })
                let obj = {
                }
                this.langObj.forEach((item) => {
                    obj[item.langtitle] = {
                        ...item.langmsg
                    }
                })
                sendObj.notice = {
                    ...obj
                }
                await this.$store.dispatch("noticeAdd", sendObj).then((res) => {
                    if (res) {
                        this.$message({
                            type:"success",
                            message: "发送成功"
                        })
                        this.clearmsg()
                    }
                })
                console.log(sendObj)
            } else {return false}
        },
        clearmsg () {
            if (this.langObj.length>0) {
                this.langObj.forEach((item,index) => {
                    item.langmsg = {
                        title: "",
                        amount: "",
                        content: ""
                    }
                })
            }
        },
        handleClick (tab, event) {
            console.log(tab, event)
        },
        openDialog () {
            this.$nextTick(() => {
                let thisRef = this.$refs.upload
                if (thisRef) {
                    thisRef.removeEventListener("change", this.readExcel)
                    thisRef.addEventListener("change", this.readExcel)
                }
            })
        },
        readExcel (e) {
            // 表格数据导入
            let that = this
            const files = e.target.files
            if (files.length<=0) {
                this.$message({
                    message: "error 请选择一个文件!",
                    type: "warning"
                })
                return false
            } else if (!/\.(xls|xlsx|txt)$/.test(files[0].name.toLowerCase())) {
                this.$message({
                    message: "上传格式不正确，请上传txt格式",
                    type: "error"
                })
                return false
            }
            const fileReader = new FileReader()
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result
                    let nowVal = ''
                    try {
                        data.split("\r\n").map(item => {
                            nowVal += item + ','
                        })
                    } catch (e) {
                        this.error(e.toString())
                    }
                    this.someUid = nowVal.slice(0, -1)
                } catch (e) {
                    return false
                }
            }
            fileReader.readAsBinaryString(files[0])
        }
    }
}
</script>
<style scoped>
.el-form {
    position: relative;
}
.el-form .formTitle, .el-form .formContent{
    position: absolute;
    right: 10px;
    top: 0;
    color: #ddd;
}
.someSend .el-input{
  width: 50%;
}

</style>
