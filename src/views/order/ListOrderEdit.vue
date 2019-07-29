<template>
    <a-card :bordered="false">
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: right"
      >
        <a-button type="primary">确认收款</a-button>
      </a-form-item>
      <a-divider style="margin-bottom: 32px"/>
      <detail-list title="基本信息">
        <detail-list-item term="订单编号">{{ details.ddbh }}</detail-list-item>
        <detail-list-item term="账号">{{ details.zh }}</detail-list-item>
        <detail-list-item term="昵称">{{ details.nc }}</detail-list-item>
        <detail-list-item term="订单状态">{{ details.ddzt }}</detail-list-item>
        <detail-list-item term="支付状态">{{ details.zfzt }}</detail-list-item>
        <detail-list-item term="订单总额">￥{{ details.ze }}</detail-list-item>
        <detail-list-item term="创建时间">{{ details.cjTime }}</detail-list-item>
        <detail-list-item term="支付时间">{{ details.zfTime }}</detail-list-item>
        <detail-list-item term="订单备注">{{ details.bz }}</detail-list-item>
      </detail-list>
      <a-divider style="margin-bottom: 32px"/>

      <div class="title">商品信息</div>
      <s-table
        style="margin-bottom: 24px"
        row-key="id"
        :columns="columns"
        :data="goPage"
        :showPagination="false">
        <span slot="action" slot-scope="text, record, index">
        <template>
          <a title="查看" @click="handleLook(text, record, index)"><a-icon type="search" /></a>
        </template>
      </span>
      </s-table>
      <a-divider style="margin-bottom: 32px"/>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <router-link :to="{ path: '/order/listOrder' }"><a-button type="primary">返回</a-button></router-link>
      </a-form-item>
    </a-card>
</template>

<script>
// import { PageView } from '@/layouts'
import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'
import { getListOrderDet, getListOrderDetL } from '@/api/order'
const DetailListItem = DetailList.Item

export default {
  name:'ListOrderEdit',
  components: {
    // PageView,
    DetailList,
    DetailListItem,
    STable
  },
  data () {
    return {
      id: '',
      details: {},
      // 表头
      columns: [
        {
          title: '名称',
          dataIndex: 'mc'
        },
        {
          title: '图片',
          dataIndex: 'img',
          customRender: text => < img alt = "轮播图片" style = "width: 50px;height: 50px" src = { text } />
        },
        {
          title: '单价',
          dataIndex: 'dj'
        },
        {
          title: '数量',
          dataIndex: 'sl'
        },
        {
          title: '总价',
          dataIndex: 'zj'
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
  mounted () {
    this.id = this.$route.query.id
    const params = {}
    params['id'] = this.id
    getListOrderDet(params).then(res => {
      console.log(res.result.data)
      this.details = res.result.data
    })
  },
  methods: {
    goPage (parameter) {
      return getListOrderDetL(Object.assign(parameter, this.queryParam)).then(res => {
        return res.result
      })
    }
  },
}
</script>