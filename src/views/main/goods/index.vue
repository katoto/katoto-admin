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
            border
            style="width: 100%">
            <el-table-column
                label="商品排序"
                prop="index"
                width="80"
                align="center"
            />
            <el-table-column
                label="商品名称"
                width="180"
            >
                <template slot-scope="scope">
                    <a 
                        href="javascript:;"
                        class="link"
                        @click="modify(scope.row)">{{ scope.row.goodsname.English || scope.row.goodsname.India || '' }}</a>
                </template>
            </el-table-column>
            <el-table-column
                label="商品简介"
                width="180"
            >
                <template slot-scope="scope">
                    {{ scope.row.goodsdesc.English || scope.row.goodsdesc.India || '' }}
                </template>
            </el-table-column>
            <el-table-column
                label="商品价值"
                prop="needgolds"
                width="180"
            />
            <el-table-column
                label="剩余数量"
                prop="remain"
                width="180"
            />
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <div>
                        <el-button type="primary">
                            {{ scope.row.isUpLine ? '下线' : '上线' }}
                            <i :class="[scope.row.isUpLine ? 'el-icon-download' : 'el-icon-upload2']"/>
                        </el-button>
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
                        v-model="selectObj.goodstype">
                        <el-option 
                            label="卡类" 
                            value="1"/>
                        <el-option 
                            label="实物类" 
                            value="2"/>
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
                                v-model="selectObj.goodsname.English" 
                                autocomplete="off"/>
                        </el-form-item>
                        <el-form-item 
                            label="商品简介">
                            <el-input 
                                v-model="selectObj.goodsdesc.English" 
                                autocomplete="off"/>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane 
                        label="印度语" 
                        name="second">
                        <el-form-item 
                            label="商品名称">
                            <el-input 
                                v-model="selectObj.goodsname['India-south']" 
                                autocomplete="off"/>
                        </el-form-item>
                        <el-form-item 
                            label="商品简介">
                            <el-input 
                                v-model="selectObj.goodsdesc['India-south']" 
                                autocomplete="off"/>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
                <el-form-item 
                    label="商品价值">
                    <el-input 
                        v-model="selectObj.needgolds" 
                        autocomplete="off"/>
                </el-form-item>
                <el-form-item 
                    label="图片URL">
                    <el-input 
                        v-model="selectObj.img_url" 
                        autocomplete="off"/>
                </el-form-item>
                <el-form-item 
                    label="权重">
                    <el-input 
                        v-model="selectObj.weight" 
                        autocomplete="off"/>
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
                    @click="confirm">
                    确 定
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {getGoodList, setGood} from '@/api/main/good'
export default {
    data () {
        return {
            pagesize: 20,
            pageno: 1,
            tableData: [],
            selectObj: {
                goodsname: {},
                goodsdesc: {}
            },
            showConfirm: false,
            active: ''
        }
    },
    mounted () {
        getGoodList().then(res => {
            this.tableData = res.data.goods_config_list.map((item, index) => {
                item.index = index + 1
                item.isUpLine = Number(item.status) === 1
                return item
            })
            this.tableData.sort((a, b) => Number(a.weight) > Number(b.weight) ? -1 : 1)
        })
    },
    methods: {
        // getFile () {
        // post FormData with headers 'Content-Type': 'multipart/form-data'
        //     let param = new FormData()
        //     let file = this.$refs.file.files[0]
        //     param.append('img', file, file.name)
        //     return param
        // },
        modify (item) {
            this.selectObj = item
            this.showConfirm = true
        },
        create () {
            this.selectObj = {
                goodsid: '',
                goodstype: '1',
                goodsname: {},
                goodsdesc: {}
            }
            this.showConfirm = true
        },
        confirm () {
            this.selectObj = {
                ...this.selectObj,
                contents: {
                    English: {
                        goodsname: this.selectObj.goodsname.English,
                        goodsdesc: this.selectObj.goodsdesc.English
                    },
                    "India-south": {
                        goodsname: this.selectObj.goodsname["India-south"],
                        goodsdesc: this.selectObj.goodsdesc["India-south"]
                    }
                }
            }
            setGood(this.selectObj).then(res => {
                if (res.status === '100') {
                    this.success('操作成功')
                    this.showConfirm = false
                } else {
                    this.error(res.message)
                }
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
</style>
