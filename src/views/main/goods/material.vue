<template>
    <div class="page">
        <h2>实物奖品派发</h2>
        <el-select 
            v-model="goodsid"
            style="float: left">
            <el-option 
                label="All" 
                value=""/>
            <el-option 
                v-for="item in types"
                :key="item.goodsname"
                :label="item.goodsname" 
                :value="item.goodsid"/>
        </el-select>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                label="No."
                prop="index"
                width="80"
            />
            <el-table-column
                label="领取时间"
                prop="crtime"
            />
            <el-table-column
                label="订单编号"
                prop="orderid"
            >
                <template slot-scope="scope">
                    <a 
                        href="javascript:;"
                        class="link"
                        @click="modify(scope.row)">{{ scope.row.orderid }}</a>
                </template>
            </el-table-column>
            <el-table-column
                label="商品种类"
                prop="goodsname"
            />
            <el-table-column
                label="收件人姓名"
                prop="consignee"
            />
            <el-table-column
                label="收件人联系电话"
                prop="mobile"
            />
            <el-table-column
                label="物流单号"
                prop="trackingno"
            />
            <el-table-column
                label="订单状态"
            >
                <template slot-scope="scope">
                    {{ formatStatus(scope.row.orderstatus) }}
                </template>
            </el-table-column>
            <el-table-column
                label="详细地址"
                prop="address"
            />
        </el-table>
        <el-pagination
            :page-size="pagesize"
            :total="pages"
            :current-page.sync="pageno"
            background
            layout="prev, pager, next"/>
        <el-dialog 
            :visible.sync="showConfirm" 
            title="订单信息配置">
            <el-form>
                <el-form-item 
                    label="订单编号">
                    <div>{{ selectObj.orderid }}</div>
                </el-form-item>
                <el-form-item 
                    label="奖品类型">
                    <div>{{ selectObj.goodsname }}</div>
                </el-form-item>
                <el-form-item 
                    label="收件人">
                    <div>{{ selectObj.consignee }}</div>
                </el-form-item>
                <el-form-item 
                    label="联系方式">
                    <div>{{ selectObj.mobile }}</div>
                </el-form-item>
                <el-form-item 
                    label="详细地址">
                    <div>{{ selectObj.address }}</div>
                </el-form-item>
                <el-form-item 
                    label="物流状态"
                >
                    <el-select 
                        v-model="selectObj.orderstatus">
                        <el-option 
                            label="失败退款" 
                            value="-1"/>
                        <el-option 
                            label="待发货" 
                            value="1"/>
                        <el-option 
                            label="在途" 
                            value="2"/>
                        <el-option 
                            label="已签收" 
                            value="3"/>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="物流单号">
                    <el-input 
                        v-model="selectObj.trackingno"/>
            </el-form-item></el-form>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button
                    @click="showConfirm = false">
                    取 消
                </el-button>
                <el-button 
                    type="primary" 
                    @click="modifyIt">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getMaterialList, materialModify} from '@/api/main/good'

export default {
    data () {
        return {
            pagesize: 20,
            pageno: 1,
            pages: 0,
            goodsid: '',
            types: [],
            tableData: [],
            selectObj: {},
            showConfirm: false
        }
    },
    watch: {
        pageno () {
            this.getList()
        },
        goodsid () {
            this.getList()
        }
    },
    mounted () {
        window._this = this
        this.getList()
    },
    methods: {
        modify (item) {
            this.selectObj = JSON.parse(JSON.stringify(item))
            this.showConfirm = true
        },
        getList () {
            getMaterialList({
                goodsid: this.goodsid,
                pageno: this.pageno,
                pagesize: this.pagesize
            }).then(res => {
                this.tableData = res.data.material_list.map((item, index) => {
                    item.index = (Number(this.pageno) - 1) * Number(this.pagesize) + index + 1
                    return item
                })
                this.types = res.data.filter
                this.pages = Number(res.data.pages) * Number(res.data.pagesize)
                console.log(res)
            })
        },
        formatStatus (status) {
            if (status === '-1') {
                return '失败退款'
            } else if (status === '1') {
                return '代发货'
            } else if (status === '2') {
                return '在途'
            } else if (status === '3') {
                return '签收'
            }
            return `未知状态：${status}`
        },
        modifyIt () {
            materialModify({
                orderid: this.selectObj.orderid,
                trackingno: this.selectObj.trackingno,
                orderstatus: this.selectObj.orderstatus
            }).then(() => {
                this.success()
                this.showConfirm = false
                this.getList()
            })
        }
    }
}
</script>

<style lang="less" scoped>
.link {
    text-decoration: underline;
    color: #409EFF;
    &:hover {
        filter: brightness(1.2);
    }
}
.page {
    padding: 20px;
}
.el-button /deep/ .el-icon-back {
    transform: rotate(90deg);
}
.el-select {
    margin-bottom: 20px;
}
</style>
