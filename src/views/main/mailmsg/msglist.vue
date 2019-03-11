<template>
    <section>
      <div>
        <section class="clear">
          <div style="float: right">
            <div class="block" style="display: inline-block;">
                <el-date-picker
                size="small"
                v-model="timeVal"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
                </el-date-picker>
            </div>
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
            prop="MatchTimeStr"
            label="通知类型">
          </el-table-column>
          <el-table-column
            prop="MatchID"
            label="通知标题">
          </el-table-column>
          <el-table-column
            prop="CompetitionName"
            label="发送时间">
          </el-table-column>
          <el-table-column
            prop="teamvs"
            label="发送人">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="before_js_onlineFn( scope.row )" v-if="scope.row.subscribe === '0'" type="primary" size="small">
                订阅比赛
              </el-button>
              <el-button v-else @click="before_js_onlineFn( scope.row )" type="danger" size="small">
                详情
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
</template>
<script>
export default {
    data(){
        return{
            timeVal: '',
            pickerOptions: {
            shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近一个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
                }
            }, {
                text: '最近三个月',
                onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
                }
            }]
            },
        }
    }
}
</script>
<style scope>
    .block{
        text-align: center;
        margin: 0 auto;
    }
</style>