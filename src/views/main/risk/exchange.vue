<template>
    <section class="app-container">
        <div>
            <section class="clear">
                <div style="float:left">
                <!-- 新增币种选择 -->
                  <section style="float: left;margin-top: 4px">
                    <span style="font-size: 14px">状态筛选: </span>
                    <el-select size="small" v-model="selStyle" placeholder="请选择">
                      <el-option
                        v-for="item in selstyleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                  </section>
                </div>
                <div style="float: right">
                  <el-input v-model="searchUid" size="small" placeholder="uid 查询"></el-input>
                  <el-button @click="searchExpectFn()" type="primary" plain size="small">
                      查询
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
                label="序号">
                </el-table-column>
                <el-table-column
                prop="uid"
                label="用户uid">
                </el-table-column>
                <el-table-column
                prop="goodsname"
                label="兑换商品">
                </el-table-column>
                <el-table-column
                prop="exchangetime"
                label="兑换时间">
                </el-table-column>
                <el-table-column
                prop="goodsstyle"
                label="审核状态">
                </el-table-column>
                <el-table-column
                label="操作"
                width="230px">
                <template slot-scope="scope" class="mailmsgOpera">
                    <section v-if="0">
                      <el-button @click="js_showmsgFn( scope.row )" type="primary" size="small">
                          查看
                      </el-button>
                      <el-button @click="js_showmsgFn( scope.row )" type="success" size="small">
                          通过
                      </el-button>
                      <el-button @click="js_showmsgFn( scope.row )" type="danger" size="small">
                          拒绝
                      </el-button>
                    </section>
                    <section v-else>
                      <el-button @click="js_showmsgFn( scope.row )" type="primary" size="small">
                          查看
                      </el-button>
                      <el-button disabled type="info" size="small">
                          已操作
                      </el-button>
                    </section>
                </template>
                </el-table-column>
            </el-table>
        </div>

        <!--导入UId弹窗 -->
        <el-dialog title="已通知详情:" :visible.sync="dialogTableVisible" >
            <div>
                <p>{{ dialogmsg }}</p>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogTableVisible = false" >知道了</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      goodsList: [
        {
          index: 1,
          uid: 10021,
          goodsname: '卡卡卡卡',
          exchangetime: '234',
          goodsstyle: '-1'
        },
        {}
      ],
      searchUid: null,
      selstyleOptions:[
        {
          value: '-1',
          label: 'All'
        }, {
          value: '1',
          label: '待审核'
        }, {
          value: '2',
          label: '已通过'
        }, {
          value: '3',
          label: '已拒绝'
        }
      ],
      selStyle:'-1'
    }
  },
  created() {
  },
  methods: {

  }
}
</script>
<style scope>
  .el-input {
    width: 200px;
    line-height: 40px;
  }

</style>
