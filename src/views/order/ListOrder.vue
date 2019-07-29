<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="输入搜索">
              <a-input v-model="queryParam.id" placeholder="标题"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="订单状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="支付状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="创建时间">
                <a-date-picker v-model="queryParam.Startdate" style="width: 100%" placeholder="请选择开始时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="支付时间">
                <a-date-picker v-model="queryParam.Enddate" style="width: 100%" placeholder="请选择结束时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
              </a-form-item>
            </a-col>

          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
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
    >

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
  import { getListOrderList } from '@/api/order'
  import moment from 'moment'

  export default {
    name: 'ListOrder',
    components: {
      STable,
      Ellipsis
    },
    data() {
      return {
        option: [{ id: 1, value: "例1" }, { id: 2, value: "例2" }, { id: 3, value: "例3" }],
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '订单编号',
            dataIndex: 'ddbh'
          },
          {
            title: '商品',
            dataIndex: 'img',
            customRender: text => < img alt = "轮播图片" style = "width: 50px;height: 50px" src = { text } />
      },
        {
          title: '会员账号',
          dataIndex: 'zh'
        },
        {
          title: '会员昵称',
          dataIndex: 'nc'
        },
        {
          title: '订单状态',
          dataIndex: 'ddzt'
        },
        {
          title: '支付状态',
          dataIndex: 'zfzt'
        },
        {
          title: '订单总额',
          dataIndex: 'ze'
        },
        {
          title: '创建时间',
          dataIndex: 'cjTime'
          // sorter: true
        },
        {
          title: '支付时间',
          dataIndex: 'zfTime'
          // sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
    ],
    }
    },
    methods: {
      moment,
      goPage(parameter) {
        return getListOrderList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      // 搜索展开关闭
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      // 查看
      handleLook(text, record, index) {
        this.$router.push({ name: 'ListOrderEdit', query: { state: 'edit', id: record.id } })
        console.log(text)
        console.log(record)// 某条数据内容
        console.log(index)// 序号
        // this.$refs.modal.edit(record)
      },
    },
    mounted() {
    },
    created() {
    },
  }
</script>
