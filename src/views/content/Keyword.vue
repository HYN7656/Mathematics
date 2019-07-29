<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="输入搜索">
              <a-input v-model="queryParam.tit" placeholder="标题"/>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="add">添加</a-button>
      <a-modal
        title="添加"
        v-model="visible"
      >
        <template slot="footer" >
          <a-button key="back" @click="visible=false" >取消</a-button>
          <a-button key="submit" type="primary" @click="handleSubmit" >
            确定
          </a-button>
        </template>
        <a-card :bordered="false">
          <a-form :form="form">

            <a-form-item
              label="关键词"
              :labelCol="{lg: {span: 5}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 19}, sm: {span: 17} }">
              <a-input placeholder="请输入关键词" v-decorator="[
                  'key',
                  {rules: [{ required: true, message: '请输入关键词' }]}
                ]"/>
            </a-form-item>
            <a-form-item
              label="权重"
              :labelCol="{lg: {span: 5}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 19}, sm: {span: 17} }">
              <a-input placeholder="请输入权重" v-decorator="[
                  'qz',
                  {rules: [{ required: true, message: '请输入排序' }]}
                ]"/>
            </a-form-item>
          </a-form>
        </a-card>
      </a-modal>
      <!--<a-button type="dashed" @click="tableOption">{{ optionAlertShow && '关闭' || '开启' }} alert</a-button>-->
    </div>
    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="goPage"
      :showPagination="false"
    >
      <span slot="action" slot-scope="text, record, index">
        <template>
          <a title="移除" @click="handleDel(text, record, index)"><a-icon type="delete" /></a>
        </template>
      </span>
    </s-table>
  </a-card>

</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getKeyList, getKeyDet, getKeyAdd } from '@/api/keyword'
export default {
  name: 'Keyword',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      form: this.$form.createForm(this),
      // 查询参数
      queryParam: {},
      advanced: false,
      // 表头
      columns: [
        {
          title: '关键词',
          dataIndex: 'keyword'
        },
        {
          title: '权重',
          dataIndex: 'qz'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      visible: false
    }
  },
  methods: {
    // 列表查询
    goPage (parameter) {
      return getKeyList(Object.assign(parameter,this.queryParam)).then(res => {
        return res.result
      })
    },
    // 新增
    add () {
      this.visible = true;
      this.form.resetFields();
    },
    // 删除
    handleDel (text, record, index) {
      console.log(record.id)
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values)
          let params = {}
          params['key'] = values.key;
          params['qz'] = values.qz;
          getKeyAdd(params).then(res => {
            console.log(res.result.data)
            this.$message.info('添加成功');
            this.visible = false;
          })
        }
      })
    }

  },
  mounted () {
    // this.fetch()
  },
  created () {

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
