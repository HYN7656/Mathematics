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
              <a-select v-model="queryParam.lx" placeholder="请选择" default-value="0">
                <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="推荐城市">
                <a-select v-model="queryParam.cs" placeholder="请选择" default-value="0">
                  <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="推荐状态">
                <a-select v-model="queryParam.zt" placeholder="请选择" default-value="0">
                  <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="开始时间">
                <a-date-picker v-model="queryParam.Startdate" style="width: 100%" placeholder="请选择开始时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="结束时间">
                <a-date-picker v-model="queryParam.Enddate" style="width: 100%" placeholder="请选择开始时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
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
      <a-modal
        :title="ModTitle"
        v-model="visible"
      >
        <template slot="footer" >
          <a-button key="back" @click="visible=false" v-show="!lookdis">取消</a-button>
          <a-button key="submit" type="primary" @click="handleSubmit" v-show="!lookdis">
            确定
          </a-button>
        </template>
        <a-card :bordered="false">
          <a-form :form="form">

            <a-form-item label="资讯"
                         :labelCol="{lg: {span: 5}, sm: {span: 7}}"
                         :wrapperCol="{lg: {span: 19}, sm: {span: 17} }">
              <a-select  placeholder="请选择资讯" default-value="0" :disabled="lookdis"
                         v-decorator="['zx',{rules: [{ required: true, message: '请选择课程' }]}]">
                <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="城市"
                         :labelCol="{lg: {span: 5}, sm: {span: 7}}"
                         :wrapperCol="{lg: {span: 19}, sm: {span: 17} }">
              <a-select  placeholder="请选择城市" default-value="0" :disabled="lookdis"
                         v-decorator="['cs',{rules: [{ required: true, message: '请选择城市' }]}]">
                <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item
              label="起止日期"
              :labelCol="{lg: {span: 6}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 18}, sm: {span: 17} }">
              <a-range-picker
                name="buildTime"
                style="width: 100%"
                format="YYYY-MM-DD HH:mm:ss"
                :disabled="lookdis"
                :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                v-decorator="['buildTime',{rules: [{ required: true, message: '请选择起止日期' }]}]"/>
            </a-form-item>
            <a-form-item
              label="状态"
              :labelCol="{lg: {span: 5}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 19}, sm: {span: 17} }"
            >
              <a-radio-group v-decorator="['type',{initialValue: 0}]" :disabled="lookdis" >
                <a-radio :value="0">
                  启用
                </a-radio>
                <a-radio :value="1">
                  禁用
                </a-radio>
              </a-radio-group>
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
          <a title="查看" @click="handleLook(text, record, index)"><a-icon type="search" /></a>
          <a-divider type="vertical"/>
          <a title="编辑" @click="handleEdit(text, record, index)"><a-icon type="form" /></a>
          <a-divider type="vertical"/>
          <a title="移除" @click="handleDel(text, record, index)"><a-icon type="delete" /></a>
        </template>
      </span>
    </s-table>
  </a-card>

