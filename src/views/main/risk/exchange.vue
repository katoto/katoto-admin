<template>
    <section class="app-container">
        <div>
            <section class="clear">
                <div style="float:left">
                    <section style="float: left;margin-top: 4px">
                        <span style="font-size: 14px">状态筛选: </span>
                        <el-select 
                            v-model="selStyle" 
                            size="small" 
                            placeholder="请选择"
                            @change="exchangeFn"
                        >
                            <el-option
                                v-for="item in selstyleOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
                        </el-select>
                    </section>
                </div>
                <div style="float: right">
                    <el-input 
                        v-model="searchUid" 
                        size="small" 
                        placeholder="uid 查询"/>
                    <el-button 
                        type="primary" 
                        plain 
                        size="small" 
                        @click="goodslist()">
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
                    prop="uid"
                    label="用户uid"/>
                <el-table-column
                    prop="goodsname"
                    label="兑换商品"/>
                <el-table-column
                    prop="crtime"
                    label="兑换时间"/>
                <el-table-column
                    prop="orderstatusStr"
                    label="审核状态"/>
                <el-table-column
                    label="操作"
                    width="230px">
                    <template 
                        slot-scope="scope" 
                        class="mailmsgOpera">
                        <section>
                            <el-button 
                                type="primary" 
                                size="small" 
                                @click="js_useMsg( scope.row )">
                                查看
                            </el-button>
                            <el-button 
                                :disabled="scope.row.orderstatus==='1'" 
                                type="success" 
                                size="small" 
                                @click="js_showmsgFn( scope.row, '1' )">
                                通过
                            </el-button>
                            <el-button 
                                :disabled="scope.row.orderstatus==='-1'" 
                                type="danger" 
                                size="small" 
                                @click="js_showmsgFn( scope.row, '-1' )">
                                拒绝
                            </el-button>
                        </section>
                    </template>
                </el-table-column>
            </el-table>
            <div 
                class="block" 
                style="text-align:center">
                <el-pagination
                    :current-page.sync="listPageNumber"
                    :page-size="listPageSize"
                    :page-count="listMsgCounts"
                    background
                    size="small"
                    layout="prev, pager, next,jumper"
                    @current-change="listCurrentChange"
                />
            </div>
            
        </div>
        <el-dialog 
            :fullscreen="true" 
            :visible.sync="showUidMsg" 
            height="50%" 
            width="80%" 
            title="用户信息审核" 
            center>
            <section style="text-align:center">
                <el-table :data="userinfo">
                    <el-table-column 
                        prop="username" 
                        label="用户名"/>
                    <el-table-column 
                        prop="uid" 
                        label="用户ID"/>
                    <el-table-column 
                        label="用户头像">
                        <template slot-scope="scope">
                            <img :src="scope.row.photo">
                        </template>
                    </el-table-column>
                    <el-table-column 
                        prop="ip" 
                        label="IP 信息"/>
                    <el-table-column 
                        prop="regtime" 
                        label="注册时间"/>
                    <el-table-column 
                        prop="logintime" 
                        label="最后登录时间"/>
                    <el-table-column 
                        prop="deviceid" 
                        label="手机设备号"/>
                </el-table>
            </section>
            <section style="margin-top: 50px;border-top: 2px solid #ccc;padding-top: 10px">
                <h4 style="text-align:center">关联账号信息</h4>
                <el-table :data="userinfosimilar">
                    <el-table-column 
                        prop="matchStr" 
                        width="110" 
                        label="关联原因"/>
                    <el-table-column 
                        prop="username" 
                        width="130" 
                        label="用户名"/>
                    <el-table-column 
                        prop="uid" 
                        width="130" 
                        label="用户ID"/>
                    <el-table-column 
                        width="130"
                        label="用户头像">
                        <template slot-scope="scope">
                            <img :src="scope.row.photo" >
                        </template>
                    </el-table-column>
                    <el-table-column 
                        prop="ip" 
                        width="150" 
                        label="IP信息"/>
                    <el-table-column 
                        prop="regtime" 
                        label="注册时间"/>
                    <el-table-column 
                        prop="deviceid" 
                        label="设备号"/>
                </el-table>
            </section>
            
            <el-collapse 
                v-model="activeNames" 
                @change="collChange">
                <el-collapse-item 
                    title="流水信息汇总(点击查看)" 
                    name="1">
                    <el-table 
                        :data="sumAccountMsg" 
                        border 
                        stripe>
                        <el-table-column 
                            prop="inout" 
                            label="流水代码"/>
                        <el-table-column 
                            prop="desc" 
                            label="流水名"/>
                        <el-table-column 
                            prop="golds" 
                            label="流水总额"/>
                    </el-table>
                </el-collapse-item>
                <el-collapse-item 
                    title="流水明细(点击查看)" 
                    name="2">
                    <el-table 
                        :data="accountlogs" 
                        border 
                        stripe>
                        <el-table-column 
                            prop="crtime" 
                            label="时间"/>
                        <el-table-column 
                            prop="desc" 
                            label="流水类型"/>
                        <el-table-column 
                            prop="golds" 
                            label="流水数量"/>
                        <el-table-column 
                            prop="balance" 
                            width="200" 
                            label="余额"/>
                        <el-table-column 
                            prop="remark" 
                            label="备注信息"/>
                    </el-table>
                    <div 
                        class="block" 
                        style="text-align:center">
                        <el-pagination
                            :current-page.sync="logNumber"
                            :page-size="logSize"
                            :page-count="logCounts"
                            background
                            size="small"
                            layout="prev, pager, next,jumper"
                            @current-change="logCurrentChange"
                        />
                    </div>
                </el-collapse-item>
            </el-collapse>
            
        </el-dialog>
    </section>
