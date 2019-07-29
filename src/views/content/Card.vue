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
            <a-form-item label="类型">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">链接</a-select-option>
                <a-select-option value="2">课程</a-select-option>
                <a-select-option value="3">题库</a-select-option>
                <a-select-option value="4">资讯</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="开始时间">
                <a-date-picker v-model="queryParam.Startdate" style="width: 100%" placeholder="请选择开始时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="结束时间">
                <a-date-picker v-model="queryParam.Enddate" style="width: 100%" placeholder="请选择结束时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">启用</a-select-option>
                  <a-select-option value="2">禁用</a-select-option>
                </a-select>
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
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="add">添加</a-button>
      <a-button icon="delete" @click="del">删除</a-button>
      <a-button type="primary" icon="check" @click="enable">启用</a-button>
      <a-button icon="close" @click="prohibit">禁用</a-button>
      <!--<a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button>-->
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="goPage"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
      showPagination="auto"
    >
      <!--<span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>-->
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
      </span>
      <!--<span slot="description" slot-scope="text">
        <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
      </span>-->

      <span slot="action" slot-scope="text, record, index">
        <template>
          <a @click="handleEdit(text, record, index)" title="编辑"><a-icon type="form" /></a>
          <a-divider type="vertical"/>
          <a title="移除" @click="handleDel(record)"><a-icon type="delete" /></a>
        </template>
      </span>
    </s-table>
  </a-card>

</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getCardList } from '@/api/content'
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
  name: 'Card',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '图片',
          dataIndex: 'img',
          customRender: text => <img alt="轮播图片" style="width: 50px;height: 50px" src={text} />
        },
        {
          title: '标题',
          dataIndex: 'title'
        },
        {
          title: '类型',
          dataIndex: 'type'
        },
        {
          title: '开始时间',
          dataIndex: 'startTime'
          // sorter: true
        },
        {
          title: '结束时间',
          dataIndex: 'endTime'
          // sorter: true
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
      ],
      // table选项配置
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      selectedRowKeys: [],
      selectedRows: [],
      loading: false
    }
  },
  methods: {
    moment,
    goPage (parameter) {
      return getCardList(Object.assign(parameter,this.queryParam)).then(res => {
        return res.result
      })
    },
    // 搜索展开关闭
    toggleAdvanced () {
      this.advanced = !this.advanced
    },

    // 统一删除
    del () {
      let params = {};
      params['id'] = this.selectedRowKeys;
      console.log(params)
      getCardList(params).then(res => {
        this.$refs.table.refresh();  //重新加载数据
      })
    },
    // 统一启用
    enable () {
      let params = {};
      params['id'] = this.selectedRowKeys;
      console.log(params)
      getCardList(params).then(res => {
        this.$refs.table.refresh();  //重新加载数据
      })
    },
    // 统一禁用
    prohibit () {
      let params = {};
      params['id'] = this.selectedRowKeys;
      console.log(params)
      getCardList(params).then(res => {
        this.$refs.table.refresh();  //重新加载数据
      })
    },
    // 新增
    add () {
      this.$router.push({ name: 'CardEdit' , query: { state: 'add' }})
    },
    // 编辑
    handleEdit (text, record, index) {
      this.$router.push({ name: 'CardEdit' , query: { state: 'edit', id : record.id } })
      console.log(text)
      console.log(record)// 某条数据内容
      console.log(index)// 序号
      // this.$refs.modal.edit(record)
    },
    // 单个删除
    handleDel(record){
      getCardList(record.id).then(res => {
        this.$refs.table.refresh();  //重新加载数据
      })
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      console.log(selectedRowKeys)  //选中的id
      console.log(selectedRows)   //选中的对象
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    }

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
