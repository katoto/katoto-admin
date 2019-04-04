<template>
  <div
    class="app"
    :class="{ready: ready}"
  >
    <table ref="table">
      <tr>
        <th
          v-for="(value, name) in table[0]"
          :key="name"
          contenteditable="true"
        >
          {{ name }}
        </th>
      </tr>
      <tr
        v-for="(item, index) in table"
        :key="index"
      >
        <td
          v-for="(value, name, itemIndex) in item"
          :key="`${name}${value}${itemIndex}`"
          contenteditable="true"
        >
          {{ value }}
        </td>
      </tr>
    </table>
    <div class="btn-box">
      <input
        type="button"
        value="下载"
        @click="download"
      >
      <input
        type="button"
        value="上传"
        @click="upload"
      >
      <input
        type="button"
        value="多一行"
        @click="add"
      >
      <input
        type="button"
        value="多一列"
        @click="addCol"
      >
    </div>
    <input
      ref="file"
      type="file"
      style="display: none;"
    >
  </div>
</template>

<script>
import XLSX from "xlsx"
export default {
    data () {
        return {
            table: [{
                head1: "-",
                head2: "-",
                head3: "-",
                head4: "-",
                head5: "-"
            }, {
                head1: "-",
                head2: "-",
                head3: "-",
                head4: "-",
                head5: "-"
            }],
            col: 5,
            ready: false
        }
    },
    computed: {
        head () {
            return this.table[0]
        }
    },
    mounted () {
        this.$refs.file.addEventListener("change", this.change)
        this.$nextTick(() => {
            this.ready = true
        })
    },
    destroy () {
        this.$refs.file.removeEventListener("change", this.change)
    },
    methods: {
        addCol () {
            this.col++
            this.table.forEach(row => {
                row[`head${this.col}`] = "-"
            })
            this.table = [...this.table]
        },
        add () {
            let tmp = JSON.parse(JSON.stringify(this.table[0]))
            for (let name in tmp) {
                tmp[name] = "-"
            }
            this.table.push(tmp)
        },
        formatValue () {
            var arr = []
            this.$refs.table.querySelectorAll("tr").forEach(tr => {
                let trArr = []
                tr.querySelectorAll("th, td").forEach(item => trArr.push(item.innerText))
                arr.push(trArr)
            })
            return arr
        },
        download () {
            const ws = XLSX.utils.aoa_to_sheet(this.formatValue(this.table))
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "demo")
            XLSX.writeFile(wb, "download.xls")
        },
        upload () {
            this.$refs.file.click()
        },
        change () {
            const files = this.$refs.file.files
            if (files.length <= 0) {
                alert("请选择一个文件!")
                return false
            } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                alert("上传格式不正确，请上传xls或者xlsx格式!")
                return false
            }
            const fileReader = new FileReader()
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result
                    const workbook = XLSX.read(data, {
                        type: "binary"
                    })
                    const wsname = workbook.SheetNames[0]// 取第一张表
                    let result = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容
                    let oneData = result[0]
                    this.col = Object.keys(oneData).length
                    if (/[-#%$+]/.test(Object.keys(oneData)[0])) {
                        alert("文档应该加密了, 需要先解锁文档!")
                    } else {
                        this.table = result
                    }
                    document.getElementById("file").value = ""
                } catch (e) {
                    return false
                }
            }
            fileReader.readAsBinaryString(files[0])
        }
    }
}
</script>

<style lang="less" scoped>
        .app {
            margin: 20px;
            display: none;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            border-collapse: collapse;
        }
        .app.ready {
            display: block;
        }
        th {
            background-color: #d9edf7;
        }
        tr {
            display: flex;
        }
        th,td {
            flex: 1;
            flex-shrink: 1;
            flex-grow: 1;
        }
        table, td, th {
            border: solid 1px #DDD;
        }
        th, td, tr {
            padding: 0;
            line-height: 35px;
            font-weight: lighter;
            text-align: center;
        }
        .btn-box {
            text-align: center;
        }
        input {
            margin: 0 20px;
            color: #fff;
            background-color: #337ab7;
            border: 0;
            outline: none;
            padding: 8px 10px;
            cursor: pointer;
        }
</style>

