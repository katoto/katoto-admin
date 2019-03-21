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
                label="编号"
                prop="index"
                width="80"
                align="center"
            />
            <el-table-column
                label="卡号"
                prop="cardno"
                width="180"
            >
                <template slot-scope="scope">
                    <a 
                        href="javascript:;"
                        class="link"
                        @click="modify(scope.row)">{{ scope.row.cardno }}</a>
                </template>
            </el-table-column>
            <el-table-column
                label="密码"
                prop="password"
                width="180"
            />
            <el-table-column
                label="类型"
                width="180"
            >
                <template slot-scope="scope">
                    {{ getName(scope.row.goodsid) }}
                </template>
            </el-table-column>
            <el-table-column
                label="领取用户"
                width="180"
            >
                <template slot-scope="scope">
                    {{ formatStatus(scope.row) }}
                </template>
            </el-table-column>
            <el-table-column
                label="领取时间"
                prop="uptime"
            />
        </el-table>
        <el-pagination
            :page-size="pagesize"
            :total="pages"
            :current-page.sync="pageno"
            background
            layout="prev, pager, next"/>
        <el-dialog 
            :visible.sync="showModify" 
            title="奖品信息修改">
            <el-form>
                <el-form-item 
                    label="编号">
                    {{ selectObj.goodsid }}
                </el-form-item>
                <el-form-item 
                    label="状态">
                    {{ formatStatus(selectObj) }}
                </el-form-item>
                <el-form-item 
                    label="卡号">
                    <el-input 
                        v-model="selectObj.cardno" 
                        autocomplete="off"/>
                </el-form-item>
                <el-form-item 
                    label="卡密">
                    <el-input 
                        v-model="selectObj.password" 
                        autocomplete="off"/>
                </el-form-item>
            </el-form>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button 
                    type="primary" 
                    @click="modifyIt">
                    保存
                </el-button>
                <el-button 
                    type="danger" 
                    @click.native="deleteIt">
                    删除
                </el-button>
            </div>
        </el-dialog>
        <el-dialog 
            :visible.sync="showCreate" 
            title="录入虚拟卡">
            <el-form>
                <el-form-item 
                    label="类型"
                >
                    <el-select 
                        v-model="selectObj.goodsid"
                        placeholder="请选择卡类型">
                        <el-option 
                            v-for="item in types"
                            :key="item.goodsname"
                            :label="item.goodsname" 
                            :value="item.goodsid"/>
                    </el-select>
                </el-form-item>
                <el-form-item 
                    label="卡号">
                    <el-input 
                        v-model="selectObj.cardno" 
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
                </el-form-item>
            </el-form>
            <div 
                slot="footer" 
                class="dialog-footer">
                <el-button
                    @click="showCreate = false">
                    取 消
                </el-button>
                <el-button 
                    type="primary" 
                    @click="createIt">
                    确 定
                </el-button>
            </div>
        </el-dialog>
        <input 
            ref="file" 
            type="file" 
            name="image"
            style="display: none">
    </div>
</template>

<script>
import {virtualGoodList, virtualGoodImport, deleteVirtualGood, virtualGoodModify} from '@/api/main/good'
import XLSX from 'xlsx'
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
            showCreate: false,
            showModify: false
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
        this.$refs.file.addEventListener('change', this.readExcel)
    },
    destroyed () {
        this.$refs.file.removeEventListener('change', this.readExcel)
    },
    methods: {
        getList () {
            return virtualGoodList({
                goodsid: this.goodsid,
                pageno: this.pageno,
                pagesize: this.pagesize
            }).then(res => {
                this.types = res.data.filter
                this.tableData = res.data.immaterial_list.map((item, index) => {
                    item.index = (Number(this.pageno) - 1) * Number(this.pagesize) + index + 1
                    return item
                })
                this.pages = Number(res.data.pages) * Number(res.data.pagesize)
            })
        },
        formatStatus (item) {
            if (item.status === '0') {
                return '未领取'
            } else if (item.status === '1') {
                return item.uid
            } else if (item.status === '3') {
                return '已删除'
            }
            return `未知状态：${item.status}`
        },
        getName (goodsid) {
            let item = this.types.filter(item => item.goodsid === goodsid)[0]
            return (item && item.goodsname) || ''
        },
        getFile () {
            // post FormData with headers 'Content-Type': 'multipart/form-data'
            let param = new FormData()
            let file = this.$refs.file.files[0]
            param.append('img', file, file.name)
            return param
        },
        modify (item) {
            this.selectObj = JSON.parse(JSON.stringify(item))
            this.showModify = true
        },
        modifyIt () {
            virtualGoodModify({
                cardid: this.selectObj.cardid,
                password: this.selectObj.password,
                cardno: this.selectObj.cardno
            }).then(() => {
                this.getList()
                this.success()
                this.showModify = false
            })
        },
        deleteIt () {
            this.$confirm('确定删除该虚拟卡吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    deleteVirtualGood({
                        cardid: this.selectObj.cardid
                    }).then(() => {
                        this.getList()
                        this.success()
                        this.showModify = false
                    })
                    
                })
        },
        createIt () {
            virtualGoodImport({
                immaterial_list: [{
                    cardno: this.selectObj.cardno,
                    password: this.selectObj.password,
                    goodsid: this.selectObj.goodsid
                }]
            }).then(() => {
                this.getList()
                this.success()
                this.showCreate = false
            })
        },
        importIt (data) {
            virtualGoodImport({
                immaterial_list: data
            }).then(() => {
                this.getList()
                this.success()
                this.showCreate = false
            })
        },
        create () {
            this.selectObj = {
            }
            this.showCreate = true
        },
        readExcel(e){
            const files = e.target.files;
            if (files.length <= 0){
                this.error('请选择一个文件!')
                return false;
            } else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
                this.error('上传格式不正确，请上传xls或者xlsx格式!')
                return false;
            }
            const fileReader = new FileReader();
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    const wsname = workbook.SheetNames[0];//取第一张表
                    let result = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
                    let oneData = result[0]
                    if (result.length === 0 || result.length === 1) {
                        this.error('没有数据，第一行表头填写goodsid、cardno、password')
                    } if (oneData[0] && oneData[0].__EMPTY){
                        this.error('文档应该加密了,请重新选择!')
                    } else {
                        if (oneData.goodsid && oneData.cardno && oneData.password) {
                            this.importIt(result)
                        } else {
                            this.error('格式错误，第一行表头填写goodsid、cardno、password')
                        }
                    }
                    this.$refs.file.value = ''
                } catch (e) {
                    return false;
                }
            };
            fileReader.readAsBinaryString(files[0]);
        }
    },
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
