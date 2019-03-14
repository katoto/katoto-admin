<template>
    <div class="page">
        <h2>实物奖品派发</h2>
        <el-select 
            v-model="type"
            style="float: left">
            <el-option 
                label="All" 
                value="all"/>
            <el-option 
                v-for="item in types"
                :key="item"
                label="item" 
                value="item"/>
        </el-select>
        <el-table
            :data="tableData.filter((item, index) => filterTableData(pageno, pagesize, index))"
            style="width: 100%">
            <el-table-column
                label="领取时间"
                prop="time"
                width="180"
                align="center"
            />
            <el-table-column
                label="订单编号"
                prop="no"
                width="180"
            >
                <template slot-scope="scope">
                    <a 
                        href="javascript:;"
                        class="link"
                        @click="modify(scope.row)">{{ scope.row.name }}</a>
                </template>
            </el-table-column>
            <el-table-column
                label="商品种类"
                prop="type"
                width="180"
            />
            <el-table-column
                label="收件人姓名"
                prop="name"
                width="180"
            />
            <el-table-column
                label="收件人联系电话"
                prop="phone"
                width="180"
            />
            <el-table-column
                label="物流单号"
                prop="order"
                width="180"
            />
            <el-table-column
                label="订单状态"
                prop="status"
                width="180"
            />
            <el-table-column
                label="详细地址"
                prop="address"
                width="180"
            />
        </el-table>
        <el-pagination
            :page-size="pagesize"
            :total="tableData.length"
            :current-page.sync="pageno"
            background
            layout="prev, pager, next"/>
        <el-dialog 
            :visible.sync="showConfirm" 
            title="订单信息配置">
            <el-form>
                <el-form-item 
                    label="订单编号">
                    <div>{{ selectObj.order }}</div>
                </el-form-item>
                <el-form-item 
                    label="奖品类型">
                    <div>{{ selectObj.type }}</div>
                </el-form-item>
                <el-form-item 
                    label="收件人">
                    <div>{{ selectObj.user }}</div>
                </el-form-item>
                <el-form-item 
                    label="联系方式">
                    <div>{{ selectObj.phone }}</div>
                </el-form-item>
                <el-form-item 
                    label="详细地址">
                    <div>{{ selectObj.address }}</div>
                </el-form-item>
                <el-form-item 
                    label="物流状态"
                >
                    <el-select 
                        v-model="selectObj.status">
                        <el-option 
                            label="代发货" 
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
                        v-model="selectObj.order"/>
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
                    @click="showConfirm = false">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            pagesize: 20,
            pageno: 1,
            type: 'all',
            types: [],
            tableData: [{
                name: '疯狂猜球',
                no: '1000001',
                password: '111',
                type: '金条',
                user: 'siked',
                time: '2019.08.14',
                phone: '18824999254',
                order: '178943724230489',
                status: '待发货',
                address: '深圳市XXXX'
            }, {
                name: '疯狂猜球',
                no: '1000002',
                password: '222',
                type: '手机',
                user: 'fdasfr',
                time: '2019.08.04',
                phone: '18824999254',
                order: '178943724230489',
                status: '在途',
                address: '深圳市XXXX'
            }, {
                name: '疯狂猜球',
                no: '1000003',
                password: '333',
                type: '手机',
                user: 'qweqwrr',
                time: '2019.08.01',
                phone: '18824999254',
                order: '178943724230489',
                status: '已签收',
                address: '深圳市XXXX'
            }],
            selectObj: {},
            showConfirm: false
        }
    },
    mounted () {
        window._this = this
    },
    methods: {
        modify (item) {
            this.selectObj = item
            this.showConfirm = true
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
</style>
