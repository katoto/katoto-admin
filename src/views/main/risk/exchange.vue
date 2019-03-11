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
                prop="msgtype"
                label="通知类型">
                </el-table-column>
                <el-table-column
                prop="msgtitle"
                label="通知标题">
                </el-table-column>
                <el-table-column
                prop="msgtime"
                label="发送时间">
                </el-table-column>
                <el-table-column
                prop="msgname"
                label="发送人">
                </el-table-column>
                <el-table-column
                label="操作"
                width="230px">
                <template slot-scope="scope" class="mailmsgOpera">
                    <el-select size="small" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in langOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button @click="js_showmsgFn( scope.row )" type="danger" size="small">
                        详情
                    </el-button>
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
    }
  },
  created() {
  },
  methods: {

  }
}
</script>
