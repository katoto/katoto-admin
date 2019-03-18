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
                            size="small"
                            type="daterange"
                            align="right"
                            unlink-panels
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
                    prop="index"
                    label="序号"/>
                <el-table-column
                    prop="msgtype"
                    label="通知类型"/>
                <el-table-column
                    prop="msgtitle"
                    label="通知标题"/>
                <el-table-column
                    prop="msgtime"
                    label="发送时间"/>
                <el-table-column
                    prop="msgname"
                    label="发送人"/>
                <el-table-column
                    label="操作"
                    width="230px">
                    <template 
                        slot-scope="scope" 
                        class="mailmsgOpera">
                        <el-select 
                            v-model="value" 
                            size="small" 
                            placeholder="请选择">
                            <el-option
                                v-for="item in langOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"/>
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
                <p>{{ dialogmsg }}</p>
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
export default {
    data(){
        return{
            dialogTableVisible: false, // 详情弹窗
            dialogmsg: null, // 详情信息
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
            goodsList:[
                {
                    index:1,
                    msgtype: '普通通知',
                    msgtitle: '比赛不打了',
                    msgtime: '11',
                    msgname: 'aa'
                },
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
    methods:{
        searchExpectFn(){
            
        },
        js_showmsgFn(){
            this.dialogTableVisible = true
            this.dialogmsg = 'ssfdafewr测试'
        }
    }
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