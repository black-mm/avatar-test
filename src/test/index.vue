<template>
    <el-dialog
      title="人员替换"
      :visible.sync="currentShow"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      destroy-on-close
    >
      <el-row align="middle">
        <!-- <el-button type="success" @click="serviceModel"
              ><i class="iconfont icon-xiazai" /> 供应商分配模版下载</el-button
            > -->
        <div class="flex">
          <upload-file
            :isBtnSlot="true"
            :accept="'.xlsx, .xls'"
            ref="excelUpload"
            @upload="upload"
            style="margin: 0 0 10px 10px; display: inline-block"
          >
            <template #btn>
              <el-button type="success"
                ><i class="iconfont icon-shangchuan" /> 点击上传</el-button
              >
            </template>
          </upload-file>
          <!-- <el-upload
                action="#"
                accept=".xlsx, .xls"
                :show-file-list="false"
                :headers="{ 'Content-Type': 'multipart/form-data' }"
                :http-request="uploadCustomer"
              >
              <el-button type="success" slot="trigger"
                ><i class="iconfont icon-shangchuan" /> 点击上传</el-button>
            </el-upload> -->
          <el-button
            style="margin-left: 10px"
            class="button"
            @click="customerChange"
            type="success"
            ><i class="iconfont icon-xiazai" /> 模版下载</el-button
          >
        </div>
        <div class="flex">
          <label>人员信息更换 :</label>
        </div>
      </el-row>
      <vxe-table
        :data="list"
        show-overflow
        resizable
        stripe
        border="none"
        :row-config="{ isHover: true }"
      >
        <vxe-column width="78" title="原姓名" field="oldRealName"></vxe-column>
        <vxe-column
          width="180"
          title="原身份证号码"
          field="oldIdNumber"
        ></vxe-column>
  
        <!-- <vxe-column
          width="160"
          title="投保类型"
          field="insureTypeName"
        ></vxe-column>
        <vxe-column width="100" title="保险公司" field="companyName"></vxe-column>
        <vxe-column
          width="100"
          title="客户公司"
          field="customerName"
        ></vxe-column> -->
  
        <vxe-column title="替换后员工姓名" field="newRealName"></vxe-column>
        <vxe-column title="替换员工身份证号码" field="newIdNumber"></vxe-column>
        <vxe-column title="是否上传" field="status">
          <template slot-scope="{ row }">
            {{ row.status | statusName }}
          </template>
        </vxe-column>
        <vxe-column title="异常原因" field="description"></vxe-column>
      </vxe-table>
      <Pagination
        :total="total"
        :page.sync="page"
        @pagination="getList"
      ></Pagination>
      <div slot="footer" style="text-align: center">
        <el-button type="success" :disabled="!excelId" @click="confirm"
          ><i class="iconfont icon-shangchuan" />
          确认上传并下载异常记录</el-button
        >
        <el-button @click="cancel">取消上传</el-button>
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
    methods: {
      //变更模版下载
      customerChange() {
        this.$fetch.api_business_insurance
          .PersonnelReplacementDown()
          .then((res) => {
            this.$download(res)
          })
      },
      //表格斑马纹
      tableRowClassName({ row, rowIndex }) {
        if (rowIndex % 2 == 1) {
          return 'row-odd'
        }
      },
      upload(data) {
        let fd = new FormData()
        fd.append('file', data.file)
        this.$fetch.api_business_insurance
          .upPersonnelReplacement(fd)
          .then((res) => {
            if (res.success) {
              this.excelId = res.excelId
              this.getList()
            }
          })
      },
  
      getList() {
        let params = {
          excelId: this.excelId,
          page: this.page,
          pageSize: this.limit
        }
        this.$fetch.api_business_insurance
          .getPersonnelReplacementList(params)
          .then((res) => {
            if (res.success) {
              this.list = res.data
              this.total = res.total
            }
          })
      },
      confirm() {
        if (this.isFetching) return
        this.isFetching = true
        let params = {
          excelId: this.excelId
        }
        Promise.all([
          this.$fetch.api_business_insurance.confirmPersonnelReplacement(params),
          this.$fetch.api_business_insurance.errorPersonnelReplacement(params)
        ])
          .then((res) => {
            if (res[0].success) {
              this.$message.success('上传成功')
              this.$emit('update')
            }
            this.$download(res[1])
          })
          .catch((err) => this.$message.warning(err.message))
          .finally(() => {
            this.isFetching = false
            this.cancel()
          })
      },
      cancel() {
        this.currentShow = false
        this.$refs.excelUpload.reset()
        this.list = []
        this.page = 1
        this.total = 0
        this.excelId = null
      }
    },
    filters: {
      statusName(val) {
        if (val == 1) {
          return '可上传'
        } else {
          return '不可上传'
        }
      }
    }
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
  