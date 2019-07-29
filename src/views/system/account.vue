<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <!--<a-form @submit="handleSubmit" :form="form">
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: right"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        &lt;!&ndash;<router-link :to="{ path: '/system/role' }"><a-button style="margin-left: 8px">返回</a-button></router-link>&ndash;&gt;
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
        label="旧密码"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          type="password"
          v-decorator="['oldpassword',{rules: [{ required: true, message: '请输入旧密码' }]}]"
          name="oldpassword"
          placeholder="请输入旧密码"/>
      </a-form-item>
      <a-form-item
        label="新密码"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          type="password"
          v-decorator="['newpassword',{rules: [{ required: true, message: '请输入新密码' }]}, {
              validator: validateToNextPassword,
            }]"
          name="newpassword"
          placeholder="请输入新密码"/>
      </a-form-item>
      <a-form-item
        label="确认密码"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          type="password"
          @blur="handleConfirmBlur"
          v-decorator="['password',{rules: [{ required: true, message: '请输入确认密码' }]}, {
              validator: compareToFirstPassword,
            }]"
          name="password"
          placeholder="请输入确认密码"/>
      </a-form-item>

      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        &lt;!&ndash;<router-link :to="{ path: '/system/role' }"><a-button style="margin-left: 8px">返回</a-button></router-link>&ndash;&gt;
        <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
      </a-form-item>
    </a-form>-->
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item
        label="头像"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :beforeUpload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 200px" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">上传头像</div>
          </div>
        </a-upload>
      </a-form-item>
      <a-form-item
        label="用户名"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
          'username',
          {
            rules: [{
              required: true, message: '请输入用户名',
            }],
          }
        ]"
        />
      </a-form-item>
      <a-form-item
        label="邮箱"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
          'email',
          {
            rules: [{
              type: 'email', message: '请输入正确的email！',
            }, {
              required: true, message: '请输入email！',
            }]
          }
        ]"
        />
      </a-form-item>
      <a-form-item
        label="联系方式"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入您的联系方式' }],
          }
        ]"
        >
        </a-input>
      </a-form-item>
      <a-form-item
        label="旧密码"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
          'oldpassword',
          {
            rules: [{
              required: true, message: '请输入密码',
            }],
          }
        ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        label="新密码"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
          'password',
          {
            rules: [{
              required: true, message: '请输入新密码',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
          type="password"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-input
          v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: '请再次输入密码',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
          type="password"
          @blur="handleConfirmBlur"
        />
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button html-type="submit" type="primary">提交</a-button>
      </a-form-item>

    </a-form>
  </a-card>

</template>

<script>
  import { getRoleAdd, getRoleEdit } from '@/api/system'
  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  export default {
    name: 'account',
    data () {
      return {
        form: this.$form.createForm(this),
        loading: false,
        imageUrl: '',
      }
    },
    created () {

    },
    mounted () {
    },
    beforeCreate () {
      this.form = this.$form.createForm(this)
    },
    methods: {
      handleChange (info) {
        if (info.file.status === 'uploading') {
          this.loading = true
          return
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (imageUrl) => {
            console.log(imageUrl)
            this.imageUrl = imageUrl
            this.loading = false
          })
        }
      },
      beforeUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        if (!isJPG) {
          this.$message.error('你只能上传jpg格式!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('图片要小于2MB!')
        }
        return isJPG && isLt2M
      },

      // 提交表单
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
          }
        })
      },
      // 校验
      handleConfirmBlur  (e) {
        const value = e.target.value;
        this.confirmDirty = this.confirmDirty || !!value;
      },
      compareToFirstPassword  (rule, value, callback) {
        const form = this.form;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次密码不一致！');
        } else {
          callback();
        }
      },
      validateToNextPassword  (rule, value, callback) {
        const form = this.form;
        if (value && this.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      },
    }
  }
</script>

<style lang="less">
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
