<template>
  <section class="app-container">
    <div>
      <section class="clear">
        <div style="float:left">
          <!-- 新增币种选择 -->
          <section style="float: left;margin-top: 4px">
            <span style="font-size: 14px">广告图位置: </span>
            <el-select
              v-model="localid"
              size="small"
              placeholder="请选择广告位置"
              @change="adsLocalChange"
            >
              <el-option
                v-for="item in localStyleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </section>
          <!-- 平台 -->
          <section style="float: left;margin-top: 4px;margin-left:10px">
            <span style="font-size: 14px">平台配置: </span>
            <el-select
              v-model="platfromSet"
              size="small"
              placeholder="请选择平台"
              @change="adsLocalChange"
            >
              <el-option
                v-for="item in platfromOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"/>
            </el-select>
          </section>
        </div>
        <div
          style="float: right"
          class="seaUid">
          <el-button
            type="primary"
            plain
            size="small"
            @click="addAdsFn()">
            新增广告
          </el-button>
        </div>
      </section>
      <div style="margin-top:20px">
        <el-tabs
          v-model="activeName"
          type="card"
          @tab-click="handleClick">
          <el-tab-pane
            label="英文"
            name="first">
          </el-tab-pane>
          <el-tab-pane
            label="印地语"
            name="second">
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-table
        :data="adslist"
        stripe
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="index"
          label="序号"/>
        <el-table-column
          prop="uid"
          label="广告图"/>
        <el-table-column
          prop="regtime"
          label="内容"/>
        <el-table-column
          prop="localStr"
          label="上线时间"/>
        <el-table-column
          label="操作"
          width="230px">
          <template
            slot-scope="scope"
            class="mailmsgOpera">
            <el-button
              size="small"
              @click="showOpt(scope.row)">修改</el-button>
            <el-button
              size="small"
              type="danger"
              @click="showOpt(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div
        class="block"
        style="text-align:center">
        <el-pagination
          :current-page.sync="userPageNumber"
          :page-size="userPageSize"
          :page-count="userMsgCounts"
          background
          size="small"
          layout="prev, pager, next,jumper"
          @current-change="userCurrentChange"
        />
      </div> -->
    </div>

    <!--新增广告的弹窗 -->
    <el-dialog
      :visible.sync="dialogAds"
      :close-on-click-modal="false"
      :title="localid === '0' ? '新增活动中心广告' : '新增弹窗中心广告'" >
      <el-form
        ref="form"
        :model="adsform"
        label-width="80px">
        <el-form-item label="活动标题">
          <el-input
            v-model="adsform.title"
            style="width:350px"/>
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input
            v-model="adsform.desc"
            type="textarea"/>
        </el-form-item>
        <el-form-item label="广告图">
            <input
            ref="upload"
            type="file"
            >
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              v-model="adsform.startdate"
              size="small"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择开始日期"
              style="width: 100%;"/>
          </el-col>
          <el-col
            :span="2"
            class="line">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="adsform.enddate"
              size="small"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择结束日期"
              style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="权重设置">
          <el-input-number
            v-model="adsform.num"
            :min="1"
            :max="100"
            label="描述文字"
            size="small"/>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onaddSubmit">立即创建</el-button>
          <el-button @click="dialogAds = false" >取消</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>

    <!--导入UId弹窗 -->
    <!-- <el-dialog
      :visible.sync="dialogTableVisible"
      title="注意！" >
      <div>
        <span>设置用户 {{ opeUId }} 等级:</span>
        <el-select
          v-model="opelocal"
          size="small"
          placeholder="请选择">
          <el-option
            v-for="item in opelocalObj"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </div>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="dialogTableVisible = false" >取 消</el-button>
        <el-button
          type="primary"
          @click="uplocalFn">确 定</el-button>
      </div>
    </el-dialog> -->

  </section>
</template>

<script>

export default {
    data () {
        return {
            platfromSet: "0",
            platfromOptions:[
                {
                    value: "0",
                    label: "All"
                }, {
                    value: "1",
                    label: "ios"
                }, {
                    value: "2",
                    label: "android"
                }
            ],
            activeName: "first",
            adslist: [
            ],
            localid: "0",
            localStyleOptions:[
                {
                    value: "0",
                    label: "活动中心"
                }, {
                    value: "1",
                    label: "弹窗中心"
                }
            ],
            dialogTableVisible: false,
            dialogAds: true,
            adsform: {
                title: "",
                desc: "",
                startdate: "",
                enddate: "",
                num: ""
            },

            // userPageNumber: 1,
            // userPageSize: 10,
            // userMsgCounts: 3,
        }
    },
    mounted () {
        this.adslistFn()
    },
    methods: {
        onaddSubmit () {
            // 点击提交
            console.log(this.adsform)
            console.log(this.fileList)
            console.log(this.dialogAds)
        },
        handleClick (tab, event) {
            // 切换语言选项卡  tab  eng india
            this.$nextTick(() => {
                this.adslistFn()
            })
        },
        addAdsFn () {
            // 新增广告
            this.dialogAds = true
            this.$refs.upload.value = ''
            this.$nextTick(() => {
                let thisRef = this.$refs.upload
                if (thisRef) {
                    thisRef.removeEventListener("change", this.readUpload)
                    thisRef.addEventListener("change", this.readUpload)
                }
            })
        },
        readUpload (e) {
        // 表格数据导入
            const files = e.target.files
            if (files.length<=0) {
                this.$message({
                    message: "error 请选择一个文件!",
                    type: "warning"
                })
                return false
            } else if (!/\.(png|jpeg|bmp|jpg)$/.test(files[0].name.toLowerCase())) {
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
        },

        adsLocalChange () {
            // 位置信息切换
            this.adslistFn()
        },
        showOpt (row) {
            // 操作
            this.dialogTableVisible = true
            this.opeUId = row.uid
            this.opelocal = row.local
        },

        formateUserList (list) {
            if (list && list.length>0) {
                // list.forEach((item) => {
                //     item.localStr = this.localObj[item.local]
                // })
            }
            return list
        },
        async adslistFn () {
            // 获取广告信息
            let currlan = "en"
            if (this.activeName !== "first") {
                currlan = "india"
            }
            let obj = {
                localid: this.localid,
                language: currlan,
                platfrom: platfromSet
            }

            let exchangeList = await this.$store.dispatch("risk_userlist", obj)
            if (exchangeList) {
                if (exchangeList.userinfos) {this.adslist = this.formateUserList(exchangeList.userinfos)}
            } else {
                this.$message({
                    type: "error",
                    message: "操作失败"
                })
            }

        }

        // async uplocalFn () {
        //     // 更新用户等级
        //     let currlan = 'en'
        //     if(this.activeName !== 'first'){
        //         currlan = 'india'
        //     }
        //     let obj = {
        //         local: this.opelocal.toString(),
        //         language: currlan
        //     }
        //     let local = await this.$store.dispatch("risk_localUpdate", obj)
        //     if (local) {
        //         this.$message({
        //             type: "success",
        //             message: "操作用户等级成功"
        //         })
        //         this.dialogTableVisible = false
        //         this.adslistFn()
        //     } else {
        //         this.$message({
        //             type: "error",
        //             message: "操作用户等级error"
        //         })
        //     }
        // },

    }
}
</script>
<style scoped>
.addTop section{
    margin-top: 10px
}
.el-col-2{
    text-align: center
}
  .seaUid .el-input {
    width: 300px;
    line-height: 40px;
  }
  .el-input{
    width: 150px;
  }
  .clear{
    overflow: hidden;
  }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
  .avatar {
    width: 20px;
    height: 20px;
    display: block;
  }

</style>
