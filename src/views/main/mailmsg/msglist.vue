<template>
    <section>
        <div>
            <section class="clear">
                <div style="float: right">
                    <div 
                        class="block" 
                        style="display: inline-block;">
                        <el-date-picker
                            v-model="timeVal"
                            :picker-options="pickerOptions"
                            :default-value="new Date()"
                            size="small"
                            type="daterange"
                            align="right"
                            unlink-panels
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"/>
                    </div>
                    <el-button 
                        type="primary" 
                        plain 
                        size="small" 
                        @click="searchExpectFn()">
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
                    prop="typename"
                    label="通知类型"/>
                <el-table-column
                    label="通知标题"
                >
                    <template slot-scope="scope" >
                        <div 
                            v-for="(val, key) in scope.row.title" 
                            :key="key">
                            <span v-if="scope.row.currTitle === key">{{ val }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="crtime"
                    label="发送时间"
                    width="200px"/>
                <el-table-column
                    prop="from_username"
                    label="发送人"
                    width="150px"
                />
                <el-table-column
                    label="操作"
                    width="240px">
                    <template 
                        slot-scope="scope" 
                        class="mailmsgOpera">
                        <el-select
                            v-model="scope.row.currTitle" 
                            size="small" 
                            placeholder="请选择">
                            <el-option
                                v-for="(val, key) in scope.row.content"
                                :key="key"
                                :label="key"
                                :value="key"/>
                        </el-select>
                        <el-button 
                            type="danger" 
                            size="small" 
                            @click="js_showmsgFn( scope.row )">
                            详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--导入UId弹窗 -->
        <el-dialog 
            :visible.sync="dialogTableVisible" 
            title="已通知详情:" >
            <div>
                <p>标题：{{ dialogtitle }}</p>
                <p>内容：{{ dialogmsg }}</p>
            </div>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button 
                    type="primary" 
                    @click="dialogTableVisible = false" >知道了</el-button>
            </div>
        </el-dialog>
    </section>
</template>
<script>
import {formatCoinTime} from '@/utils/utils'

export default {
    data(){
        return{
            currTitle: 'English',
            dialogTableVisible: false, // 详情弹窗
            dialogmsg: null, // 详情信息
            dialogtitle: null,
            timeVal: '', // 时间
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
            goodsList:[
                {
                    index:1,
                    msgtype: '普通通知',
                    msgtitle: '比赛不打了',
                    msgtime: '11',
                    msgname: 'aa'
                }
            ],
            langOptions: [
                {
                    value: 'englist',
                    label: 'englist'
                },
                {
                    value: 'india',
                    label: 'india'
                }
            ],
            value: 'englist'
        }
    },
    async mounted() {
        // this.timeVal = [, new Date()]
        this.timeVal = [this.formatCoinTime(new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)), this.formatCoinTime(new Date())]
        this.getnoticeList()
    },
    methods:{
        formatCoinTime,
        searchExpectFn(){
            this.$nextTick(()=>{
                this.getnoticeList()
            })
        },
        js_showmsgFn(row){
            this.dialogTableVisible = true
            this.dialogtitle = row.title[row.currTitle]
            this.dialogmsg = row.content[row.currTitle]
        },
        formateNotice(notice){
            if(notice && notice.length > 0){
                notice.forEach((item, index)=>{
                    item.currTitle = Object.keys(item.title)[0]
                })
            }
            return [...notice]
        },
        async getnoticeList(){
            let sendObj = {}
            sendObj.start_date = this.timeVal[0]
            sendObj.end_date = this.timeVal[1]
            sendObj.pageno = '1'
            sendObj.pagesize = '99999'
            await this.$store.dispatch('noticeList', sendObj).then((res) => {
                if(res){
                    this.goodsList = this.formateNotice(res.notice_list)
                }
            })
        }
    },
}
</script>
<style scoped>
    .block{
        text-align: center;
        margin: 10px auto;
    }
    .el-select{
        width: 88px;
    }
</style>