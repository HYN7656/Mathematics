<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false" >
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: right"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/evaluation/comprehensive' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
      </a-form-item>
      <a-form-item
        label="测评名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="['title',{rules: [{ required: true, message: '请输入测评名称' }]}]"
          name="name"
          placeholder="请输入测评名称"/>
      </a-form-item>
      <a-form-item
        label="图片"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <div class="clearfix">
          <a-upload
            :action="uploadUrlImg()"
            listType="picture-card"
            :fileList="fileList"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 3">
              <a-icon type="plus"/>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage"/>
          </a-modal>
        </div>
      </a-form-item>
      <a-form-item
        label="状态"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-switch v-decorator="['status',{ valuePropName: 'checked'}]" />
      </a-form-item>
      <a-form-item
        label="测评题目"
        style="height: 400px"
      >
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="columns"
          :data="goPage"
          :showPagination="false"
        >
          <span slot="serial" slot-scope="text, record, index">
            {{ index + 1 }}
          </span>
          <span slot="description" slot-scope="text">
            <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
          </span>

          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="handleLook(record)" title="查看"><a-icon type="form" /></a>
              <a-divider type="vertical"/>
              <a title="移除" @click="handleDel(record)"><a-icon type="delete" /></a>
              <a-divider type="vertical"/>
              <a title="上移" @click="handleUp(record)"><a-icon type="arrow-up" /></a>
              <a-divider type="vertical"/>
              <a title="下移" @click="handleDown(record)"><a-icon type="arrow-down" /></a>
            </template>
          </span>
        </s-table>
        <a-button type="primary" style="float: right;margin: 20px;" @click="showModal">添加课程推荐</a-button>
        <a-modal
          style="top: 20px;"
          v-model="visible"
          @ok="hideModal"
          class="openModel"
          :footer="null"
        >
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="8" :sm="24">
                  <a-form-item label="输入搜索">
                    <a-input v-model="queryParam.id" placeholder="题干"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="思维方式">
                    <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                      <a-select-option :key="s.id" v-for="s in option">{{ s.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <template v-if="advanced">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="数学素养">
                      <a-select v-model="queryParam.zsd" placeholder="请选择" default-value="0">
                        <a-select-option :key="l.id" v-for="l in option">{{ l.value }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="知识点">
                      <a-select v-model="queryParam.sxsy" placeholder="请选择" default-value="0">
                        <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="8" :sm="24">
                    <a-form-item label="更新时间">
                      <a-date-picker v-model="queryParam.Startdate" style="width: 100%" placeholder="请选择更新时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
                    </a-form-item>
                  </a-col>
                </template>
                <a-col :md="!advanced && 8 || 24" :sm="24">
                  <span
                    class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                    <a-button type="primary" @click="$refs.Seltable.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                    </a>
                  </span>
                </a-col>
              </a-row>
            </a-form>
            <div class="table-operator" style="margin-bottom: 20px">
              <a-button type="primary" @click="ModalClick">确认</a-button>
            </div>
          </div>
          <s-table
            ref="Seltable"
            size="default"
            rowKey="id"
            :columns="columns2"
            :data="goList"
            :alert="options.alert"
            :rowSelection="options.rowSelection"
            showPagination="auto"
          >
            <span slot="description" slot-scope="text">
              <ellipsis :length="4" tooltip>{{ text }}</ellipsis>
            </span>
          </s-table>
        </a-modal>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/evaluation/comprehensive' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
        <a-button style="margin-left: 8px" @click="handleReset" v-if="editShow">重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>

</template>

<script>
  import moment from 'moment'
  import { getComprehensiveDet,getComprehensiveSel } from '@/api/evaluation'
  import { STable, Ellipsis } from '@/components'

  export default {
    name: 'ComprehensiveEdit',
    components: { STable, Ellipsis },
    data () {
      return {
        editShow:true,
        option:[{id:1,value:"例1"},{id:2,value:"例2"},{id:3,value:"例3"}],
        id: '',
        contId: 0,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        form: this.$form.createForm(this),

        fContent: '',
        fContents: '',
        // 测评题目表头
        columns: [
          {
            title: '序号',
            scopedSlots: { customRender: 'serial' }
          },
          {
            title: '标题',
            dataIndex: 'title'
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
          title: '更新时间',
          dataIndex: 'updateTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
    ],
      // 添加课程推荐表头
      visible: false,
        columns2: [
          {
            title: '题干',
            dataIndex: 'title'
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
            title: '更新时间',
            dataIndex: 'updateTime'
          }],
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange
        }
      },
      optionAlertShow: false,
        selectedRowKeys: [],
        selectedRows: [],
        // 高级搜索 展开/关闭
        advanced: false,
        queryParam: {}

    }
    },
    created () {

    },
    mounted () {
      setTimeout(()=>{
        this.form.setFieldsValue({ status: false })
      },0)
      // 判断是添加还是编辑
      if (this.$route.query.state == 'add') {
        this.$route.meta.title = '综合测评添加'
      } else if (this.$route.query.state == 'edit') {
        this.$route.meta.title = '综合测评编辑'
        this.id = this.$route.query.id
        this.editShow = false;
        const params = {}
        params['id'] = this.id
        getComprehensiveDet(params).then(res => {
          console.log(res.result.data)
          setTimeout(()=>{
            this.form.setFieldsValue(res.result.data)
          },0)
          // 图片返显
          this.fileList = res.result.data.fileList
        })
      }
    },
    methods: {
      ModalClick(){
        console.log(this.selectedRowKeys)
        this.visible = false;

      },

      /*课程推荐table部分*/

      // 加载table课程推荐
      goPage (parameter) {
        return getComprehensiveSel(Object.assign(parameter)).then(res => {
          console.log(res)
          return res.result
        })
      },
      // table单个删除
      handleDel (record) {
        getComprehensiveSel(record.id).then(res => {
          this.$refs.table.refresh() // 重新加载数据
        })
      },
      // table上移
      handleUp () {},
      // table下移
      handleDown () {},
      // table查看
      handleLook (record) {},

      // 重置
      handleReset () {
        this.form.resetFields()
      },
      handleChange (info) {
        console.log(info)
        this.fileList = info.fileList
        // console.log(fileList)
        // this.fileList = fileList;
        // console.log(this.fileList)
      },
      // 预览框关闭
      handleCancel () {
        this.previewVisible = false
      },
      // 点击文件链接或预览图标时的回调
      handlePreview (file) {
        console.log(file)
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      uploadUrlImg () {
        // return config.baseURL + '/newsInfo/newsFile';
        return 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
      },
      // 提交表单
      handleSubmit (e) {
        console.log(this.fContent)
        console.log(this.fContents)
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            if (!this.id) {
              // 新增
              console.log(values)
              const params = {}
              params['title'] = values.title
              params['type'] = values.type
              params['status'] = values.status
              params['qz'] = values.qz
              params['url'] = values.url
              params['content'] = this.fContent
              // params['fileList'] = values.fileList;
              console.log(params)
              getInfoAdd(params).then(res => {
                console.log(res.result.data)
                this.$message.info('添加成功')
                // this.$router.push({ name: 'Information'})
              })
            } else {
              // 编辑
              console.log(values)
              const params = {}
              params['id'] = this.id
              params['title'] = values.title
              params['type'] = values.type
              params['status'] = values.status
              params['qz'] = values.qz
              params['url'] = values.url
              params['content'] = this.fContent
              // params['fileList'] = values.fileList;
              console.log(params)
              getInfoEdit(params).then(res => {
                console.log(res.result.data)
                this.$message.info('编辑成功')
                // this.$router.push({ name: 'Information'})
              })
            }
          }
        })
      },
      // 编辑器
      onEditorChange ({ editor, html, text }) {
        this.fContent = html
        this.fContents = text
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },

      /*添加课程推荐table部分*/
      moment,
      // 搜索展开关闭
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      // 添加课程推荐table
      goList (parameter) {
        console.log(this.queryParam)
        return getComprehensiveSel(Object.assign(parameter)).then(res => {
          console.log(res)
          return res.result
        })
      },
      showModal () {
        this.visible = true;
      },
      hideModal () {
        this.visible = false
      },
    }
  }
</script>

<style lang="less">
  .openModel {
    width: 100%!important;
    .ant-modal-body {
      padding-top: 50px;
    }
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  #components-form-demo-validate-other .dropbox {
    height: 180px;
    line-height: 1.5;
  }
</style>
