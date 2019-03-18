<template>
    <div class="app-container">
        <section>
            <div>
                <section class="clear">
                    <p style="float: left">足球赛事订阅后台</p>
                    <section style="margin-left: 100px;float: left;margin-top: 4px"/>
                    <div style="float: right">
                        <span style="font-size: 14px">查询条件: </span>
                        <el-select 
                            v-model="selfootball" 
                            size="small" 
                            placeholder="请选择">
                            <el-option
                                v-for="item in selfootballOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
                        </el-select>
                        <el-input 
                            v-model="searchExpect" 
                            :placeholder="searchName" 
                            size="small" 
                            class="common-input"/>
                        <el-button 
                            type="primary" 
                            plain 
                            size="small" 
                            @click="searchExpectFn()">
                            查询
                        </el-button>
                        <el-button 
                            type="warning" 
                            size="small" 
                            @click="initWithdraw()">
                            重置
                        </el-button>
                    </div>
                </section>
                <!--type="index"   index  -->
                <el-table
                    :data="goodsList"
                    stripe
                    highlight-current-row
                    style="width: 100%">
                    <el-table-column
                        prop="index"
                        width="50"
                        label="序号"/>
                    <el-table-column
                        prop="MatchTimeStr"
                        width="150"
                        label="比赛时间"/>
                    <el-table-column
                        prop="MatchID"
                        width="110"
                        label="比赛ID"/>
                    <el-table-column
                        prop="CompetitionName"
                        label="联赛类型"/>
                    <el-table-column
                        prop="teamvs"
                        label="比赛对阵"/>
                    <el-table-column
                        prop="scorevs"
                        label="比分"
                        width="120"/>
                    <el-table-column
                        prop="stateVal"
                        label="赛事状态"
                        width="120"/>		  
                    <el-table-column
                        label="操作"
                        width="120">
                        <template slot-scope="scope">
                            <el-button 
                                v-if="scope.row.subscribe === '0'" 
                                type="primary" 
                                size="small" 
                                @click="before_js_onlineFn( scope.row )">
                                订阅比赛
                            </el-button>
                            <el-button 
                                v-else 
                                type="danger" 
                                size="small" 
                                @click="before_js_onlineFn( scope.row )">
                                取消订阅
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="修改比分"
                        width="120">
                        <template slot-scope="scope">
                            <el-button 
                                type="primary" 
                                size="small" 
                                @click="scoreOption( scope.row )">
                                修改比分
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="block">
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
        </div> -->
            </div>

        </section>
        <!-- 提款申请 -->

        <!-- 上下线 -->
        <el-dialog
            :visible.sync="onlineVisible"
            title="注意！"
            width="30%">
            <span>{{ onlineMsg }}</span>
            <span 
                slot="footer" 
                class="dialog-footer">
                <el-button @click="onlineVisible = false">取 消</el-button>
                <el-button 
                    type="danger" 
                    @click="js_onlineFn">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改比分操作弹窗 -->
        <el-dialog 
            :visible.sync="dialogTableVisible" 
            title="注意！">
            <div>
                <span>请输入{{ score_matchid }}的修正比分</span>  {{ score_Home }} ： {{ score_Away }} ?<br>
                <el-input 
                    v-model="score_Home" 
                    style="width:150px" 
                    type="number" 
                    placeholder="主队修正比分"/> : 
                <el-input 
                    v-model="score_Away" 
                    style="width:150px" 
                    type="number" 
                    placeholder="客队修正比分"/>
            </div>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button 
                    type="primary" 
                    @click="sureScoreFn">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import {mTypes, aTypes} from '@/store/modules/football'
import {formateCoinType, formatCoinTime} from '@/utils/index.js'

let formatTime = function (picker, time) {
    const end = new Date();
    const start = new Date();
    end.setTime(start.getTime() + (time * 1000));
    picker.$emit('pick', [start, end]);
}

