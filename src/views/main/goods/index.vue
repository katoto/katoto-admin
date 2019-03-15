<template>
    <div class="page">
        <h2>商品配置后台</h2>
        <el-button 
            type="primary" 
            icon="el-icon-plus" 
            style="float: right" 
            size="mini"
            @click="create"/>
        <el-table
            :data="tableData.filter((item, index) => filterTableData(pageno, pagesize, index))"
            style="width: 100%">
            <el-table-column
                label="商品排序"
                prop="index"
                width="180"
                align="center"
            />
            <el-table-column
                label="商品名称"
                prop="name"
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
                label="商品简介"
                prop="profile"
                width="180"
            />
            <el-table-column
                label="商品价值"
                prop="value"
                width="180"
            />
            <el-table-column
                label="剩余数量"
                prop="amount"
                width="180"
            />
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary">
                            {{ scope.row.isUpLine ? '下线' : '上线' }}
                            <i :class="[scope.row.isUpLine ? 'el-icon-download' : 'el-icon-upload2']"/>
                        </el-button>
                        <el-button 
                            v-if="scope.$index !== 0" 
                            icon="el-icon-back"/>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :page-size="pagesize"
            :total="tableData.length"
            :current-page.sync="pageno"
            background
            layout="prev, pager, next"/>
        <el-dialog 
            :visible.sync="showConfirm" 
            :title="selectObj.name ? '修改奖品信息' : '新增奖品信息'">
            <el-form>
                <el-form-item 
                    label="类别"
                >
                    <el-select 
                        v-model="selectObj.type">
                        <el-option 
                            label="卡类" 
                            value="card"/>
                        <el-option 
                            label="实物类" 
                            value="object"/>
                    </el-select>
                </el-form-item>
                <el-tabs
                    type="border-card"
                    value="first">
                    <el-tab-pane 
                        label="英文" 
                        name="first">
                        <el-form-item 
                            label="商品名称">
                            <el-input 
                                v-model="selectObj.english_name" 
                                autocomplete="off"/>
                        </el-form-item>
                        <el-form-item 
                            label="商品简介">
                            <el-input 
                                v-model="selectObj.english_profile" 
                                autocomplete="off"/>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane 
                        label="印度语" 
                        name="second">
                        <el-form-item 
                            label="商品名称">
                            <el-input 
                                v-model="selectObj.india_name" 
                                autocomplete="off"/>
                        </el-form-item>
                        <el-form-item 
                            label="商品简介">
                            <el-input 
                                v-model="selectObj.india_profile" 
                                autocomplete="off"/>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
                <el-form-item 
                    label="商品价值">
                    <el-input 
                        v-model="selectObj.value" 
                        autocomplete="off"/>
                </el-form-item>
                <el-form-item 
                    label="图片">
                    <input 
                        ref="file" 
                        type="file" 
                        name="image">
                </el-form-item>
            </el-form>
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
            tableData: [{
                index: 1,
                name: '100 Amazon cards',
                profile: '$100 gift cards',
                value: '10000',
                amount: '50',
                isUpLine: false
            }, {
                index: 2,
                name: '300 Amazon cards',
                profile: '$300 gift cards',
                value: '30000',
                amount: '20',
                isUpLine: true
            }, {
                index: 3,
                name: '200 Amazon cards',
                profile: '$200 gift cards',
                value: '50000',
                amount: '30',
                isUpLine: true
            }],
            selectObj: {},
            showConfirm: false
        }
    },
    mounted () {
        window._this = this
    },
    methods: {
        getFile () {
            // post FormData with headers 'Content-Type': 'multipart/form-data'
            let param = new FormData()
            let file = this.$refs.file.files[0]
            param.append('img', file, file.name)
            return param
        },
        modify (item) {
            this.selectObj = item
            this.showConfirm = true
        },
        create () {
            this.selectObj = {
                type: 'card'
            }
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
