<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="输入搜索">
              <a-input v-model="queryParam.username" placeholder="请输入用户名"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="创建时间">
              <a-date-picker v-model="queryParam.makeDate" style="width: 100%" placeholder="请选择创建时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="操作状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option :key="s.id" v-for="s in option">{{ s.value }}</a-select-option>
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
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="goPage"
      :showPagination="false"
    >
    </s-table>
  </a-card>

</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import { getJournalList } from '@/api/system'
  import moment from 'moment'
  export default {
    name: 'Journal',
    components: {
      STable,
      Ellipsis
    },
    data () {
      return {
        option: [{ id: 1, value: "例1" }, { id: 2, value: "例2" }, { id: 3, value: "例3" }],
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '用户名',
            dataIndex: 'username'
          },
          {
            title: '用户操作',
            dataIndex: 'useroperations'
          },
          {
            title: '请求方法',
            dataIndex: 'requestmethod'
          },
          {
            title: '请求参数',
            dataIndex: 'requestparameters'
          },
          {
            title: 'ip地址',
            dataIndex: 'ip'
          },
          {
            title: '创建时间',
            dataIndex: 'creationtime'
          },
          {
            title: '操作状态',
            dataIndex: 'operationalstatus'
          }
        ],
      }
    },
    methods: {
      moment,
      goPage (parameter) {
        return getJournalList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      // 搜索展开关闭
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
    },
    mounted () {},
    created () {},
  }
</script>
