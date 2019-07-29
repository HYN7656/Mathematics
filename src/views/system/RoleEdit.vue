<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: right"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/system/role' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
      </a-form-item>
      <a-form-item
        label="角色名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="['RoleName',{rules: [{ required: true, message: '请输入角色名称' }]}]"
          name="RoleName"
          placeholder="请输入角色名称"/>
      </a-form-item>
      <a-form-item
        label="角色描述"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          type='textarea'
          v-decorator="['describe']"
          placeholder="角色描述"
        />
      </a-form-item>
      <a-form-item
        label="功能权限"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-tree-select
          :treeData="treeData"
          :value="functionValue"
          @change="onFunChange"
          treeCheckable
          :showCheckedStrategy="SHOW_PARENT"
          searchPlaceholder='Please select'
        />
      </a-form-item>
      <a-form-item
        label="数据权限"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-tree-select
          :treeData="treeData1"
          :value="dataValue"
          @change="onDataChange"
          treeCheckable
          :showCheckedStrategy="SHOW_PARENT"
          searchPlaceholder='Please select'
        />
      </a-form-item>
      <a-form-item
        label="状态"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-radio-group v-decorator="['status',{initialValue: 0}]" >
          <a-radio :value="0">
            禁用
          </a-radio>
          <a-radio :value="1" >
            启用
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/system/role' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
        <!--<a-button style="margin-left: 8px" @click="handleReset">重置</a-button>-->
      </a-form-item>
    </a-form>
  </a-card>

</template>

<script>
  import { getRoleAdd, getRoleEdit } from '@/api/system'
  import { TreeSelect } from 'ant-design-vue'
  const SHOW_PARENT = TreeSelect.SHOW_PARENT

  const treeData = [{
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [{
      title: 'Child Node1',
      value: '0-0-0',
      key: '0-0-0',
    }],
  }, {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
    children: [{
      title: 'Child Node3',
      value: '0-1-0',
      key: '0-1-0',
      disabled: true,
    }, {
      title: 'Child Node4',
      value: '0-1-1',
      key: '0-1-1',
    }, {
      title: 'Child Node5',
      value: '0-1-2',
      key: '0-1-2',
    }],
  }]

  export default {
    name: 'RoleEdit',
    data () {
      return {
        id: '',
        form: this.$form.createForm(this),
        checked: true,
        contId: 0,
        // value: ['0-0-0'],
        value: [],
        dataValue:[],
        functionValue:[],
        treeData:[],
        treeData1:[],
        SHOW_PARENT,

      }
    },
    created () {

    },
    mounted () {
      // 判断是添加还是编辑
      if (this.$route.query.state == 'add') {
        this.$route.meta.title = '角色管理添加';
      } else if (this.$route.query.state == 'edit') {
        this.$route.meta.title = '角色管理编辑';
        this.id = this.$route.query.id;
        let params = {};
        params['id'] = this.id;
        getRoleEdit(params).then(res => {
          console.log(res.result.data);
          this.form.setFieldsValue(res.result.data);
        })
      }
    },
    methods: {
      // 重置
      /* handleReset () {
         this.form.resetFields()
       },*/
      // 提交表单
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            if(!this.id){
              //新增
              console.log(values)
              let params = {}
              params['username'] = values.username;
              params['name'] = values.name;
              params['email'] = values.email;
              params['phone'] = values.phone;
              params['role'] = values.role;
              params['status'] = values.status;
              console.log(params)
              getListManagersAdd(params).then(res => {
                console.log(res.result.data)
                this.$message.info('添加成功');
                // this.$router.push({ name: 'Card'})
              })
            }else {
              //编辑
              console.log(values)
              let params = {}
              params['id'] = this.id;
              params['username'] = values.username;
              params['name'] = values.name;
              params['email'] = values.email;
              params['phone'] = values.phone;
              params['role'] = values.role;
              params['status'] = values.status;
              console.log(params)
              getListManagersEdit(params).then(res => {
                console.log(res.result.data)
                this.$message.info('编辑成功');
                // this.$router.push({ name: 'Card'})
              })
            }
          }
        })
      },
      onFunChange(value){
        console.log('onFunChange ', value)
        this.functionValue = value
      },
      onDataChange(value){
        console.log('onDataChange ', value)
        this.dataValue = value
      },
    }
  }
</script>

<style lang="less">

</style>
