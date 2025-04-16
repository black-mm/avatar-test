<template>
    <el-dialog title="人员替换记录" :visible.sync="currentShow" :show-close="false" :close-on-click-modal="false"
        :close-on-press-escape="false" destroy-on-close>
        <vxe-table :data="list" show-overflow resizable stripe border="none" :row-config="{ isHover: true }">
            <vxe-column width="78" title="原姓名" field="oldRealName"></vxe-column>
            <vxe-column width="180" title="原身份证号码" field="oldIdNumber"></vxe-column>
            <vxe-column title="替换后员工姓名" field="newRealName"></vxe-column>
            <vxe-column width="180"  title="替换员工身份证号码" field="newIdNumber"></vxe-column>
            <vxe-column title="状态" field="stateName"></vxe-column>
            <vxe-column  width="200" title="上传时间" field="createTimeStr"></vxe-column>
        </vxe-table>
        <Pagination :total="total" :page.sync="page" @pagination="getList"></Pagination>
        <div slot="footer" style="text-align: center">
            <el-button @click="cancel">关闭</el-button>
        </div>
    </el-dialog>
  </template>
  
  <script>
  export default {
    data() {
        return {
            list: [],
            limit: 10,
            page: 1,
            total: 0,
            excelId: null
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        getParentList: {
            type: Function
        }
    },
    computed: {
        currentShow: {
            get() {
                return this.show
            },
            set(val) {
                this.$emit('update:show', val)
            }
        }
    },
    watch: {
        currentShow(val) {
            if (val) {
                this.getList()
            }
        }
    },
    methods: {
        //表格斑马纹
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex % 2 == 1) {
                return 'row-odd'
            }
        },
        getList() {
            let params = {
                page: this.page,
                pageSize: this.limit
            }
            this.$fetch.api_business_insurance
                .personnelReplaceList(params)
                .then((res) => {
                    if (res.success) {
                        this.list = res.data
                        this.total = res.total
                    }
                })
        },
        cancel() {
            this.currentShow = false
            this.list = []
            this.page = 1
            this.total = 0
        }
    },
  }
  </script>
  
  <style lang="scss" scoped>
  .button {
    height: 40px;
  }
  
  ::v-deep .el-dialog__body {
    padding: 20px;
  }
  
  .el-row {
    margin-bottom: 15px;
  
    label {
        font-size: 16px;
        margin-right: 10px;
    }
  }
  </style>