<template>
  <div class="app-container">
    <section>
      <div>
        <section class="clear">
          <!-- 语言过滤选择 -->
          <section style="float: left;">
            <template>
              &nbsp;<span style="font-size: 14px">平台筛选: </span>
              <el-select
                v-model="selPlat"
                size="small"
                placeholder="h5&客户端"
                @change="page_lan_Evt"
              >
                <el-option
                  v-for="item in selPlatOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
            <template>
              &nbsp;<span style="font-size: 14px">lang筛选: </span>
              <el-select
                v-model="selLang"
                size="small"
                placeholder="请选择"
                @change="page_lan_Evt"
              >
                <el-option
                  v-for="item in selLangOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
            <template>
              <span style="font-size: 14px">page筛选: </span>
              <el-select
                v-model="selPage"
                size="small"
                change="aa"
                placeholder="请选择"
                @change="page_lan_Evt"
              >
                <el-option
                  v-for="item in selPageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </section>
          <div style="float: right; margin-right:30px">
            <el-button
              type="primary"
              plain
              size="small"
              @click="addlangs()"
            >
              新增{{ platName }}语言
            </el-button>
            <el-button
              type="warning"
              size="small"
              @click="addLine()"
            >
              新增{{ platName }}文案
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="modifylangs()"
            >
              批量导入
            </el-button>
            <el-button
              type="error"
              size="small"
              @click="before_exportJSON()"
            >
              导出JSON
            </el-button>
            <el-button
              type="error"
              size="small"
              @click="exportExcel()"
            >
              导出Excel
            </el-button>
          </div>
        </section>
        <el-table
          id="out-table"
          ref="multi_table"
          :data="backlangArr"
          stripe
          highlight-current-row
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
          />
          <el-table-column
            width="80"
            label="序号"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            prop="string_id"
            label="string_id"
          />
          <el-table-column
            prop="page"
            label="page"
          />
          <el-table-column
            prop="language"
            label="language"
          />
          <el-table-column
            prop="origin_content"
            label="原文"
            width="156"
          />
          <el-table-column
            prop="content"
            label="content"
          />
          <el-table-column
            label="状态操作"
            width="200px"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="small"
                @click="before_js_modify( scope.row )"
              >
                修改
              </el-button>
              <el-button
                type="danger"
                size="small"
                @click="before_js_del( scope.row )"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="allSelArr && allSelArr.length>0">
          <el-button
            type="danger"
            @click="rmMoreList"
          >
            批量删除选中
          </el-button>
        </div>
      </div>
    </section>
    <!-- 提款申请 -->

    <!--语言弹窗 -->
    <el-dialog
      v-loading="uploading"
      :visible.sync="dialogTableVisible"
      title="注意！"
      @open="openDialog"
    >
      <div>
        <span>文件语言以Excel中language 字段为准 !!</span>
      </div>
      <div style="margin-top:10px">
        <input
          ref="upload"
          type="file"
        >
      </div>
      <br>
      <el-button
        size="small"
        @click="downDemo"
      >
        excel模板下载
      </el-button>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogTableVisible = false">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="uplang"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>

    <!-- 删除语言 -->
    <el-dialog
      :visible.sync="onlineVisible"
      title="注意！"
      width="30%"
    >
      <span>{{ onlineMsg }}</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="onlineVisible = false">取 消</el-button>
        <el-button
          type="danger"
          @click="js_del()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增语言 -->
    <el-dialog
      :title="langTitleName"
      :visible.sync="showlangDialog"
      :close-on-click-modal="false"
      width="600px"
      center
    >
      <el-form
        ref="form"
        :model="addform"
        label-width="80px"
      >
        <el-form-item label="StringID">
          <el-input
            v-model="addform.string_id"
            size="small"
            class="common-input"
          />
        </el-form-item>
        <el-form-item label="page">
          <el-input
            v-model="addform.page"
            size="small"
            class="common-input"
          />
        </el-form-item>
        <el-form-item label="原文">
          <el-input
            v-model="addform.origin_content"
            size="small"
            class="common-input"
          />
        </el-form-item>
        <template v-for="(item,index) in selLangOptions">
          <el-form-item
            :key="index"
            :label="item.value"
          >
            <el-input
              v-model="addform.lang[item.value]"
              type="textarea"
              size="small"
              class="common-input"
            />
          </el-form-item>
        </template>
        <el-form-item>
          <el-button
            type="primary"
            @click="onAddSubmit"
          >
            立即新增
          </el-button>
          <el-button @click="showlangDialog=false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 修改语言 -->
    <el-dialog
      :visible.sync="showModifyDialog"
      :close-on-click-modal="false"
      width="600px"
      title="修改语言"
      center
    >
      <el-form
        ref="form"
        :model="modifyData"
        label-width="80px"
      >
        <el-form-item label="StringID">
          <el-input
            v-model="modifyData.string_id"
            size="small"
            disabled="disabled"
            class="common-input"
          />
        </el-form-item>
        <el-form-item label="page">
          <el-input
            v-model="modifyData.page"
            size="small"
            disabled="disabled"
            class="common-input"
          />
        </el-form-item>
        <el-form-item label="language">
          <el-input
            v-model="modifyData.language"
            size="small"
            disabled="disabled"
            class="common-input"
          />
        </el-form-item>
        <el-form-item label="修改时间">
          <el-input
            v-model="modifyData.uptime"
            size="small"
            disabled="disabled"
            class="common-input"
          />
        </el-form-item>
        <el-form-item label="原文">
          <el-input
            v-model="modifyData.origin_content"
            size="small"
            disabled="disabled"
            class="common-input"
          />
        </el-form-item>
        <el-form-item
          label="translation"
          class="addHeight"
        >
          <el-input
            v-model="modifyData.content"
            type="textarea"
            size="small"
            placeholder="输入修改的文案"
            class="common-input"
          />
        </el-form-item>
        <el-checkbox v-model="modifyDialog_label">
          是否有通配符？
        </el-checkbox>
        <el-form-item class="common-input">
          <el-button
            type="primary"
            @click="onModifySubmit"
          >
            立即修改
          </el-button>
          <el-button @click="showModifyDialog=false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx"
