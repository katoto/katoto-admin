<template>
    <section class="app-container">
        <div>
            <section class="clear">
                <div style="float:left">
                <!-- 新增币种选择 -->
                  <section style="float: left;margin-top: 4px">
                    <span style="font-size: 14px">用户类型: </span>
                    <el-select size="small" v-model="userStyle" placeholder="请选择">
                      <el-option
                        v-for="item in userStyleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                  </el-select>
                  </section>
                </div>
                <div style="float: right" class="seaUid">
                  <el-input v-model="searchUid" size="small" placeholder="uid 查询"></el-input>
                  <el-button @click="searchExpectFn()" type="primary" plain size="small">
                      查询
                  </el-button>
                </div>
            </section>
            <section style="float:right;margin-right:20px">
                <el-button @click="toggleSelection(goodsList)" type="primary" plain size="small">
                    全选
                </el-button>
                <span style="font-size: 14px"> &nbsp;统一分类为: </span>
                <el-select size="small" v-model="userStyle" placeholder="请选择">
                    <el-option
                      v-for="item in userStyleOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </section>
            <el-table
                :data="goodsList"
                stripe
                highlight-current-row
                ref="multipleTable"
                style="width: 100%">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
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
                label="注册时间">
                </el-table-column>
                <el-table-column
                prop="exchangetime"
                label="用户分类">
                </el-table-column>
                <el-table-column
                label="操作"
                width="230px">
                <template slot-scope="scope" class="mailmsgOpera">
                    <section>
                      <el-select size="small" v-model="userStyle" placeholder="请选择">
                          <el-option
                            v-for="item in userStyleOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>
                    </section>
                </template>
                </el-table-column>
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
        </div>
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
      userStyleOptions:[
        {
          value: '-1',
          label: 'All'
        }, {
          value: '1',
          label: '普通用户'
        }, {
          value: '2',
          label: '羊毛用户'
        }, {
          value: '3',
          label: '大R用户'
        }, {
          value: '4',
          label: '普通付费用户'
        }
      ],
      userStyle:'-1'
    }
  },
  created() {
  },
  methods: {
    toggleSelection(tableData=[]){
      if(tableData.length>0){
        tableData.forEach(row=>{
          this.$refs.multipleTable.toggleRowSelection(row);
        })
      }
    }
  }
}
</script>
<style scope>
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
</style>
