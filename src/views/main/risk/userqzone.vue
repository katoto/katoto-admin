<template>
    <section class="app-container">
        <div>
            <section class="clear">
                <div style="float:left">
                    <!-- 新增币种选择 -->
                    <section style="float: left;margin-top: 4px">
                        <span style="font-size: 14px">用户类型: </span>
                        <el-select 
                            v-model="userStyle" 
                            size="small" 
                            placeholder="请选择">
                            <el-option
                                v-for="item in userStyleOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
                        </el-select>
                    </section>
                </div>
                <div 
                    style="float: right" 
                    class="seaUid">
                    <el-input 
                        v-model="searchUid" 
                        size="small" 
                        placeholder="uid 查询"/>
                    <el-button 
                        type="primary" 
                        plain 
                        size="small" 
                        @click="searchExpectFn()">
                        查询
                    </el-button>
                </div>
            </section>
            <section style="float:right;margin-right:20px">
                <el-button 
                    type="primary" 
                    plain 
                    size="small" 
                    @click="toggleSelection(goodsList)">
                    全选
                </el-button>
                <span style="font-size: 14px"> &nbsp;统一分类为: </span>
                <el-select 
                    v-model="userStyle" 
                    size="small" 
                    placeholder="请选择">
                    <el-option
                        v-for="item in userStyleOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"/>
                </el-select>
            </section>
            <el-table
                ref="multipleTable"
                :data="goodsList"
                stripe
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55"/>
                <el-table-column
                    prop="index"
                    label="序号"/>
                <el-table-column
                    prop="uid"
                    label="用户uid"/>
                <el-table-column
                    prop="goodsname"
                    label="注册时间"/>
                <el-table-column
                    prop="exchangetime"
                    label="用户分类"/>
                <el-table-column
                    label="操作"
                    width="230px">
                    <template 
                        slot-scope="scope" 
                        class="mailmsgOpera">
                        <section>
                            <el-select 
                                v-model="userStyle" 
                                size="small" 
                                placeholder="请选择">
                                <el-option
                                    v-for="item in userStyleOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"/>
                            </el-select>
                        </section>
                    </template>
                </el-table-column>
            </el-table>
            <div 
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
            </div>
        </div>
    </section>
</template>

<script>
// import { getList } from '@/api/table'

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
<style scoped>
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