import FileSaver from "file-saver"

export default {
    data () {
        return {
            modifyDialog_label: true,
            showModifyDialog: false, // 修改语言弹窗
            modifyData: {
            }, // 修改的文案
            dialogTableVisible: false, // 上传文件
            uploading: false, // 上次loading
            inputLan: null,
            langTitleName: "新增文案",
            showlangDialog: false, // 新增文案弹窗
            langArr: [],  // excel语言列表
            backlangArr: [], // ajax 数据
            selPage: "",
            selPageOptions: [
                {
                    value: "",
                    label: "All"
                }
            ],
            selLang: "English",
            selLangOptions: [{
                value: "English"
            }],
            selPlat: "2",
            selPlatOptions: [{
                value: "0",
                label: "客户端 *"
            },{
                value: "1",
                label: "h5"
            },{
                value: "2",
                label: "* 服务端 *"
            }],
            addform: {
                string_id: "",
                page: "",
                lang: {
                }
            },
            onlineVisible: false, // 上下线 通用弹窗
            onlineMsg: "出错啦",
            delRowData: null,

            modifyExpectId: null,
            expectMoreMsg: null,
            platName: "客户端",

            allSelArr: []
        }
    },
    watch:{
    },
    mounted () {
        this.pageinit()
    },
    methods: {
        handleSelectionChange (val) {
            this.allSelArr = val
        },
        async rmMoreList () {
            if (this.allSelArr) {
                console.log(this.allSelArr)
                let isSure = window.confirm("确定批量删除？删除个数为"+ this.allSelArr.length)
                if (isSure) {
                    let load = this.$load()
                    for (var item of this.allSelArr) {
                        // 执行删除
                        await this.$store.dispatch("languageDel", item)
                    }
                    this.$nextTick(() => {
                        this.$message({
                            type:"success",
                            message: "删除成功"
                        })
                        // 更新列表
                        this.page_lan_Evt()
                        load.close()
                    })
                }
            }
        },
        downDemo () {
            let ws
            let wb
            let newExp = [{
                content: "这里是内容(覆盖)",
                language: "填写语言(覆盖)",
                origin_content: "原文(覆盖)",
                page: "页面id(覆盖)",
                string_id: "字段id(覆盖)"
            }]
            /* 创建worksheet */
            ws = XLSX.utils.json_to_sheet(newExp)
            /* 新建空workbook，然后加入worksheet */
            wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "language")
            /* 生成xlsx文件 */
            XLSX.writeFile(wb, "ms_langdemo.xlsx")
        },
        page_lan_Evt () {
            this.selPlat === "0" ? this.platName = "客户端" : this.platName = "h5"
            this.getLanArr(this.selPage, this.selLang, this.selPlat )
        },
        getLanArr (page = "", language = "English", plat = "2") {
            let obj = {
                language,
                page,
                plat,
                pageno: "1",
                pagesize: "99999"
            }
            let load = this.$load()
            this.$store.dispatch("languagePage", obj).then((res) => {
                this.backlangArr = res.lang_list
                if (res.filters) {
                    let basePage = [{
                        value: "",
                        label: "ALL"
                    }]
                    let baseLang = []
                    if (res.filters.pages && res.filters.pages.length > 0) {
                        let obj = {
                        }
                        res.filters.pages.forEach((item) => {
                            obj.value = item
                            obj.label = item
                            basePage.push({
                                ...obj
                            })
                        })
                    }
                    if (res.filters.languages && res.filters.languages.length > 0) {
                        let obj = {
                        }
                        res.filters.languages.forEach((item) => {
                            obj.value = item
                            obj.label = item
                            baseLang.push({
                                ...obj
                            })
                        })
                    }
                    this.selPageOptions = basePage
                    this.selLangOptions = baseLang
                }
                load.close()
            }).catch(() => {
                load.close()
            })
        },
        pageinit () {
            this.getLanArr()
        },
        before_exportJSON () {
            let newJson = {
            }
            if (this.backlangArr && this.backlangArr.length>0) {
                this.backlangArr.forEach((item) => {
                    let currStr =  item.page+"."+ item.string_id
                    newJson[currStr] = item.content
                })
                this.exportJSON(newJson)
                return true
            }
            this.$message({
                type:"error",
                message: "exportJSON 当前没有数据可以导出"
            })
        },
        exportJSON (json) {
            try {
                console.log(json)
                const data = JSON.stringify(json, null ,2)
                const blod = new Blob([data], {
                    type: ""
                })
                FileSaver.saveAs(blod, `ms_${this.selLang}.json`)
            } catch (e) {
                this.$message({
                    type:"error",
                    message: "exportJSON error"
                })
            }
        },
        exportExcel () {
            let ws
            let wb
            let newExp = [...this.backlangArr]
            newExp.forEach((item) => {
                if (item) {
                    if (item.language_id) {delete item.language_id}
                    if (item.uptime) {delete item.uptime}
                    if (item.plat) {delete item.plat}
                }
            })
            /* 创建worksheet */
            ws = XLSX.utils.json_to_sheet(newExp)
            /* 新建空workbook，然后加入worksheet */
            wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "language")
            /* 生成xlsx文件 */
            XLSX.writeFile(wb, `ms_${this.selLang}.xlsx`)
        },
        before_js_modify (lineData) {
            this.showModifyDialog = true
            this.modifyData = JSON.parse(JSON.stringify(lineData))
        },
        async onModifySubmit () {
            if (!this.modifyData.string_id || !(this.modifyData.content !== "")) {
                this.$message({
                    type:"error",
                    message: "框里内容不能空"
                })
                return false
            }
            // this.modifyData.content = this.modifyData.content.trim()
            // 请求
            await this.$store.dispatch("languageModify", this.modifyData).then((res) => {
                if (res) {
                    this.$message({
                        type:"success",
                        message: "修改成功"
                    })
                    this.showModifyDialog = false
                }
                // 更新列表
                this.page_lan_Evt()
            }).catch(() => {
                console.error("languageModify error")
            })
        },
        before_js_del (lineData) {
            this.onlineVisible = true
            this.onlineMsg = `确定删除: ${lineData.content} ,原文：${lineData.origin_content} ?`
            this.delRowData = JSON.parse(JSON.stringify(lineData))
        },
        async js_del () {
            // 执行删除
            await this.$store.dispatch("languageDel", this.delRowData).then((res) => {
                if (res) {
                    this.$message({
                        type:"success",
                        message: "删除成功"
                    })
                    this.onlineVisible = false
                }
                // 更新列表
                this.page_lan_Evt()
            }).catch(() => {
                console.error("languageDel error")
            })
        },
        addLine () {
            this.showlangDialog = true
            this.selPlat === "0"? this.langTitleName = "新增客户端文案" : this.langTitleName = "新增h5文案"

            this.addform = {
                string_id: "",
                page: "",
                lang: {
                }
            }
        },
        async onAddSubmit () {
            if (!this.addform.string_id || !this.addform.page || Object.keys(this.addform).length <1 || !(this.addform.origin_content !== "")) {
                this.$message({
                    type:"error",
                    message: "框里内容不能空"
                })
                return false
            }
            let base = {
                plat : this.selPlat,
                language_list: []
            }
            if (this.addform.lang && Object.keys(this.addform.lang).length > 0) {
                Object.keys(this.addform.lang).forEach((item) => {
                    let obj = {
                    }
                    obj.string_id = this.addform.string_id
                    obj.page = this.addform.page
                    obj.language = item
                    obj.origin_content = this.addform.origin_content
                    obj.content = this.addform.lang[item]
                    base.language_list.push({
                        ...obj
                    })
                })
            }
            await this.$store.dispatch("languageAdd", base).then(() => {
                this.$message({
                    type:"success",
                    message: "新增文案"
                })
                // 更新列表
                this.page_lan_Evt()
                this.showlangDialog = false
            }).catch(() => {
                console.error("languageAdd error")
            })
            // 请求
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
        addlangs () {
            this.inputLan = null
            this.dialogTableVisible = true
            // this.$refs.upload.value = ''
        },
        modifylangs () {
            this.inputLan = this.selLang
            this.dialogTableVisible = true
        },
        async uplang () {
            // 开始loading
            if (this.langArr.length<1) {
                this.$message({
                    type: "error",
                    message: "请选择文件"
                })
                return false
            }
            this.langArr.forEach((item, index) => {
                if (item && item.content) {
                    item.content = item.content.replace(/\r\r\n/g, "\r\n")
                }
            })
            this.uploading = true
            let upObj = {
                inputLan:this.inputLan,
                plat: this.selPlat,
                language_list: this.langArr
            }
            await this.$store.dispatch("languageAdd", upObj).then(() => {
                // 更新列表
                this.page_lan_Evt()
                this.dialogTableVisible = false
                this.$message({
                    type: "success",
                    message: "上传成功"
                })
            }).catch(() => {
                this.uploading = false
                console.error("languageAdd error")
            })
            this.uploading = false
        },
        readExcel (e) {
        // 表格数据导入
            const files = e.target.files
            if (files.length<=0) {
                this.$message({
                    message: "error 请选择一个文件!",
                    type: "warning"
                })
                return false
            } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                this.$message({
                    message: "上传格式不正确，请上传xls或者xlsx格式",
                    type: "error"
                })
                return false
            }
            const fileReader = new FileReader()
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result
                    const workbook = XLSX.read(data, {
                        type: "binary"
                    })
                    const wsname = workbook.SheetNames[0]// 取第一张表
                    this.langArr = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容
                    let oneData = this.langArr[0]
                    if ((oneData[0] && oneData[0].__EMPTY) || ( !oneData.string_id && !oneData.page && !oneData.language )) {
                        this.error("文档应该加密了, 需要先解锁文档!")
                        this.$refs.upload.value = ""
                        this.langArr = []
                    }
                } catch (e) {
                    return false
                }
            }
            fileReader.readAsBinaryString(files[0])
        }
    }
}
</script>

<style scoped lang="less">
.el-select{
  width: 120px;
}
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

