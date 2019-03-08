<template>
  <div class="app-container">
    <section>
      <div>
        <section class="clear">
          <!-- 语言过滤选择 -->
          <section style="float: left;">
            <template>
              <span style="font-size: 14px">page筛选: </span>
              <el-select size="small" v-model="selPage" placeholder="请选择">
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
              <el-select size="small" v-model="selLang" placeholder="请选择">
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
            <el-button @click="searchExpectFn()" type="primary" plain size="small">
              新增语言
            </el-button>
            <el-button @click="initWithdraw()" type="warning" size="small">
              新增文案
            </el-button>
            <el-button @click="addGoods()" type="primary" size="small" icon="el-icon-plus">
              批量导入
            </el-button>
          </div>
        </section>
        <el-table
          :data="goodsList"
          stripe
          highlight-current-row
          style="width: 100%">
          <el-table-column
            prop="index"
            width="100"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="expectId"
            label="StringID">
          </el-table-column>
          <el-table-column
            prop="goodsTypeVal"
            label="page">
          </el-table-column>
          <el-table-column
            prop="beginTime"
            label="language">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="last Updated">
          </el-table-column>
          <el-table-column
            label="状态操作">
            <template slot-scope="scope">
              <el-button @click="before_js_onlineFn( scope.row )" v-if="scope.row.state === '-1'" type="primary" size="small">
                上线
              </el-button>
              <el-button v-else @click="before_js_onlineFn( scope.row )" type="danger" size="small">
                下线
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            :current-page.sync="pageNumber"
            size="small"
            :page-size="pageSize"
            layout="prev, pager, next,jumper"
            :page-count="pageCounts"
          >
          </el-pagination>
        </div>
      </div>
    </section>
    <!-- 提款申请 -->

    <!--语言弹窗 -->
    <el-dialog title="注意！" :visible="dialogTableVisible" v-loading="uploading">
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

    <!-- 上下线 -->
    <el-dialog
      title="注意！"
      :visible.sync="onlineVisible"
      width="30%">
      <span>{{ onlineMsg }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onlineVisible = false">取 消</el-button>
        <el-button type="danger" @click="js_onlineFn">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog size="small" width="600px" :title="goodsTitleName" center
               :visible.sync="showAddDialog">
      <el-form ref="form" :model="addform" label-width="80px">
        <el-form-item label="代币类型">
          <el-select size="small" v-model="addform.goodsType" placeholder="请选择代币类型">
            <el-option label="以太币" value="2001"></el-option>
            <el-option label="比特币" value="1001"></el-option>
            <el-option label="CC币" value="2000"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="代币总额">
          <el-input size="small" v-model="addform.goodsValue" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="总份数">
          <el-input size="small" v-model="addform.bidsTotal" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="每份价格">
          <el-input size="small" v-model="addform.bidValue" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="运营icon">
          <el-input size="small" v-model="addform.goodsUrl" class="common-input"></el-input>
        </el-form-item>
        <el-form-item label="ROBOT">
          <el-switch v-model="addform.isRobot"></el-switch>
        </el-form-item>
        <el-form-item label="场次连期">
          <el-switch size="small" v-model="addform.renew"></el-switch>
        </el-form-item>
        <el-form-item label="显示权重">
          <el-input size="small" v-model="addform.weightNum" class="common-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="this.goodsTitleName==='新增场次'" type="primary" @click="onAddSubmit">立即创建</el-button>
          <el-button v-else type="primary" @click="onModifySubmit">立即修改</el-button>
          <el-button >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { wait } from '@/utils/utils.js'

export default {
  data() {
    return {
      dialogTableVisible: false,
      uploading: false, // 上次loading
      inputLan: null,
      langArr: [{
        StringID: 11,
        language: "中文",
        newArticle: "login",
        oldArticle: "登陆",
        page: "home "
      },{
        StringID: 11,
        language: "中文",
        newArticle: "login",
        oldArticle: "登陆",
        page: "home "
      }],
      selPage: '-1',
      selPageOptions: [{
        value: '-1',
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
      }],
      selLang: '-1',
      selLangOptions: [{
        value: '-1',
        label: 'All'
      }, {
        value: '1',
        label: 'en'
      }, {
        value: '2',
        label: 'zh'
      }, {
        value: '3',
        label: 'india'
      }],
      
      onlineVisible: false, // 上下线 通用弹窗
      onlineMsg: '出错啦',
      onlinecurrRowData: null,

      modifyExpectId: null,
      goodsTitleName: '新增场次',
      addform: {
        goodsUrl: '',
        name: '',
        goodsType: '2001',
        goodsValue: '',
        bidsTotal: '',
        bidValue: '',
        gameTime: [],
        isRobot: false,
        renew: false,
        weightNum: '0'
      },
      showAddDialog: false, // 新增场次弹窗

      expectMoreMsg: null,

      pageCounts: 10,
      pageNumber: 1,
      pageSize: 20,
      currPageNumber: null,

      tableStateName: '允许',
      goodsList: [],
      currLineData: null,
      currType: null,
      currUserUid: null,
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$refs.upload.addEventListener('change', e => {
        this.readExcel(e)
      })
    })
  },
  methods: {
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
      await wait(1000)
      this.uploading = false
      // end loading
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
    width: 195px;
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
</style>

