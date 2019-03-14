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
                    <section>
                      <el-button @click="js_showmsgFn( scope.row )" type="primary" size="small">
                          查看
                      </el-button>
                      <el-button :disabled="scope.row.goodsstyle==='1'" @click="js_showmsgFn( scope.row )" type="success" size="small">
                          通过
                      </el-button>
                      <el-button :disabled="scope.row.goodsstyle==='-1'" @click="js_showmsgFn( scope.row )" type="danger" size="small">
                          拒绝
                      </el-button>
                    </section>
                </template>
                </el-table-column>
            </el-table>
        </div>

      <el-dialog :fullscreen=true height="50%" width="80%" title="用户信息审核" :visible.sync="showUidMsg" center>
        <section style="text-align:center">
          <el-table :data="userMoreMsg">
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="uid" label="用户ID"></el-table-column>
            <el-table-column prop="recharge_total" label="用户头像">
                  <template slot-scope="scope">
                      {{ Number(scope.row.profit[0].recharge_total) }}{{formateCoinType(scope.row.profit[0].cointype)}}
                      <img />
                  </template>
            </el-table-column>
            <el-table-column prop="recharge_total" label="IP 信息"></el-table-column>
            <el-table-column prop="withdraw_total" label="注册时间"></el-table-column>
            <el-table-column prop="account_total" label="最后登录时间"></el-table-column>
            <el-table-column prop="profit_total" label="手机设备号"></el-table-column>
          </el-table>
        </section>
        <section style="margin-top: 50px;border-top: 2px solid #ccc;padding-top: 10px">
          <h4 style="text-align:center">关联账号信息</h4>
          <el-table :data="userMoreList">
            <el-table-column prop="crtime" width="200" label="关联原因"></el-table-column>
            <el-table-column prop="inoutVal" width="130" label="用户名"></el-table-column>
            <el-table-column prop="money" width="130" label="用户ID"></el-table-column>
            <el-table-column prop="cointypeVal" width="130" label="用户头像"></el-table-column>
            <el-table-column prop="balance" width="150" label="IP信息"></el-table-column>
            <el-table-column prop="remark" label="注册时间"></el-table-column>
            <el-table-column prop="remark" label="设备号"></el-table-column>
          </el-table>
        </section>
        <section style="margin-top: 50px;border-top: 2px solid #ccc;padding-top: 10px">
          <h4 style="text-align:center">流水信息汇总</h4>
          <el-table :data="relateMsg" border stripe>
            <el-table-column prop="uid" label="流水代码"></el-table-column>
            <el-table-column prop="email" label="流水名"></el-table-column>
            <el-table-column prop="country" label="流水总额"></el-table-column>
            <el-table-column prop="profit_total" label="累计盈利">
                  <template slot-scope="scope">
                      {{ Number(scope.row.profit[0].profit_total) }}{{formateCoinType(scope.row.profit[0].cointype)}}
                  </template>
            </el-table-column>
          </el-table>
        </section>
        <section style="margin: 50px 0;border-top: 2px solid #ccc;padding-top: 10px">
          <h4 style="text-align:center">流水明细</h4>
          <el-table :data="relateMsg" border stripe>
            <el-table-column prop="uid" label="时间"></el-table-column>
            <el-table-column prop="withdraw_total" label="流水类型">
                  <template slot-scope="scope">
                      {{ Number(scope.row.profit[0].withdraw_total) }}{{formateCoinType(scope.row.profit[0].cointype)}}
                  </template>
            </el-table-column>
            <el-table-column prop="account_total" label="流水数量">
                  <template slot-scope="scope">
                      {{ Number(scope.row.profit[0].account_total) }}{{formateCoinType(scope.row.profit[0].cointype)}}
                  </template>
            </el-table-column>
            <el-table-column prop="email" width="200" label="余额"></el-table-column>
            <el-table-column prop="country" label="备注信息"></el-table-column>
          </el-table>
          <div class="block" style="text-align:center">
            <el-pagination
              @current-change="userCurrentChange"
              background
              :current-page.sync="userPageNumber"
              size="small"
              :page-size="userPageSize"
              layout="prev, pager, next,jumper"
              :page-count="userMsgCounts"
            >
            </el-pagination>
          </div>
        </section>
      </el-dialog>
    </section>
</template>

<script>

export default {
  data() {
    return {
      showUidMsg: true,
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