</template>

<script>

export default {
    data() {
        return {
            accountUid: '10015471',
            accountlogs: [],
            sumAccountMsg: [],
            
            logNumber: 1,
            logSize: 8,
            logCounts: 3,
            
            userinfo: [],  // 用户信息
            userinfosimilar: [],  // 关联账户信息
            
            
            listPageNumber: 1,
            listPageSize: 10,
            listMsgCounts: 3,
            
            activeNames: [],
            showUidMsg: false, // 详细弹窗
            goodsList: [
                {
                }
            ],
            searchUid: '',
            selstyleOptions:[
                {
                    value: '-2',
                    label: 'All'
                }, {
                    value: '-1',
                    label: '审核拒绝'
                }, {
                    value: '1',
                    label: '审核通过'
                }, {
                    value: '2',
                    label: '已删除'
                }, {
                    value: '3',
                    label: '待审核'
                }
            ],
            selStyle:'-2',
            baseObj:{
                '1': '审核通过',
                '-2': 'All',
                '-1': '审核拒绝',
                '3': '待审核',
                '2': '已删除',
            }
        }
    },
    created() {
        this.goodslist()
    },
    mounted() {
        // this.js_useMsg()
    },
    methods: {
        logCurrentChange(num){
            this.logNumber = parseFloat(num)
            this.$nextTick((item)=>{
                this.getAccountLogs()
            })
        },
        async getAccountLogs(){
            let obj = {
                pageno: this.logNumber,
                pagesize: this.logSize,
                uid: this.accountUid
            }
            let logs = await this.$store.dispatch('risk_logs', obj)
            console.log(logs)
            if(logs){
                this.accountlogs = []
                this.accountlogs = logs.account_logs
                this.logCounts = parseFloat(logs.pages)
            } else {
                this.$message({
                    type: 'error',
                    message: '用户流水log'
                })
            }
        },
        js_useMsg(row){
            this.getAccountinf(row.uid)
            this.accountUid = row.uid
            this.activeNames = []
            this.showUidMsg = true
        },
        formateSim(arr){
            if(arr && arr.length){
                arr.forEach((item, index) =>{
                    if(item.match_deviceid==='1') item.matchStr = '设备码'
                    if(item.match_ip==='1') item.matchStr = 'ip匹配'
                    if(item.match_username==='1') item.matchStr = '用户名匹配'
                })
            }
            return arr
        },
        async getAccountinf(uid = '10015471'){
            let obj = {
                uid
            }
            let accountinf = await this.$store.dispatch('risk_accountinf', obj)
            if(accountinf){
                this.userinfo = []
                this.userinfo.push(accountinf.userinfo)
                this.userinfosimilar = this.formateSim(accountinf.similar_userinfo)
                
            } else {
                this.$message({
                    type: 'error',
                    message: '用户信息获取失败'
                })
            }
        },
        async js_showmsgFn(row, orderstatus){
            // 通过 or 拒绝
            let obj = {
                orderid: row.orderid,
                uid: row.uid,
                orderstatus
            }
            let exchangeList = await this.$store.dispatch('risk_goodsReview', obj)
            if(exchangeList){
                this.$message({
                    type: 'success',
                    message: '操作成功'
                })
                this.goodslist()
            } else {
                this.$message({
                    type: 'error',
                    message: '操作失败'
                })
            }
        },
        exchangeFn(val){
            this.$nextTick(()=>{
                this.goodslist()
            })
        },
        listCurrentChange(num = 1){
            this.listPageNumber = num.toString()
            this.goodslist()
        },
        formateExchangeList(order){
            if(order && order.length>0){
                order.forEach((item) =>{
                    item.orderstatusStr = this.baseObj[item.orderstatus]
                })
            }
            return order
        },
        async goodslist(){
            let reg = /^[0-9,]+$/g
            if(this.searchUid && !reg.test(this.searchUid)){
                this.$message({
                    type: 'error',
                    message: 'uid格式不正确'
                })
                return false
            }
            // -2 all
            let obj = {
                orderstatus: this.selStyle.toString(),
                pageno: this.listPageNumber.toString(),
                pagesize: this.listPageSize.toString(),
                uid: this.searchUid
            }
            let exchangeList = await this.$store.dispatch('risk_goodslist', obj)
            if(exchangeList){
                if(exchangeList.orders) this.goodsList = this.formateExchangeList(exchangeList.orders)
                if(exchangeList.pages) this.listMsgCounts = parseFloat(exchangeList.pages)
            }
            console.log(exchangeList)
        },
        goodsReview(row){
            
        },
        collChange(val) {
            if(val.indexOf('2')>-1){
                this.getAccountLogs()
            }
            if(val.indexOf('1')>-1){
                this.getAllinfo( this.accountUid )
            }
            console.log(val);
        },
        async getAllinfo(uid = '10015471'){
            let obj = {
                uid
            }
            let accountinf = await this.$store.dispatch('risk_sumlogs', obj)
            if(accountinf){
                this.sumAccountMsg = []
                this.sumAccountMsg = accountinf.account_summary
            } else {
                this.$message({
                    type: 'error',
                    message: '用户信息获取失败'
                })
            }
        },        
    },
}
</script>
<style scoped>
  .el-input {
    width: 200px;
    line-height: 40px;
  }
  .el-collapse-item{
    text-align: center;
  }

</style>
<style>
    .el-collapse-item__header{
        font-weight: 800;
    }
</style>
