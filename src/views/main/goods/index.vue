<template>
  <div class="page">
    <h2>商品配置后台</h2>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="float: right; margin-bottom:20px;"
      size="mini"
      @click="create"
    />
    <el-table
      :data="tableData.filter((item, index) => filterTableData(pageno, pagesize, index))"
      border
      style="width: 100%"
    >
      <el-table-column
        label="No."
        prop="index"
        width="80"
      />
      <el-table-column
        label="商品名称"
      >
        <template slot-scope="scope">
          <a
            href="javascript:;"
            class="link"
            @click="modify(scope.row)"
          >{{ scope.row.goodsname.en || scope.row.goodsname.hi || '' }}</a>
        </template>
      </el-table-column>
      <el-table-column
        label="商品简介"
      >
        <template slot-scope="scope">
          {{ scope.row.goodsdesc.en || scope.row.goodsdesc.hi || '' }}
        </template>
      </el-table-column>
      <el-table-column
        label="商品价值"
        prop="needgolds"
      />
      <el-table-column
        label="剩余数量"
        prop="remain"
      />
      <el-table-column
        label="商品ID"
        prop="goodsid"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <div>
            <el-button
              type="primary"
              size="mini"
              @click.native="lineChange(scope.row)"
            >
              {{ scope.row.isUpLine ? '下线' : '上线' }}
              <i :class="[scope.row.isUpLine ? 'el-icon-download' : 'el-icon-upload2']" />
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="pagesize"
      :total="tableData.length"
      :current-page.sync="pageno"
      background
      layout="prev, pager, next"
    />
    <el-dialog
      :visible.sync="showConfirm"
      :title="selectObj.name ? '修改奖品信息' : '新增奖品信息'"
    >
      <el-form>
        <el-form-item
          label="类别"
        >
          <el-select
            v-model="selectObj.goodstype"
          >
            <el-option
              label="卡类"
              value="1"
            />
            <el-option
              label="实物类"
              value="2"
            />
            <el-option
              label="其他"
              value="3"
            />
          </el-select>
        </el-form-item>
        <el-tabs
          type="border-card"
          value="first"
        >
          <el-tab-pane
            label="英文"
            name="first"
          >
            <el-form-item
              label="商品名称"
            >
              <el-input
                v-model="selectObj.goodsname.en"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="商品简介"
            >
              <el-input
                v-model="selectObj.goodsdesc.en"
                autocomplete="off"
              />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane
            label="印度语"
            name="second"
          >
            <el-form-item
              label="商品名称"
            >
              <el-input
                v-model="selectObj.goodsname.hi"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item
              label="商品简介"
            >
              <el-input
                v-model="selectObj.goodsdesc.hi"
                autocomplete="off"
              />
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <el-form-item
          label="商品价值"
        >
          <el-input
            v-model="selectObj.needgolds"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="图片URL"
        >
          <el-input
            v-model="selectObj.img_url"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="权重"
        >
          <el-input
            v-model="selectObj.weight"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="showConfirm = false"
        >
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="confirm"
        >
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
    getGoodList, setGood, changeLine
} from "@/api/main/good"
export default {
    data () {
        return {
            pagesize: 20,
            pageno: 1,
            tableData: [],
            selectObj: {
                goodsname: {

                },
                goodsdesc: {

                }
            },
            showConfirm: false,
            active: ""
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        filterTableData (pageno, pagesize, index) {
            pageno = Number(pageno)
            pagesize = Number(pagesize)
            return (index >= (pageno - 1) * pagesize) && (index <= (pageno - 1) * pagesize + (pagesize - 1))
        },
        getList () {
            getGoodList().then(res => {
                this.tableData = res.data.goods_config_list.map((item, index) => {
                    item.index = index + 1
                    item.isUpLine = Number(item.status) === 1
                    if (item.goodstype === "2" && item.classify === "other") {
                        item.goodstype = "3"
                    }
                    return item
                })
                this.tableData.sort((a, b) => Number(a.weight) > Number(b.weight) ? -1 : 1)
            })
        },
        modify (item) {
            this.selectObj = JSON.parse(JSON.stringify(item))
            this.showConfirm = true
        },
        create () {
            this.selectObj = {
                goodsid: "",
                goodstype: "1",
                goodsname: {

                },
                goodsdesc: {

                }
            }
            this.showConfirm = true
        },
        confirm () {
            if (!this.selectObj.weight) {
                this.error("请填写权重")
                return
            }
            if (!this.selectObj.img_url) {
                this.error("请填写图片url")
                return
            }
            if (!this.selectObj.needgolds) {
                this.error("请填写商品价值")
                return
            }
            if (!this.selectObj.goodsname.en) {
                this.error("请填写英文商品名称")
                return
            }
            if (!this.selectObj.goodsdesc.en) {
                this.error("请填写英文商品简介")
                return
            }
            if (!this.selectObj.goodsname.hi) {
                this.error("请填写印度语商品名称")
                return
            }
            if (!this.selectObj.goodsdesc.hi) {
                this.error("请填写印度语商品简介")
                return
            }
            this.selectObj.classify = ""
            if (this.selectObj.goodstype === "3") {
                this.selectObj.goodstype = "2"
                this.selectObj.classify = "other"
            }
            this.selectObj = {
                ...this.selectObj,
                contents: {
                    en: {
                        goodsname: this.selectObj.goodsname.en,
                        goodsdesc: this.selectObj.goodsdesc.en
                    },
                    hi: {
                        goodsname: this.selectObj.goodsname.hi,
                        goodsdesc: this.selectObj.goodsdesc.hi
                    }
                }
            }
            setGood(this.selectObj).then(res => {
                if (res.status === "100") {
                    this.success()
                    this.getList()
                    this.showConfirm = false
                } else {
                    this.error(res.message)
                }
            })
        },
        lineChange (item) {
            changeLine({
                goodsid: item.goodsid,
                status: item.status === "0" ? "1" : "0"
            }).then(res => {
                this.success()
                this.getList()
            })
        }
    }
}
</script>

<style lang="less" scoped>
.link {
    text-decoration: underline;
    color: #409EFF;
    &:hover {
        filter: brightness(1.2);
    }
}
.page {
    padding: 20px;
}
.el-button /deep/ .el-icon-back {
    transform: rotate(90deg);
}
</style>
