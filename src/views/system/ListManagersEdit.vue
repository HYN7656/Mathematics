<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: right"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/system/listManagers' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
      </a-form-item>
      <a-form-item
        label="用户名"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="['username',{rules: [{ required: true, message: '请输入用户名' }]}]"
          name="username"
          placeholder="请输入用户名"/>
      </a-form-item>
      <a-form-item
        label="姓名"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="['name',{rules: [{ required: true, message: '请输入姓名' }]}]"
          name="name"
          placeholder="请输入姓名"/>
      </a-form-item>
      <a-form-item
        label="邮箱"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="['email',{rules: [{ required: true, message: '请输入邮箱' }]}]"
          name="email"
          placeholder="请输入邮箱"/>
      </a-form-item>
      <a-form-item
        label="联系方式"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="['phone',{rules: [{ required: true, message: '请输入联系方式' }]}]"
          name="phone"
          placeholder="请输入联系方式"/>
      </a-form-item>
      <a-form-item
        label="角色"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-checkbox-group v-decorator="['role']">
          <a-checkbox :value="0">
            系统管理员
          </a-checkbox>
          <a-checkbox :value="1">
            课程管理员
          </a-checkbox>
          <a-checkbox :value="2">
            会员管理员
          </a-checkbox>
        </a-checkbox-group>
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
        <router-link :to="{ path: '/system/listManagers' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
        <!--<a-button style="margin-left: 8px" @click="handleReset">重置</a-button>-->
      </a-form-item>
    </a-form>
  </a-card>

</template>

<script>
  import { getListManagersAdd,getListManagersEdit } from '@/api/system'
  export default {
    name: 'ListManagersEdit',
    data () {
      return {
        id: '',
        previewVisible: false,
        previewImage: '',
        fileList: [],
        form: this.$form.createForm(this),
        checked: true,
        option: [],
        contId: 0

      }
    },
    created () {

    },
    mounted () {
      // 判断是添加还是编辑
      if (this.$route.query.state == 'add') {
        this.$route.meta.title = '管理员添加';
      } else if (this.$route.query.state == 'edit') {
        this.$route.meta.title = '管理员编辑';
        this.id = this.$route.query.id;
        let params = {};
        params['id'] = this.id;
        getListManagersEdit(params).then(res => {
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
    }
  }
</script>

<style lang="less">

</style>
