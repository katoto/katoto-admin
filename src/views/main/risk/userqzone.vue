<template>
    <section class="app-container">
        <div>
            <section class="clear">
                <div style="float:left">
                    <!-- 新增币种选择 -->
                    <section style="float: left;margin-top: 4px">
                        <span style="font-size: 14px">用户类型: </span>
                        <el-select 
                            v-model="level" 
                            size="small" 
                            placeholder="请选择"
                            @change="userzoneChange"
                        >
                            <el-option
                                v-for="item in levelStyleOptions"
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
                        placeholder="uid查询 (多个用，分隔)"/>
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
                    @click="toggleSelection(userslist)">
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
                :data="userslist"
                stripe
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    type="selection"
                    width="55"/>
                <el-table-column
                    prop="uid"
                    label="用户uid"/>
                <el-table-column
                    prop="regtime"
                    label="注册时间"/>
                <el-table-column
                    prop="levelStr"
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
            userPageNumber: 1,
            userPageSize: 10,
            userMsgCounts: 3,
            
            userStyle: '',
            userStyleOptions:[],
            userslist: [
            ],
            searchUid: "",
            levelStyleOptions:[
                {
                    value: '-2',
                    label: 'All'
                }, {
                    value: '0',
                    label: '普通用户'
                }, {
                    value: '1',
                    label: '普通付费用户'
                }, {
                    value: '2',
                    label: '大R用户'
                }, {
                    value: '-1',
                    label: '羊毛党'
                }
            ],
            level:'-2',
            levelObj:{
                '1': '普通付费用户',
                '-1': '羊毛党',
                '0': '普通用户',
                '-2': '普通付费用户',
                '2': '大R用户',
            }
        }
    },
    created() {
        this.userslistFn()
    },
    methods: {
        searchExpectFn(){
            this.userslistFn()
        },
        userzoneChange(){
            this.userslistFn()
        },
        userCurrentChange(num=1){
            this.userPageNumber = num.toString()
            this.userslistFn()
        },
        formateUserList(list){
            if(list && list.length>0){
                list.forEach((item)=>{
                    item.levelStr = this.levelObj[item.level]
                })
            }
            return list
        },
        async userslistFn(){
            let obj = {
                level: this.level.toString(),
                pageno: this.userPageNumber.toString(),
                pagesize: this.userPageSize.toString(),
                uid: this.searchUid
            }
            let exchangeList = await this.$store.dispatch('risk_userlist', obj)
            if(exchangeList){
                if(exchangeList.userinfos) this.userslist = this.formateUserList(exchangeList.userinfos)
                if(exchangeList.pages) this.userMsgCounts = parseFloat(exchangeList.pages)
            } else {
                this.$message({
                    type: 'error',
                    message: '操作失败'
                })
            }
        },
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
