<template>
  <div class="app-container">
    <section>
      <div>
        <section class="clear">
          <!-- 语言过滤选择 -->
          <section style="float: left;">
            <template>
              <span style="font-size: 14px">page筛选: </span>
              <el-select size="small" @change="page_lan_Evt" change="aa" v-model="selPage" placeholder="请选择">
                  <el-option
                  v-for="item in selPageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <template>
              &nbsp;<span style="font-size: 14px">language筛选: </span>
              <el-select size="small" @change="page_lan_Evt" v-model="selLang" placeholder="请选择">
                  <el-option
                  v-for="item in selLangOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </section>
          <div style="float: right; margin-right:30px">
            <el-button @click="addlangs()" type="primary" plain size="small">
              新增语言
            </el-button>
            <el-button @click="addLine()" type="warning" size="small">
              新增文案
            </el-button>
            <el-button @click="modifylangs()" type="primary" size="small" icon="el-icon-plus">
              批量导入当前语言
            </el-button>
            <el-button @click="before_exportJSON()" type="error" size="small">
              导出当前语言
            </el-button>
          </div>
        </section>
        <el-table
          :data="backlangArr"
          stripe
          highlight-current-row
          style="width: 100%">
          <el-table-column
            width="100"
            label="序号">
            <template scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="string_id"
            label="string_id">
          </el-table-column>
          <el-table-column
            prop="page"
            label="page">
          </el-table-column>
          <el-table-column
            prop="language"
            label="language">
          </el-table-column>
          <el-table-column
            prop="uptime"
            label="uptime">
          </el-table-column>
          <el-table-column
            prop="content"
            label="content">
          </el-table-column>
          <el-table-column
            label="状态操作"
            width="200px">
            <template slot-scope="scope">
              <el-button @click="before_js_modify( scope.row )" type="primary" size="small">
                修改
              </el-button>
              <el-button @click="before_js_del( scope.row )" type="danger" size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 提款申请 -->

    <!--语言弹窗 -->
    <el-dialog title="注意！" :visible.sync="dialogTableVisible" @open="openDialog" v-loading="uploading">
      <div>
        <span>请输入文件语言:</span>
        <hr>
        <el-input size="small" placeholder="请输入文件语言(en\zh\india)" v-model='inputLan'></el-input>
      </div>
      <div style="margin-top:10px">
        <input ref="upload" type="file"/>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="uplang">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除语言 -->
    <el-dialog
      title="注意！"
      :visible.sync="onlineVisible"
      width="30%">
      <span>{{ onlineMsg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onlineVisible = false">取 消</el-button>
        <el-button type="danger">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增语言 -->
    <el-dialog size="small" width="600px" :title="langTitleName" center
               :visible.sync="showlangDialog">
      <el-form ref="form" :model="addform" label-width="80px">
        <el-form-item label="StringID">
          <el-input size="small" v-model="addform.stringid" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="page">
          <el-input size="small" v-model="addform.page" class="common-input"></el-input>
        </el-form-item>
        <template v-for="(item,index) in selLangOptions">
        <el-form-item :label="item.value" :key="index">
          <el-input size="small" v-model="addform.lang[item.value]" class="common-input"></el-input>
        </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="onAddSubmit">立即新增</el-button>
          <el-button @click="showlangDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
    <!-- 修改语言 -->
    <el-dialog size="small" width="600px" title="修改语言" center :visible.sync="showModifyDialog">
      <el-form ref="form" :model="modifyData" label-width="80px">
        <el-form-item label="StringID">
          <el-input size="small" disabled="disabled" v-model="modifyData.StringID" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="page">
          <el-input size="small" disabled="disabled" v-model="modifyData.page" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="language">
          <el-input size="small" disabled="disabled" v-model="modifyData.language" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="oldArticle">
          <el-input size="small" disabled="disabled" v-model="modifyData.oldArticle" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="translation" class="addHeight">
          <el-input size="small" placeholder="输入修改的文案" v-model="modifyData.newArticle" class="common-input"></el-input>
        </el-form-item>
        <el-checkbox v-model="modifyDialog_label">是否有通配符？？？</el-checkbox>
        <el-form-item class="common-input">
          <el-button type="primary" @click="onAddSubmit">立即修改</el-button>
          <el-button @click="showModifyDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { wait } from '@/utils/utils.js'
import FileSaver from 'file-saver'

export default {
  data() {
    return {
      modifyDialog_label: false,
      showModifyDialog: false, // 修改语言弹窗
      modifyData: {}, // 修改的文案
      dialogTableVisible: false, // 上传文件
      uploading: false, // 上次loading
      inputLan: null,
      langTitleName: '新增文案',
      showlangDialog: false, // 新增文案弹窗
      langArr: [],  // excel语言列表
      backlangArr: null, // ajax 数据
      selPage: '',
      selPageOptions: [
        {
          value: '',
          label: 'All'
        }, {
          value: '1001',
          label: 'A'
        }, {
          value: '2001',
          label: 'B'
        }, {
          value: '2000',
          label: 'C'
        }
      ],
      selLang: '',
      selLangOptions: [{
        value: 'en',
      }, {
        value: 'zh',
      }, {
        value: 'india',
      }],
      addform: {
        stringid: '',
        page: '',
        lang: {},
      },

      onlineVisible: false, // 上下线 通用弹窗
      onlineMsg: '出错啦',
      onlinecurrRowData: null,

      modifyExpectId: null,
      expectMoreMsg: null,
    }
  },
  watch:{
  },
  mounted(){
    this.pageinit()

  },
  methods: {
    page_lan_Evt(evt){
      this.getLanArr(this.selPage, this.selLang)
    },
    getLanArr(page = '', language = ''){
      let obj = {
        language,
        page,
        pageno: "1",
        pagesize: '99999'
      }
      this.$store.dispatch('languagePage', obj).then((res) => {
        this.backlangArr = res
        console.log(res)
      })
    },
    pageinit(){
        this.getLanArr()
    },
    before_exportJSON(){
      let newJson = {}
      if(this.langArr && this.langArr.length>0){
        this.langArr.forEach((item, index)=>{
          let currStr =  `${item.page}.${item.StringID}`
          newJson[currStr] = item.newArticle
        })
        this.exportJSON(newJson)
        return true
      }
      this.$message({
        type:'error',
        message: 'exportJSON error'
      })
    },
    exportJSON(json){
      try{
        const data = JSON.stringify(json)
        const blod = new Blob([data], {type: ''})
        FileSaver.saveAs(blod, `ms_${this.selLang}.json`)
      }catch(e){
        this.$message({
          type:'error',
          message: 'exportJSON error'
        })
      }
    },
    before_js_modify(lineData){
      this.showModifyDialog = true
      this.modifyData = JSON.parse(JSON.stringify(lineData))
      this.modifyData.newArticle = ''
    },
    before_js_del(lineData){
      this.onlineVisible = true
      this.onlineMsg = `确定删除 ${lineData.oldArticle} 这条信息?`
      this.onlinecurrRowData = JSON.parse(JSON.stringify(lineData))
    },
    js_del(){
      // 执行删除
    },
    addLine(){
      this.showlangDialog = true
    },
    onAddSubmit() {
      if(!this.addform.stringid || !this.addform.page || Object.keys(this.addform).length <1){
        this.$message({
          type:'error',
          message: '框里内容不能空'
        })
      }
      console.log(this.addform)
      // 请求
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
    addlangs() {
      this.inputLan = null
      this.dialogTableVisible = true
    },
    modifylangs() {
      this.inputLan = this.selLang
      this.dialogTableVisible = true
    },
    async uplang() {
      // 开始loading
      if(!this.inputLan) {
        this.$message({
          type: 'error',
          message: '请输入语言名称'
        })
        return false
      }
      if(this.langArr.length<1){
        this.$message({
          type: 'error',
          message: '请选择语言文件'
        })
        return false
      }
      this.uploading = true
      let upObj = {
        inputLan:this.inputLan,
        language_list: this.langArr
      }
      await this.$store.dispatch('languageAdd', upObj).then((res) => {
        // this.backlangArr = res
        console.log(res)
        // 更新列表
        this.page_lan_Evt()
        this.dialogTableVisible = false
      }).catch(err=>{
        this.uploading = false
        console.error('languageAdd error')
      })
      this.uploading = false
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
              this.langArr = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
              console.log(this.langArr);
          } catch (e) {
              return false;
          }
        };
        fileReader.readAsBinaryString(files[0]);
    }
  },
}
</script>

<style scoped>
.line{
  text-align: center;
}
.operateReview .el-button {
  margin-left: 0 !important;
}
.goodsDialog p {
  text-align: center;
  font-weight: bold;
}
.operateStyle i {
  padding: 10px;
  cursor: pointer;
}
.el-dialog__body {
  padding-top: 0 !important;
}
.operateStyle i:hover {
  background-color: #e4e4e4;
}
.el-button {
  margin-bottom: 1px;
}
.common-input {
    width: 90%;
}
.el-pagination {
  text-align: center;
  margin-top: 10px;
}
.clear:after {
  content: '';
  clear: both;
  display: block;
  height: 0;
  visibility: hidden
}
.el-form-item{
  margin-bottom: 14px;
}
.el-dialog .el-checkbox{
  margin-bottom: 10px;
}

</style>

