<template>
    <div>
      <tab-menu
        :activeName="fillData.activeName"
        :tabArr="fillData.tabArr"
        @menuChange="TabChange"
      ></tab-menu>
      <!-- <el-radio-group
          v-model="active"
          fill="#409eff"
          text-color="#fff"ed
          @change="TabChange"
        >
          <el-radio-button v-for="(v, i) in tabs" :key="i" :title="i">{{
            v
          }}</el-radio-button>
        </el-radio-group> -->
      <el-card shadow="never">
        <div class="first-search">
          <el-row type="flex" justify="space-between">
            <el-col style="flex: 1">
              <el-input
                size="small"
                v-model="form.realName"
                placeholder="搜索名字"
                prefix-icon="el-icon-search"
                clearable
              ></el-input>
              <el-input
                size="small"
                v-model="form.idNumber"
                placeholder="搜索身份证号"
                prefix-icon="el-icon-search"
                clearable
              ></el-input>
              <BaseElSelect
                size="small"
                :selected.sync="form.insuredCity"
                placeholder="投保类型"
                :options="insuredCityList"
                :page.sync="pageNumber"
                :isLoaded="insuredCityIsLoaded"
                :optionskey="'partnerInsureTypeName'"
                :optionsLabel="'partnerInsureTypeName'"
                :optionsValue="'partnerInsureTypeName'"
                :request="getInsureCityList"
              />
              <el-date-picker
                :clearable="false"
                size="small"
                v-model="form.sendDay"
                type="daterange"
                align="center"
                range-separator=""
                start-placeholder="起始日期"
                end-placeholder="截至日期"
                value-format="yyyyMMdd"
                :default-time="['00:00:00', '23:59:59']"
                unlink-panels
                style="width: 243px"
                prefix-icon=""
              />
              <el-select
                size="small"
                v-model="form.status"
                :placeholder="pretext"
                clearable
              >
                <template v-if="active == 0">
                  <el-option label="投保中" :value="2"></el-option>
                  <el-option label="已驳回" :value="3"></el-option>
                  <el-option label="已投保" :value="4"></el-option>
                  <el-option label="二次投保中" :value="7"></el-option>
                  <el-option label="停保中" :value="5"></el-option>
                  <el-option label="已停保" :value="6"></el-option>
                  <el-option label="待审核" :value="8"></el-option>
                </template>
                <template v-if="active == 1">
                  <el-option label="投保申请中" :value="2"></el-option>
                  <el-option label="二次申请中" :value="7"></el-option>
                  <el-option label="已驳回" :value="3"></el-option>
                  <el-option label="已撤销" :value="1"></el-option>
                  <el-option label="已投保" :value="4"></el-option>
                  <el-option label="待审核" :value="8"></el-option>
                </template>
                <template v-if="active == 2">
                  <template>
                    <el-option label="停保申请中" :value="5"></el-option>
                    <el-option label="已驳回" :value="3"></el-option>
                    <el-option label="已撤销" :value="1"></el-option>
                    <el-option label="已停保" :value="4"></el-option>
                  </template>
                </template>
              </el-select>
            </el-col>
            <el-col style="width: 216px">
              <el-button
                @click="reset"
                style="width: 100px; color: #0072ff; border-color: #0072ff"
                >重置
              </el-button>
              <el-button
                style="width: 100px; color: #fff; background: #0072ff"
                type="primary"
                @click="query"
                >查询
              </el-button>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="second-search">
            <label>筛选条件 :</label>
            <el-row>
  
            </el-row>
          </div> -->
        <!-- <el-row style="padding: 0 0 10px 105px"> -->
        <!-- <el-button type="primary" @click="query">筛 选</el-button>
            <el-button type="primary" @click="reset">重 置</el-button> -->
        <!-- </el-row> -->
      </el-card>
      <el-card shadow="never">
        <el-row type="flex" justify="space-between" class="operate">
          <el-col>
            <el-button
              v-if="active == 0"
              type="danger"
              @click="showPersonnelReplacement = true"
              ><i class="iconfont icon-gengxin" /> 人员替换</el-button
            > 
            <el-button
              v-if="active == 0"
              type="success"
              @click="showPersonnelReplaceList = true"
              ><i class="iconfont" /> 人员替换记录</el-button
            >
            <el-button
              type="primary"
              v-if="active == 1"
              @click="showIncrement = true"
              ><i class="iconfont icon-tianjia" /> 投保派单
            </el-button>
            <el-button
              type="primary"
              v-if="active == 2"
              @click="showDecrement = true"
              ><i class="iconfont icon-tianjia" /> 停保派单
            </el-button>
          </el-col>
          <el-col style="text-align: right">
            <el-button
              type="success"
              v-if="active == 0"
              @click="showExcelExport = true"
              ><i class="iconfont icon-daochu" /> 商保状态导出
            </el-button>
            <el-button type="success" v-else @click="showExcelExport = true"
              ><i class="iconfont icon-daochu" /> 派单导出
            </el-button>
            <el-button type="success" @click="downloadListShow = true"
              ><i class="iconfont icon-daochu" /> 导出列表
            </el-button>
          </el-col>
        </el-row>
  
        <el-table
          v-el-table-scroll
          border
          row-key="detailId"
          tooltip-effect="light"
          :row-class-name="tableRowClassName"
          :tree-props="{ children: 'children' }"
          :data="list"
        >
          <el-table-column
            show-overflow-tooltip
            prop="sendDay"
            label="派单日期"
            min-width="130"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="realName"
            label="员工姓名"
            min-width="100"
          >
            <template slot-scope="{ row }">
              <span :class="row.children ? 'red-text' : ''">{{
                row.realName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="idNumber"
            label="身份证号码"
            min-width="180"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="industryName"
            label="行业"
            min-width="150"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="job"
            label="岗位"
            min-width="150"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="insureTypeName"
            label="投保类型"
            min-width="150"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="laborContractSubject"
            label="协议合同主体"
            min-width="150"
          ></el-table-column>
          <template v-if="active == 0">
            <el-table-column
              show-overflow-tooltip
              prop="statusName"
              label="员工状态"
              min-width="128"
            ></el-table-column>
          </template>
  
          <template v-else>
            <el-table-column
              show-overflow-tooltip
              min-width="128"
              label="派单状态"
              prop="statusName"
            >
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              min-width="128"
              label="驳回原因"
              :key="Math.random()"
            >
              <template slot-scope="{ row }">
                <template v-if="row.feedbackReason">
                  <el-popover
                    v-if="row.feedbackReason.length > 15"
                    placement="top"
                    trigger="click"
                  >
                    <span>{{ row.feedbackReason }}</span>
                    <span slot="reference" style="curosr: pointer">{{
                      row.feedbackReason.slice(0, 15) + '...'
                    }}</span>
                  </el-popover>
                  <div v-else>{{ row.feedbackReason }}</div>
                </template>
              </template>
            </el-table-column>
          </template>
  
          <el-table-column label="操作" fixed="right" width="140">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="look(row)"
                >详情</el-button
              >
              <!-- 派单列表 非撤销状态 非驳回 非处理 非失效状态 才显示撤销按钮 -->
              <template
                v-if="
                  active != 0 &&
                  row.status != 3 &&
                  row.status != 4 &&
                  row.status != 1 &&
                  row.status != 2 &&
                  row.status != 7 &&
                  row.status != 6 
                "
              >
                <el-button
                  class="text-red"
                  type="text"
                  size="small"
                  @click="restore(row)"
                  >撤销</el-button
                >
              </template>
            </template>
          </el-table-column>
        </el-table>
  
        <Pagination
          :total="total"
          :page.sync="page"
          @pagination="getList"
        ></Pagination>
  
        <el-dialog
          :title="dispatchTitle"
          :visible.sync="showExcelExport"
          width="600px"
        >
          <el-form :model="dispatchForm" v-if="!step">
            <el-form-item label="选择派单日期">
              <el-date-picker
                size="small"
                v-model="dispatchForm.sendDay"
                type="daterange"
                range-separator=""
                start-placeholder="起始日期"
                end-placeholder="截至日期"
                value-format="yyyyMMdd"
                unlink-panels
                style="width: 243px"
              />
            </el-form-item>
            <el-form-item label="选择员工状态">
              <el-select
                size="small"
                v-model="dispatchForm.status"
                placeholder="员工状态"
                @change="dispatchForm.exportStatus = null"
              >
                <template v-if="active == 0">
                  <el-option label="全部" :value="-1"></el-option>
                  <el-option label="投保中" :value="2"></el-option>
                  <el-option label="已驳回" :value="3"></el-option>
                  <el-option label="已投保" :value="4"></el-option>
                  <el-option label="二次投保中" :value="7"></el-option>
                  <el-option label="停保中" :value="5"></el-option>
                  <el-option label="已停保" :value="6"></el-option>
                  <el-option label="待审核" :value="8"></el-option>
                </template>
                <template v-if="active == 1">
                  <el-option label="全部" :value="-1"></el-option>
                  <el-option label="投保申请中" :value="2"></el-option>
                  <el-option label="二次申请中" :value="7"></el-option>
                  <el-option label="已驳回" :value="3"></el-option>
                  <el-option label="已撤销" :value="1"></el-option>
                  <el-option label="已投保" :value="4"></el-option>
                  <el-option label="待审核" :value="8"></el-option>
                </template>
                <template v-if="active == 2">
                  <el-option label="全部" :value="-1"></el-option>
                  <el-option label="停保申请中" :value="5"></el-option>
                  <el-option label="已驳回" :value="3"></el-option>
                  <el-option label="已撤销" :value="1"></el-option>
                  <el-option label="已停保" :value="4"></el-option>
                </template>
              </el-select>
            </el-form-item>
          </el-form>
          <el-row v-else class="notify"
            >生成中。请稍后，在导出列表中点击下载</el-row
          >
          <el-row slot="footer" style="text-align: center">
            <el-button
              type="primary"
              :loading="emit"
              @click="download"
              v-if="!step"
              ><i class="iconfont icon-daochu" /> 确认导出
            </el-button>
            <el-button type="primary" @click="init" v-else>确定</el-button>
          </el-row>
        </el-dialog>
  
        <Increment :show.sync="showIncrement" @update="getList"></Increment>
        <Decrement :show.sync="showDecrement" @update="getList"></Decrement>
        <ExportList
          :title="title"
          :show.sync="downloadListShow"
          level="dispatch"
          @update="getList"
        ></ExportList>
        <PersonDetail
          :show.sync="showPersonDetail"
          :projectId="projectId"
          :operateId="operateId"
          level="dispatch"
        ></PersonDetail>
        <DispatchDetail
          :show.sync="showDispatchDetail"
          :projectId="projectId"
          :status="status"
          :type="this.active"
          level="dispatch"
          @update="getList"
        ></DispatchDetail>
        <personnelReplacement
          :show.sync="showPersonnelReplacement"
          :getParentList="getList"
        ></personnelReplacement>
        <personnelReplaceList
          :show.sync="showPersonnelReplaceList">
        </personnelReplaceList>
      </el-card>
    </div>
  </template>
  
  <script>
  import BaseElSelect from '@/components/BaseElSelect'
  import tabMenu from '@/components/BaseTabMenu'
  import TemplateMgt from '../components/templateMgt.vue'
  import personnelReplacement from './components/personnelReplacement.vue'
  import personnelReplaceList from './components/personnelReplaceList.vue'
  export default {
    name: 'business-management',
    components: {
      BaseElSelect,
      tabMenu,
      personnelReplacement,
      personnelReplaceList,
      ExportList: () => import('../components/ExportList'),
      PersonDetail: () => import('./components/PersonDetail'),
      DispatchDetail: () => import('../components/DispatchDetail'),
      Increment: () => import('./Increment'),
      Decrement: () => import('./Decrement'),
      TemplateMgt
    },
    data() {
      return {
        active: 0,
        isLoading: false,
        fillData: {
          activeName: '0',
          tabArr: [
            {
              title: '参保人员信息',
              name: '0'
            },
            {
              title: '投保派单申请',
              name: '1'
            },
            {
              title: '停保派单申请',
              name: '2'
            }
          ]
        },
        tabs: ['参保人员信息', '投保派单申请', '停保派单申请'],
        form: {
          realName: null,
          idNumber: null,
          customerName: null,
          title: null,
          companyName: null,
          insuredCity: null,
          sendDay: null,
          status: null,
          type: null,
  
          startSendDay: null,
          endSendDay: null
        },
  
        list: [],
        page: 1,
        limit: 10,
        total: 0,
  
        providerIsLoaded: true,
        currentPage: 1,
        count: 0,
  
        insuredCityIsLoaded: true,
        insuredCityList: [],
        pageNumber: 1,
        pageCount: 0,
  
        showIncrement: false,
        showDecrement: false,
        downloadListShow: false,
        showPersonDetail: false,
        showDispatchDetail: false,
        projectId: null,
  
        status: null,
  
        showExcelExport: false,
        dispatchForm: {
          sendDay: null,
          status: -1,
          exportStatus: null,
          customerName: null
        },
        step: false,
        emit: false,
        companyList: [],
        companyIsLoaded: false,
        companyPage: 1,
        operateId: null,
        showPersonnelReplacement: false,
        showPersonnelReplaceList:false,
      }
    },
    computed: {
      title() {
        switch (this.active) {
          case 1:
            return '投保派单下载'
          case 2:
            return '停保派单下载'
          default:
            return '派单下载'
        }
      },
      pretext() {
        return this.active == 0 ? '员工状态' : '派单状态'
      },
      dispatchTitle() {
        switch (this.active) {
          case 1:
            return '投保派单导出'
          case 2:
            return '停保派单导出'
          default:
            return '商保状态导出'
        }
      },
      selectedStatus() {
        return (
          this.dispatchForm.status == 2 ||
          this.dispatchForm.status == 5 ||
          this.dispatchForm.status == 7
        )
      }
    },
    created() {
      this.getList()
      this.getInsureCityList()
    },
    methods: {
      ownerChange() {
        this.$fetch.api_business_insurance.ownerChangeDown().then((res) => {
          this.$download(res)
        })
      },
      //表格斑马纹
      tableRowClassName({ row, rowIndex }) {
        if (row.discard == 1) {
          return 'warning-row'
        } else if (rowIndex % 2 == 1) {
          return 'row-odd'
        }
        // if (rowIndex % 2 == 1) {
        //   return 'row-odd'
        // }
        return ''
      },
      TabChange(num) {
        this.active = parseInt(num)
        this.form = this.$options.data().form
        this.initData()
      },
      //远程搜索 + 滚动加载 参保地列表
      getInsureCityList({ isConcat = false, keyword = null } = {}) {
        let params = {
          name: keyword,
          page: this.pageNumber,
          pageSize: this.limit
        }
        this.$fetch.api_business_insurance
          .getInsurePlaceList(params)
          .then((res) => {
            if (res.success) {
              if (isConcat) {
                this.insuredCityList = [...this.insuredCityList, ...res.data]
              } else {
                this.insuredCityList = res.data
              }
              this.pageCount = res.total
              this.insuredCityIsLoaded = this.insuredCityList.length >= res.total
            }
          })
      },
      initData(params) {
        // this.list = [];
        this.page = 1
        // this.total = 0;
        this.getList(params)
      },
      //type 1 名字、身份证查询   2 其他条件查询
      //pageType 1 参保人员信息  2 增员派单申请  3 减员派单申请
      getList(searchData = this.form) {
        this.isLoading = true
        this.form.startSendDay = this.form.sendDay ? this.form.sendDay[0] : null
        this.form.endSendDay = this.form.sendDay ? this.form.sendDay[1] : null
        let params = {
          realName: this.form.realName,
          idNumber: this.form.idNumber,
          customerName: this.form.customerName,
          title: this.form.title,
          insuredCity: this.form.insuredCity, //参保地
          companyName: this.active != 1 ? this.form.companyName : null, //参保供应商
          startSendDay: this.form.startSendDay,
          endSendDay: this.form.endSendDay,
          status: this.form.status, //员工、派单状态
          // type: this.form.type, //派单类型
          page: this.page,
          pageSize: this.limit,
          pageType: this.active + 1
        }
        // params.sendDay && delete params.sendDay;
        this.$fetch.api_business_insurance.getShowList(params).then((res) => {
          if (res.success) {
            this.total = res.total
            this.list = res.data || res.dataList
            this.isLoading = false
          }
        })
      },
      query() {
        // this.form.type = 2;
        this.form.startSendDay = this.form.sendDay ? this.form.sendDay[0] : null
        this.form.endSendDay = this.form.sendDay ? this.form.sendDay[1] : null
        let params = {
          realName: this.form.realName,
          idNumber: this.form.idNumber,
          customerName: this.form.customerName,
          title: this.form.title,
          insuredCity: this.form.insuredCity, //参保地
          companyName: this.active != 1 ? this.form.companyName : null, //参保供应商
          startSendDay: this.form.startSendDay,
          endSendDay: this.form.endSendDay,
          status: this.form.status //员工、派单状态
          // type: this.form.type, //派单类型
        }
        this.initData(params)
      },
      reset() {
        this.form.realName = null
        this.form.idNumber = null
        this.form.customerName = null
        this.form.title = null
        this.form.insuredCity = null
        this.form.companyName = null
        this.form.sendDay = null
        this.form.status = null
        this.initData()
      },
      look(row) {
        this.projectId = row.id
        this.operateId = row.detailId
        if (this.active == 0) {
          this.showPersonDetail = true
        } else {
          this.status = row.status
          this.showDispatchDetail = true
        }
      },
      restore(row) {
        let params = {
          id: row.id,
          type: this.active
        }
        this.$fetch.api_business_insurance.restoreDispatch(params).then((res) => {
          if (res.success) {
            this.getList()
          }
        })
      },
      download() {
        if (!this.dispatchForm.status)
          return this.$message.warning('请选择员工状态')
        if (this.emit) return
        this.emit = true
        let params = {
          startSendDay: this.dispatchForm.sendDay
            ? this.dispatchForm.sendDay[0]
            : null,
          endSendDay: this.dispatchForm.sendDay
            ? this.dispatchForm.sendDay[1]
            : null,
          status: this.dispatchForm.status,
          customerName: this.dispatchForm.customerName,
          pageType: this.active + 1
        }
        this.$fetch.api_business_insurance
          .exportExcel(params)
          .then((res) => {
            if (res.success) {
              this.dispatchForm = this.$options.data().dispatchForm
              this.step = true
            }
          })
          .finally(() => (this.emit = false))
      },
      init() {
        this.initData()
        this.showExcelExport = false
        this.dispatchForm = this.$options.data().dispatchForm
        this.step = false
      },
    }
  }
  </script>
  
  <style scoped lang="scss">
  ::v-deep .el-card__body:first-child {
    padding-bottom: 4px;
  }
  //隐藏日期选择器前后icon
  ::v-deep .el-date-editor > .el-input__icon {
    display: none;
  }
  
  //日期选择器range-separator设置为""后 设置中间间隔样式
  ::v-deep .el-date-editor .el-range-separator {
    display: inline-block;
    height: 2px;
    width: 29px;
    // margin: 0 37px;
    background: #dcdfe5;
  }
  
  .el-card {
    min-width: 1000px;
  }
  ::v-deep .warning-row {
    background: #f56c6c !important;
  }
  //表格斑马纹颜色
  ::v-deep .el-table .row-odd {
    background: #f4f9ff !important;
  }
  
  .search {
    border: 1px solid #ccc;
    margin: 10px 0;
  }
  
  .first-search {
    .el-col {
      & > :not(.el-button) {
        width: 200px;
        margin: 0 16px 16px 0;
      }
  
      .el-button {
        margin-bottom: 16px;
      }
    }
  }
  
  // .first-search {
  //   margin: 10px 0 20px;
  //   label {
  //     margin: 0 20px;
  //   }
  //   .el-input {
  //     width: 190px;
  //     margin-right: 10px;
  //   }
  //   display: flex;
  //   align-items: center;
  // }
  // .second-search {
  //   display: flex;
  //   label {
  //     flex-shrink: 0;
  //     margin: 0 20px;
  //     line-height: 40px;
  //   }
  //   .el-row {
  //     display: flex;
  //     flex-wrap: wrap;
  //     align-items: center;
  //     & > :not(.el-button) {
  //       width: 190px;
  //       margin: 0 10px 10px 0;
  //     }
  //     .el-button {
  //       margin-bottom: 10px;
  //     }
  //   }
  // }
  .operate {
    margin-bottom: 24px;
  }
  
  ::v-deep .el-dialog__body {
    padding-bottom: 20px;
  
    .el-form-item:last-child {
      margin-bottom: 0;
    }
  }
  
  .notify {
    text-align: center;
  }
  .red-text {
    color: red;
  }
  </style>
  