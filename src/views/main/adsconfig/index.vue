<template>
  <section class="app-container">
    <div>
      <section class="clear">
        <div style="float:left">
          <!--  -->
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
            name="first"/>
          <el-tab-pane
            v-if="!isnational"
            label="印地语"
            name="second"/>
        </el-tabs>
      </div>
      <el-table
        :data="adslist"
        stripe
        highlight-current-row
        style="width: 100%">

        <el-table-column
          prop="activityid"
          label="序号"
          width="70"
        />
        <el-table-column
          prop="weight"
          label="权重"
          width="60"
        />
        <el-table-column
          label="广告图">
          <template slot-scope="scope">
            <img :src="scope.row.img_url">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"/>
        <el-table-column
          prop="description"
          label="内容"/>
        <el-table-column
          label="平台">
          <template slot-scope="scope">
            <div
              v-if="scope.row.platform.length>0"
              class="flex">
              <p v-for="item in scope.row.platform">&nbsp;{{ item }}&nbsp;</p>
            </div>
            <div v-else>无</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="begintime"
          label="上线时间"/>
        <el-table-column
          label="下线时间"
          prop="endtime"
        />
        <el-table-column
          prop="link"
          label="活动地址"/>
        <el-table-column label="上线状态">
          <template slot-scope="scope">
            <p>{{ statusName(scope.row.status) }}</p>
          </template>
        </el-table-column>
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
              v-if="scope.row.status === '0'"
              size="small"
              type="success"
              @click="delOpt(scope.row, '1')">上线</el-button>
            <el-button
              v-else
              size="small"
              type="danger"
              @click="delOpt(scope.row, '0')">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--新增广告的弹窗 -->
    <el-dialog
      :visible.sync="dialogAds"
      :close-on-click-modal="false"
      :title="modifyTitle ? '修改广告图' : localid === '0' ? '新增活动中心广告' : '新增弹窗中心广告'" >
      <el-form
        ref="form"
        :model="adsform"
        label-width="80px">
        <el-form-item label="活动标题">
          <el-input
            v-model="adsform.title"
          />
        </el-form-item>
        <el-form-item label="活动内容">
          <el-input
            v-model="adsform.description"
            type="textarea"/>
        </el-form-item>
        <el-form-item label="广告图">
          <el-input
            v-model="adsform.img_url"
          />
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker
              v-model="adsform.begintime"
              size="small"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择开始日期"
              value-format="timestamp"
              style="width: 100%;"/>
          </el-col>
          <el-col
            :span="2"
            class="line">-</el-col>
          <el-col :span="11">
            <el-date-picker
              v-model="adsform.endtime"
              size="small"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择结束日期"
              value-format="timestamp"
              style="width: 100%;"/>
          </el-col>
        </el-form-item>
        <el-form-item label="展示平台: ">
          <el-checkbox-group v-model="adsform.platform">
            <el-checkbox
              label="ios"
              value="1"/>
            <el-checkbox
              label="android"
              value="1"/>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="权重设置">
          <el-input-number
            v-model="adsform.weight"
            :min="1"
            :max="1000"
            label="描述文字"
            size="small"/>
        </el-form-item>
        <el-form-item label="活动地址">
          <el-input
            v-model="adsform.link"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="onaddSubmit">立即创建</el-button>
          <el-button @click="dialogAds = false" >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import {
    type
} from "os"

export default {
    data () {
        return {
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
            dialogAds: false,
            address:"",
            // 新增弹层
            adsform: {
                title: "",
                description:"",
                img_url:"",
                begintime: "",
                endtime: "",
                weight: "",
                link:"",
                platform:[]
            },
            modifyTitle: false,
            isnational: 0
        }
    },
    watch: {
        $route (to, from) {
            console.log(to)
            this.pageinit()
        }
    },
    mounted () {
        this.pageinit()
    },
    methods: {
        statusName (val) {
            return val === "0" ? "下线" : "上线"
        },
        pageinit () {
            if (this.$route && this.$route.fullPath.indexOf("/national") > -1) {
                this.isnational = 1
            } else {
                this.isnational = 0
            }
            this.adslistFn()
        },
        delOpt (row, val) {
            // 删除
            this.$confirm(`将上下线${JSON.stringify(row.activityid)}该广告? `, "注意！", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                // todo
                row.status = val
                this.adsform = JSON.parse(JSON.stringify(row))
                this.onaddSubmit()
            }).catch(() => {
                // 取消操作

            })
        },
        showOpt (row) {
            this.modifyTitle = true
            this.adsform = JSON.parse(JSON.stringify(row))
            this.dialogAds = true
        },
        async onaddSubmit () {
            console.log(this.adsform)
            if (
                Object.values(this.adsform).includes("")
            ) {
                this.$message({
                    type: "error",
                    message: "内容不能为空"
                })
                return
            }

            let currlan = "en"
            if (this.activeName !== "first") {
                currlan = "hi"
            }
            let obj = {
                localid: this.localid,
                language: currlan
            }
            let arrplat = []
            arrplat[0] = this.adsform.platform.indexOf("ios")>-1? "1" : "0"
            arrplat[1] = this.adsform.platform.indexOf("android")>-1? "1" : "0"
            this.adsform.begintime = this.getdate(this.adsform.begintime)
            this.adsform.endtime = this.getdate(this.adsform.endtime)
            this.adsform.weight = this.adsform.weight.toString()
            let data = {
                ...obj,
                ...this.adsform,
                national: this.isnational.toString()
            }
            data = JSON.parse(JSON.stringify(data))
            data.platform = arrplat.join("|")
            let addata = await this.$store.dispatch("ad_modify",data)
            if (addata) {
                this.adslistFn()
                this.$message({
                    type: "success",
                    message: "success!"
                })
                this.dialogAds = false
            } else {
                this.$message({
                    type: "error",
                    message: "操作失败"
                })
            }
        },
        handleClick (tab, event) {
            // 切换语言选项卡  tab  eng hi
            this.$nextTick(() => {
                this.adslistFn()
            })
        },
        addAdsFn () {
            this.modifyTitle = false
            let currlan = "en"
            if (this.activeName !== "first") {
                currlan = "hi"
            }
            let obj = {
                localid: this.localid,
                language: currlan
            }
            this.adsform = {
                title: "",
                description:"",
                img_url:"",
                begintime: "",
                endtime: "",
                weight: "",
                link:"",
                platform:[]
            }
            let data = {
                ...obj,
                ...this.adsform
            }
            this.dialogAds = true
        },

        adsLocalChange () {
            // 位置信息切换
            this.adslistFn()
        },
        async adslistFn () {
            // 获取广告信息
            let currlan = "en"
            if (this.activeName !== "first") {
                currlan = "hi"
            }
            let obj = {
                localid: this.localid,
                language: currlan,
                national: this.isnational.toString()
            }
            // 获取基础信息
            let exchangeList = await this.$store.dispatch("adList", obj)
            this.adslist = exchangeList.activitylist
            console.log(exchangeList)
        },
        getdate (time) {
            var now = new Date(Number(time)),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate()
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + now.toTimeString().substr(0, 8)
        }

    }
}
</script>
<style scoped>
.addTop section {
  margin-top: 10px;
}
.el-col-2 {
  text-align: center;
}
.el-input {
  max-width: 400px;
}
.clear {
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
  border-color: #409eff;
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
.flex{
    display: flex;
    justify-content: center;
}
</style>
