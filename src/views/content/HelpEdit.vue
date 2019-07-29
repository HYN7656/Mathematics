<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: right"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/content/help' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
      </a-form-item>
      <a-form-item
        label="帮助标题"
        :labelCol="{lg: {span: 2}, sm: {span: 2}}"
        :wrapperCol="{lg: {span: 7}, sm: {span: 7} }"
        >
        <a-input
          v-decorator="[
            'tit',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
          name="name"
          placeholder="给目标起个名字"/>
      </a-form-item>
      <a-form-item
        label="权重"
        :labelCol="{lg: {span: 2}, sm: {span: 2}}"
        :wrapperCol="{lg: {span: 7}, sm: {span: 7} }">
        <a-input placeholder="请输入权重" v-decorator="['qz',{rules: [{ required: true, message: '请输入权重' }]}]"/>
      </a-form-item>
      <a-form-item
        label="类型"
        :labelCol="{lg: {span: 2}, sm: {span: 2}}"
        :wrapperCol="{lg: {span: 7}, sm: {span: 7} }">
        <a-radio-group v-decorator="['type',{initialValue: 1,rules: [{ required: true, message: '请选择类型' }]}]">
          <a-radio :value="1">
            启用
          </a-radio>
          <a-radio :value="0">
            禁用
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <span style="margin: 15px;display: block;"><span style="font-size: 20px;color:#f5222d;">*</span>内容详情:</span>
      <quill-editor ref="myTextEditor"
                    v-model="fContent"
                    :options="editorOption"
                    @change="onEditorChange($event)"
                    style="height: 200px">
      </quill-editor>

      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center;margin-top: 80px;"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/content/help' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
        <!--<a-button style="margin-left: 8px">重置</a-button>-->
      </a-form-item>
    </a-form>
  </a-card>

</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import {quillEditor} from 'vue-quill-editor';
  import * as Quill from 'quill'; //引入编辑器
  import { getHelpAdd ,getHelpEdit } from '@/api/help'
  //quill编辑器的字体
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
  var Font = Quill.import('formats/font');
  Font.whitelist = fonts; //将字体加入到白名单
  Quill.register(Font, true);
  export default {
    name: 'HelpEdit',
    components: {quillEditor,STable,Ellipsis},
    data() {
      return {
        form: this.$form.createForm(this),
        // 富文本配置
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],

              [{'header': 1}, {'header': 2}],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{'script': 'sub'}, {'script': 'super'}],
              // [{ 'indent': '-1'}, { 'indent': '+1' }],
              [{'direction': 'rtl'}],

              [{'size': []}],
              [{'header': [1, 2, 3, 4, 5, 6, false]}],

              [{'color': []}, {'background': []}],
              [{'font': fonts}],    //把上面定义的字体数组放进来

              [{'align': []}],

              ['clean'],
              ['image', 'video']
            ]
          },
          theme: 'snow'
        },
        fContent:'',
        contId: 0
      }
    },
    created() {},
    mounted () {
      // 判断是添加还是编辑
      if (this.$route.query.state == 'add') {
        this.$route.meta.title = '帮助中心添加';
      } else if (this.$route.query.state == 'edit') {
        this.$route.meta.title = '帮助中心编辑';
        this.id = this.$route.query.id;
        let params = {};
        params['id'] = this.id;
        getHelpEdit(params).then(res => {
          console.log(res.result.data);
          this.form.setFieldsValue(res.result.data);
          this.fContent = res.result.data.txt;
        })
      }
    },
    methods: {

      // 编辑器
      onEditorChange({editor, html, text}){

      },
      // 重置
      handleReset () {
        this.form.resetFields()
      },







      handleSubmit(e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values)
          }
        })
      }

    }
  }
</script>

<style lang="less">

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