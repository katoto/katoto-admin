<template>
  <div>
    <!-- 勾选需要的语言 -->
    <span style="font-size:14px;line-height:28px">勾选即表示发送该语言站内信！</span>
    <el-checkbox-group v-model="langList">
      <el-checkbox label="English"></el-checkbox>
      <el-checkbox label="India"></el-checkbox>
    </el-checkbox-group>
    <div style="margin:14px 0;border:1px solid #ccc;padding:8px">
      <el-radio v-model="selUid" label="1">全体发送</el-radio>
      <el-radio v-model="selUid" label="-1">部分发送</el-radio>
      <section class="someSend" style="margin-top:20px" v-if="selUid==='-1'">
        <el-input size="small" v-model="someUid" placeholder="请输入uid用'|'区分"></el-input>
        <el-button size="small" type="primary" @click="inpUidFn">批量导入</el-button>
      </section>
    </div>
    <!-- 语言区 -->
    <div v-for="(item,index) in langObj" :key="index">
      <p style="color:#F56C6C;font-weight:700">{{ item.langtitle }} 通知:</p>
      <el-form size="small" ref="form" :model="item.langmsg" label-width="110px">
        <el-form-item label="站内信标题:">
          <el-input placeholder="输入48个字符" v-model="item.langmsg.title"></el-input>
        </el-form-item>
        <el-form-item label="赠送金额:">
          <el-input placeholder="填写则发送奖励通知！" v-model="item.langmsg.money"></el-input>
        </el-form-item>
        <el-form-item label="站内信内容:">
          <el-input placeholder="输入48个字符" type="textarea" v-model="item.langmsg.desc"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <section style="float:right;">
      <el-button type="warning" @click="sendmsg">发送</el-button>
      <el-button type="info" @click="clearmsg">清空</el-button>
    </section>
    
    <!--导入UId弹窗 -->
    <el-dialog title="注意！" :visible.sync="dialogTableVisible" @open="openDialog">
      <div>
        <span>导入的uid信息:</span>
        <hr>
        <el-input size="small" readonly placeholder="导入的信息(只读)" v-model='someUid'></el-input>
      </div>
      <div style="margin-top:10px">
        <input ref="upload" type="file"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uplang">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false" >确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
    data () {
        return {
            dialogTableVisible: false,
            langList: ['English', 'India'],
            langObj: [{
              langtitle: 'English',
              langmsg: {
                title: null,
                money: null,
                desc: null
              }
            },
            {
              langtitle: 'India',
              langmsg: {
                title: null,
                money: null,
                desc: null
              }
            }],
            selUid: '1',
            someUid: null,
            langUidArr: []
        }
    },
    watch:{
      langList(val){
        // 展现对应的语言
        this.langObj = []
        val.forEach((item, index)=>{
          this.langObj.push({
              langtitle: item,
              langmsg: {
                title: null,
                money: null,
                desc: null
              }
            })
        })
        console.log(this.langObj)
      }
    },
    methods:{
      inpUidFn(){
        this.dialogTableVisible = true
      },
      uplang(){
        this.someUid = null
        this.dialogTableVisible = false
      },
      sendmsg(){
        console.log(this.langObj)
      },
      clearmsg() {
        if(this.langObj.length>0){
          this.langObj.forEach((item,index)=>{
            item.langmsg = {
              title: null,
              money: null,
              desc: null
            }
          })
        }
      },
      handleClick(tab, event) {
          console.log(tab, event);
      },
      openDialog(){
        this.$nextTick(()=>{
          let thisRef = this.$refs.upload
          if(thisRef){
            thisRef.removeEventListener('change', this.readExcel)
            thisRef.addEventListener('change', this.readExcel)
          }
        })
      },
      readExcel(e){
          // 表格数据导入
          let that = this;
          const files = e.target.files;
          if(files.length<=0){
            this.$message({
              message: 'error 请选择一个文件!',
              type: 'warning'
            })
            return false;
          }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
            this.$message({
              message: '上传格式不正确，请上传xls或者xlsx格式',
              type: 'error'
            })
            return false;
          }
          const fileReader = new FileReader();
          fileReader.onload = (ev) => {
            try {
                const data = ev.target.result;
                const workbook = XLSX.read(data, {
                  type: 'binary'
                });
                const wsname = workbook.SheetNames[0];//取第一张表
                this.langUidArr = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
                console.log(this.langUidArr);
            } catch (e) {
                return false;
            }
          };
          fileReader.readAsBinaryString(files[0]);
      }
    }
}
</script>
<style scoped>
.someSend .el-input{
  width: 50%;
}

</style>