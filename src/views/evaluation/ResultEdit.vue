<template>
  <div>
    <a-form-item
      :wrapperCol="{ span: 24 }"
      style="text-align: right"
    >
      <a-button type="primary" style="margin-right: 25px" @click="openMol">测评报告</a-button>
      <a-button type="primary">返回</a-button>
      <a-modal
        title="测评报告"
        v-model="visible"
        :footer="null"
        class="cp-model"
      >
        <a-card :bordered="false" class="card" title="测评结果等级评定">
          123123
        </a-card>
        <a-card :bordered="false" class="card" title="数学素养">
          123123
        </a-card>
        <a-card :bordered="false" class="card" title="思维方法">
          123123
        </a-card>
        <a-card :bordered="false" class="card" title="知识板块">
          123123
        </a-card>
        <a-card :bordered="false" class="card" title="细分知识点">
          1231231
        </a-card>
        <a-card :bordered="false" class="card" title="综合评价">
          1231233
        </a-card>
      </a-modal>
    </a-form-item>
    <a-card :bordered="false" class="card" title="测评得分">
      <!--<a-divider style="margin-bottom: 32px"/>-->
      <detail-list>
        <detail-list-item term="测评结果等级">{{details.dj}}</detail-list-item>
        <detail-list-item term="用时">{{ details.ys }}</detail-list-item>
        <detail-list-item term="正确率">{{ details.zql }}</detail-list-item>
        <detail-list-item term="账号">{{ details.zh }}</detail-list-item>
        <detail-list-item term="昵称">{{ details.nc }}</detail-list-item>
        <detail-list-item term="测评名称">{{ details.cpmc }}</detail-list-item>
        <detail-list-item term="测评时间">{{ details.cpsj }}</detail-list-item>
      </detail-list>
    </a-card>
    <!--<a-divider style="margin-bottom: 32px"/>-->

    <a-card :bordered="false" class="card" title="答题详情">
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
    <a-form-item
      :wrapperCol="{ span: 24 }"
      style="text-align: center"
    >
      <a-button htmlType="submit" type="primary">提交</a-button>
      <router-link :to="{ path: '/evaluation/result' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
      <!--<a-button style="margin-left: 8px" @click="handleReset" >重置</a-button>-->
    </a-form-item>
  </div>
</template>

<script>
  // import { PageView } from '@/layouts'
  import { STable,Ellipsis } from '@/components'
  import DetailList from '@/components/tools/DetailList'
  const DetailListItem = DetailList.Item
  import { getResultDet,getResultList2} from '@/api/evaluation'
  import moment from 'moment'

  const statusMap = {
    0: {
      status: 'default',
      text: '禁用'
    },
    1: {
      status: 'success',
      text: '启用'
    }
  }
  export default {
    name:'ResultEdit',
    components: {
      STable,
      Ellipsis,
      DetailList,
      DetailListItem
    },
    data () {
      return {
        visible:false,
        form: this.$form.createForm(this),
        number: {
          value: 0,
        },
        tips: '只能输入数字，仅支持整数，最小填1',
        option: [{ id: 1, value: "例1" }, { id: 2, value: "例2" }, { id: 3, value: "例3" }],
        // 高级搜索 展开/关闭
        disabled: true,
        id: '',
        details: {},
        columns: [
          {
            title: '标题',
            dataIndex: 'bt'
          },
        {
          title: '思维方式',
          dataIndex: 'swfs'
        },
        {
          title: '数学素养',
          dataIndex: 'sxsy'
        },
        {
          title: '知识点',
          dataIndex: 'zsd'
        },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
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
    mounted () {
      // 查询基本信息
      this.id = this.$route.query.id
      const params = {}
      params['id'] = this.id
      getResultDet(params).then(res => {
        console.log(res.result.data)
        this.details = res.result.data;
        // this.form.setFieldsValue({status:this.details.status});
      })
    },
    methods: {
      openMol(){
        this.visible = true;
      },

      handleNumberChange (value) {
        this.number = {
          // ...validatePrimeNumber(value),
          value:value
        };
      },
      handleSubmit(){},
      moment,
      goPage (parameter) {
        return getResultList2(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
    },
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
<style>
  .card{
    margin-bottom: 24px;
  }
  .cp-model .ant-modal-body {
    background: #F0F2F5;
  }
</style>