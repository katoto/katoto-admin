<template>
  <div class="app-container">
    <p>这里是language</p>
    <input 
      ref="upload" 
      type="file" >
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  data() {
    return {
      langArr: []
    }
  },
  mounted(){
    this.$refs.upload.addEventListener('change', e => {
      this.readExcel(e)
    })
    this.$message({
      message: 'cancel!',
      type: 'warning'
    })    
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    readExcel(e){
      // 表格导入
        let that = this;
        const files = e.target.files;
        if(files.length<=0){//如果没有文件名
          this.$message({
            message: 'error 请选择一个文件!',
            type: 'warning'
          })
          return false;
        }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
          this.$message({
            message: '上传格式不正确，请上传xls或者xlsx格式',
            type: 'error'
          })
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
              this.langArr = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);//生成json表格内容
              console.log(this.langArr);
              console.log(this.langArr);
              // this.$refs.upload.value = '';
          } catch (e) {
              return false;
          }
        };
        fileReader.readAsBinaryString(files[0]);
    }
  },
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