</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import { getInfList,getInfDet } from '@/api/InformationRecom'
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
    name: 'InformationRecom',
    components: {
      STable,
      Ellipsis
    },
    data () {
      return {
        form: this.$form.createForm(this),
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        option:[{id:1,value:"例1"},{id:2,value:"例2"},{id:3,value:"例3"}],
        // 表头
        columns: [
          {
            title: '名称',
            dataIndex: 'title'
          },

          { title: '图片',
            dataIndex: 'img',
            customRender: text => <img alt="轮播图片" style="width: 50px;height: 50px" src={text} />
      },
        {
          title: '价格',
          dataIndex: 'price'
        },
        {
          title: '推荐城市',
          dataIndex: 'tjcs'
        },
        {
          title: '推荐状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
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
        visible: false,
        ModTitle:'添加',
        lookdis : false,
        contId:0,
    }
    },
    methods: {
      moment,
      // 搜索展开关闭
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
      // 列表查询
      goPage (parameter) {
        return getInfList(Object.assign(parameter,this.queryParam)).then(res => {
          return res.result
        })
      },
      // 新增
      add () {
        this.visible = true;
        this.ModTitle = "添加";
        this.contId = 1;
        this.lookdis = false;
        this.form.resetFields()
      },
      // 统一删除
      del () {
        let params = {};
        params['id'] = this.selectedRowKeys;
        console.log(params)
        getInfList(params).then(res => {
          this.$refs.table.refresh();  //重新加载数据
        })
      },
      // 统一启用
      enable () {
        let params = {};
        params['id'] = this.selectedRowKeys;
        console.log(params)
        getInfList(params).then(res => {
          this.$refs.table.refresh();  //重新加载数据
        })
      },
      // 统一禁用
      prohibit () {
        let params = {};
        params['id'] = this.selectedRowKeys;
        console.log(params)
        getInfList(params).then(res => {
          this.$refs.table.refresh();  //重新加载数据
        })
      },
      // 查看
      handleLook(text, record, index){
        // this.abc = null;
        this.visible = true;
        this.lookdis = true;
        this.form.resetFields()
        this.ModTitle = "查看";
        console.log(record.id)
        this.contId = 0;
        let params = {};
        params['id'] = record.id;
        getInfDet(params).then(res => {
          console.log(res.result.data)
          setTimeout(()=>{
            this.form.setFieldsValue(res.result.data)
            this.form.setFieldsValue({
              buildTime:[moment(res.result.data.startTime, 'YYYY-MM-DD HH:mm:ss'), moment(res.result.data.endTime, 'YYYY-MM-DD HH:mm:ss')]
            });
          },0)
        })
      },
      // 编辑
      handleEdit (text, record, index) {
        // this.abc = null;
        this.visible = true;
        this.lookdis = false;
        this.form.resetFields()
        this.ModTitle = "编辑";
        // console.log(text)
        console.log(record.id)
        this.contId = 2;
        let params = {};
        params['id'] = record.id;
        getInfDet(params).then(res => {
          console.log(res.result.data)
          this.id = res.result.data.id;
          setTimeout(()=>{
            this.form.setFieldsValue(res.result.data)
            this.form.setFieldsValue({
              buildTime:[moment(res.result.data.startTime, 'YYYY-MM-DD HH:mm:ss'), moment(res.result.data.endTime, 'YYYY-MM-DD HH:mm:ss')]
            });
          },0)

        })
        // console.log(index)
        // this.$refs.modal.edit(record)
      },
      // 单个删除
      handleDel(text, record, index){
        console.log(record.id)
      },
      onSelectChange (selectedRowKeys, selectedRows) {
        console.log(selectedRowKeys)  //选中的id
        console.log(selectedRows)   //选中的对象
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      handleSubmit(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            if(this.contId == 0){
              console.log("查看")
            }else if(this.contId == 1){
              console.log("新增")
              let params = {}
              params['cs'] = values.cs;
              params['zx'] = values.zx;
              params['startTime'] = values.buildTime[0].format('YYYY-MM-DD HH:mm:ss');
              params['endTime'] = values.buildTime[1].format('YYYY-MM-DD HH:mm:ss');
              params['type'] = values.type;
              console.log(params)
              getInfDet(params).then(res => {
                console.log(res.result.data)
                this.$message.info('添加成功');
                this.visible = false;
                // this.$router.push({ name: 'Card'})
              })
            }else if(this.contId == 2){
              console.log("编辑")
              let params = {}
              params['id'] = this.id;
              params['cs'] = values.cs;
              params['zx'] = values.zx;
              params['startTime'] = values.buildTime[0].format('YYYY-MM-DD HH:mm:ss');
              params['endTime'] = values.buildTime[1].format('YYYY-MM-DD HH:mm:ss');
              params['type'] = values.type;
              console.log(params)
              getCouDet(params).then(res => {
                console.log(res.result.data)
                this.$message.info('编辑成功');
                this.visible = false;
                // this.$router.push({ name: 'Card'})
              })
            }
            console.log(values)
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values)
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
