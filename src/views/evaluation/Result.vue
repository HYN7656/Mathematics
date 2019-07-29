<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="输入搜索">
              <a-input v-model="queryParam.id" placeholder="会员账号/昵称/测评名称"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="测评时间">
              <a-date-picker v-model="queryParam.updatedate" style="width: 100%" placeholder="请选择测评时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="goPage"
      showPagination="auto"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
      </span>
      <span slot="action" slot-scope="text, record, index">
        <template>
          <a title="查看" @click="handleLook(text, record, index)"><a-icon type="search" /></a>
        </template>
      </span>
    </s-table>
  </a-card>

</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import { getResultlistList } from '@/api/evaluation'
  import moment from 'moment'
  export default {
    name: 'Result',
    components: {
      STable,
      Ellipsis
    },
    data () {
      return {
        lookdis:false,
        form: this.$form.createForm(this),
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        option:[{id:1,value:"例1"},{id:2,value:"例2"},{id:3,value:"例3"}],
        // 表头
        columns: [
          {
            title: '账号',
            dataIndex: 'zh'
          },
          {
            title: '昵称',
            dataIndex: 'nc'
          },
          {
            title: '测评名称',
            dataIndex: 'cpmc'
          },
          {
            title: '用时',
            dataIndex: 'ys'
          },
          {
            title: '测评结果等级',
            dataIndex: 'cpjgdj'
          },
          {
            title: '测评时间',
            dataIndex: 'cpTime'
            // sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' }
          }
        ]
      }
    },
    methods: {
      moment,
      // 列表查询
      goPage (parameter) {
        return getResultlistList(Object.assign(parameter,this.queryParam)).then(res => {
          return res.result
        })
      },
      // 查看
      handleLook(text, record, index){
        this.$router.push({ name: 'ResultEdit' , query: { state: 'look', id : record.id } })
      },
    },
    mounted () {},
    created () {},
    // table状态的效果
    filters: {
      statusFilter (type) {
        return statusMap[type].text
      },
      statusTypeFilter (type) {
        return statusMap[type].status
      }
    }
  }
</script>
