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
                    v-model="allLevelStyle" 
                    size="small" 
                    placeholder="请选择"
                    @change="allOpenLevFn"
                >
                    <el-option
                        v-for="item in allLevelOptions"
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
                style="width: 100%"
                @selection-change="selectionChange">
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
                        <el-button 
                            size="small" 
                            @click="showOpt(scope.row)">操作</el-button>
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
        
        <!--导入UId弹窗 -->
        <el-dialog 
            :visible.sync="dialogTableVisible" 
            title="注意！" >
            <div>
                <span>设置用户 {{ opeUId }} 等级:</span>
                <el-select 
                    v-model="opelevel" 
                    size="small" 
                    placeholder="请选择">
                    <el-option
                        v-for="item in opelevelObj"
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
                    @click="uplevelFn">确 定</el-button>
            </div>
        </el-dialog>
        
    </section>
</template>

<script>

export default {
    data() {
        return {
            dialogTableVisible: false,
            
            userPageNumber: 1,
            userPageSize: 10,
            userMsgCounts: 3,
            
            allLevelStyle: '-2',
            allLevelOptions:[
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
                '-2': 'All',
                '2': '大R用户',
            },
            opelevel:'-2',
            opeUId: '',
            opelevelObj:[
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
            selArr:[],
        }
    },
    created() {
        this.userslistFn()
    },
    methods: {
        allOpenLevFn(){
            if(this.selArr.length>0){
                this.opelevel = this.allLevelStyle.toString()
                this.$nextTick(()=>{
                    this.uplevelFn()
                })
            }else{
                this.$message({
                    type: 'warn',
                    message: '请勾选用户'
                })
            }
        },
        selectionChange(val){
            this.selArr = [...val]
            let baseStr = ''
            if(this.selArr && this.selArr.length>0){
                this.selArr.forEach((item)=>{
                    baseStr += item.uid + ','
                })
                this.opeUId = baseStr.slice(0, -1)
                console.log(this.opeUId)
            }
        },
        async uplevelFn(){
            // 更新用户等级
            let obj = {
                level: this.opelevel.toString(),
                uid: this.opeUId
            }
            let level = await this.$store.dispatch('risk_levelUpdate', obj)
            if(level){
                this.$message({
                    type: 'success',
                    message: '操作用户等级成功'
                })
                this.dialogTableVisible = false
                this.userslistFn()
            } else {
                this.$message({
                    type: 'error',
                    message: '操作用户等级error'
                })
            }
        },
        showOpt(row){
            this.dialogTableVisible = true
            this.opeUId = row.uid
            this.opelevel = row.level
        },
        searchExpectFn(){
            this.$nextTick(()=>{
                this.userslistFn()
            })
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
            // 测试uid
            let reg = /^[0-9,]+$/g
            if(this.searchUid && !reg.test(this.searchUid)){
                this.$message({
                    type: 'error',
                    message: 'uid格式不正确'
                })
                return false
            }
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
                this.$refs.multipleTable.toggleAllSelection(tableData)
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
