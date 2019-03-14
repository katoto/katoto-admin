<template>
    <div class="page">
        <h2>虚拟奖品派发</h2>
        <el-button 
            type="primary" 
            icon="el-icon-plus" 
            style="float: right" 
            size="mini"
            @click="create"/>
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
                label="编号"
                prop="index"
                width="180"
                align="center"
            />
            <el-table-column
                label="卡号"
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
                label="密码"
                prop="password"
                width="180"
            />
            <el-table-column
                label="类型"
                prop="type"
                width="180"
            />
            <el-table-column
                label="领取用户"
                prop="user"
                width="180"
            />
            <el-table-column
                label="领取时间"
                prop="time"
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
            :title="selectObj.name ? '修改虚拟奖品' : '新增虚拟奖品'">
            <el-form>
                <el-form-item 
                    label="类型"
                >
                    <el-select 
                        v-model="selectObj.type">
                        <el-option 
                            label="100 Amazon" 
                            value="100"/>
                        <el-option 
                            label="200 Amazon" 
                            value="200"/>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="卡号">
                    <el-input 
                        v-model="selectObj.no" 
                        autocomplete="off"/>
                </el-form-item>
                <el-form-item 
                    label="卡密">
                    <el-input 
                        v-model="selectObj.password" 
                        autocomplete="off"/>
                </el-form-item>
                <el-form-item>
                    <el-button 
                        type="primary" 
                        @click="$refs.file.click()">批量导入</el-button>
                    <input 
                        ref="file" 
                        type="file" 
                        name="image"
                        style="display: none">
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
            type: 'all',
            types: [],
            tableData: [{
                index: 1,
                name: '100 Amazon cards',
                no: '123456789101',
                password: '111',
                type: '100 Amazon cards',
                user: 'siked',
                time: '2019.08.14'
            }, {
                index: 2,
                name: '300 Amazon cards',
                no: '123456789102',
                password: '222',
                type: '200 Amazon cards',
                user: 'fdasfr',
                time: '2019.08.04'
            }, {
                index: 3,
                name: '200 Amazon cards',
                no: '123456789103',
                password: '333',
                type: '300 Amazon cards',
                user: 'qweqwrr',
                time: '2019.08.01'
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
                type: '100'
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