export default {
    filters: {
        formatCoinTime,
    },
    data() {
        return {
            selfootball: '1',
            selfootballOptions: [{
                value: '1',
                label: '比赛ID'
            }, {
                value: '2',
                label: '对阵球队名'
            }, {
                value: '3',
                label: '联赛类型'
            }],
            searchName: '请输入查询比赛ID',
		
            onlineVisible: false, // 订阅
            onlineMsg: '出错啦',
            onlinecurrRowData: null,
            score_Home: '*',
            score_Away: "*",
            score_matchid: '*',
            dialogTableVisible: false,
            score_currMsg: '',
		

            searchExpect: null,

            pageCounts: 10,
            pageNumber: 1,
            pageSize: 20,
            currPageNumber: null,

            goodsList: [],
            currLineData: null,
            currType: null,
            currUserUid: null,
        }
    },
    computed: {},
    watch:{
        selfootball(){
            this.searchName = '请输入查询'
            this.searchName = this.searchName + this.selfootballOptions[parseFloat( this.selfootball )-1].label
        }
    },
    async mounted() {
      	this.ajaxfootList()
    },
    methods: {
	  formatCoinTime,
	  scoreOption(data){
		  this.score_matchid = 'MatchID' + data.MatchID
		  this.score_currMsg = data
		  this.score_Home = data.HomeTeamScore
		  this.score_Away = data.AwayTeamScore
		  this.dialogTableVisible = true
	  },
        async before_js_onlineFn(rowData) {
        // 订阅比赛
            if (rowData.subscribe === '0') {
                this.onlineMsg = '确定订阅(比赛ID' + rowData.MatchID + ')？';
                Object.assign(rowData, {
                    operateState: '1'
                })
            } else {
                this.onlineMsg = '确定取消订阅(比赛ID' + rowData.expectId + ')？';
                Object.assign(rowData, {
                    operateState: '0'
                })
            }
            this.onlineVisible = true;
            this.onlinecurrRowData = rowData;
        },
        async js_onlineFn() {
        // 提交订阅修改
            let setGoodsOperateData = await this.$store.dispatch(aTypes.setsubscribeOperate, this.onlinecurrRowData);
            if (setGoodsOperateData) {
                this.onlineVisible = false;
                this.onlineMsg = '??';
                this.ajaxfootList(1);
                this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1200
                })
            }
	  },
        async sureScoreFn() {
            let surePayBack = null;
            if(!this.score_Home || !this.score_Away ){
                this.$message({
                    message: '请输入比分',
                    type: 'error',
                    duration: 1200
                })
                return false
            }
            if(isNaN( this.score_Home ) || isNaN( this.score_Away )){
                this.$message({
                    message: '比分输入有误',
                    type: 'error',
                    duration: 1200
                })
                return false
            }
            Object.assign(this.score_currMsg, {
                result: this.score_Home + ':' + this.score_Away
            });
            surePayBack = await this.$store.dispatch(aTypes.setScoreOperate, this.score_currMsg);
            if (surePayBack) {
                this.dialogTableVisible = false;
                //   this.ajaxfootList(1);
		  this.searchExpectFn()
                this.$message({
                    message: '操作成功',
                    type: 'success',
                    duration: 1200
                });
            }
	  },	 
        initWithdraw() {
        /* 初始化当前列表 */
            this.searchExpect = null;
            this.pageNumber = 1;
            this.pageSize = 10;
            this.ajaxfootList(1)
        },
        async searchExpectFn() {
            if (!this.searchExpect) {
                this.$message({
                    message: '输入查询参数',
                    type: 'error',
                    duration: 1200
                });
                return false;
            }
            let baseObj = {}
            switch(this.selfootball){
            case '1':
                baseObj.matchid = this.searchExpect
                ;break
            case '2':
                baseObj.teamname = this.searchExpect
                ;break
            case '3':
                baseObj.competitionname = this.searchExpect
                ;break
            }		
            // 查询场次详情
            let withDrawMsg = await this.$store.dispatch(aTypes.getsearchList, baseObj);
            if (withDrawMsg) {
                this.goodsListFormat(withDrawMsg)
            }
        },
        goodsListFormat(withDrawMsg) {
            if (withDrawMsg.matches) {
                withDrawMsg.matches.forEach((val, index) => {
                    val.index = Number(index) + 1;
                    val.MatchTimeStr = this.formatCoinTime(parseFloat(val.MatchTime)*1000, 'yyyy-MM-dd HH:mm');
                    val.teamvs = val.HomeTeamName + ' vs ' + val.AwayTeamName;
                    val.scorevs = val.HomeTeamScore + ' : ' + val.AwayTeamScore;
                    if (val.State !== undefined) {
                        switch (val.State) {
                        case '0':
                            val.stateVal = '未开始';
                            break;
                        case '1':
                            val.stateVal = '完场';
                            break;
                        case '2':
                            val.stateVal = '比赛取消但订单未取消';
                            break;
                        case '3':
                            val.stateVal = '进行中';
                            break;
                        case '4':
                            val.stateVal = '暂停';
                            break;
                        case '5':
                            val.stateVal = '取缔';
                            break;
                        }
                    }
                });
                this.goodsList = withDrawMsg.matches
            }
        },
        confirmFn(lineData, type) {


            this.currLineData = lineData;
            this.currType = type;
        },
        //   async handleCurrentChange(val) {
        //     let withDrawMsg = null;
        //     this.currPageNumber = Number(val);
        //     this.ajaxfootList(Number(val))
        //   },
        // 弹窗里头的分页
        async userCurrentChange(val) {
            let msgBottom = null;
            if (this.currUserUid !== '') {
                msgBottom = await this.$store.dispatch(aTypes.getAccountDetail, {
                    'pageno': Number(val),
                    'pageSize': 8,
                    'uid': this.currUserUid
                })
            } else {
                msgBottom = await this.$store.dispatch(aTypes.getAccountDetail, {
                    'pageno': Number(val),
                    'pageSize': 8
                })
            }
            this.userPageNumber = Number(msgBottom.currentPage);
            this.userMsgCounts = Number(msgBottom.pages);
            this.ordersFormate(msgBottom)

            if (withDrawMsg) {
                this.pageCounts = Number(withDrawMsg.pages);
            }
        },
        ordersFormate(msgBottom) {
            if (msgBottom) {
                if (msgBottom.orders) {
                    msgBottom.orders.forEach((val, index) => {
                        if (val.inout !== undefined) {
                            switch (val.inout) {
                            case '1':
                                val.inoutVal = '投注'
                                break;
                            case '2':
                                val.inoutVal = '中奖'
                                break;
                            case '3':
                                val.inoutVal = '退款'
                                break;
                            case '4':
                                val.inoutVal = '提款'
                                break;
                            case '5':
                                val.inoutVal = '充值'
                                break;
                            }
                        }
                        val.goodsTypeVal = formateCoinType(val.cointype)
                    })
                }
                this.userMoreList = msgBottom.orders
            }
        },
        async ajaxfootList(pagenum = 1) {
            let withDrawMsg = null;
            let goodListObj = {}
            Object.assign(goodListObj, {
                'pageno': parseFloat(pagenum),
                'pageSize': this.pageSize
            })
            withDrawMsg = await this.$store.dispatch(aTypes.getGoodsList, goodListObj);
            if (withDrawMsg) {
                this.goodsListFormat(withDrawMsg)
            }
        }
    },
}
</script>
<style>
  .operateReview .el-button {
    margin-left: 0 !important;
  }

  .goodsDialog p {
    text-align: center;
    font-weight: bold;
  }

  .operateStyle i {
    padding: 10px;
    cursor: pointer;
  }

  .el-dialog__body {
    padding-top: 0 !important;
  }

  .operateStyle i:hover {
    background-color: #e4e4e4;
  }

  .el-button {
    margin-bottom: 1px;
  }

  .common-input {
      width: 195px;
  }

  .el-pagination {
    text-align: center;
    margin-top: 10px;
  }

  .clear:after {
    content: '';
    clear: both;
    display: block;
    height: 0;
    visibility: hidden
  }
</style>
