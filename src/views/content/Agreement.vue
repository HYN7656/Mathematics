<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: right"
      >
        <a-button htmlType="submit" type="primary">保存</a-button>
      </a-form-item>
      <a-form-item
        label="内容详情"
        style="height: 400px"
      >
        <quill-editor ref="myTextEditor"
                      v-model="fContent"
                      :options="Option"
                      @change="onChange($event)"
                      style="height: 200px">
        </quill-editor>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button @click="handleSubmit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="() => fContent = ''">重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>

</template>

<script>
  import { STable, Ellipsis } from '@/components'
  import {quillEditor} from 'vue-quill-editor';
  import * as Quill from 'quill'; //引入编辑器
  //quill编辑器的字体
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif'];
  var Font = Quill.import('formats/font');
  import { getTerTxt } from '@/api/terag'
  Font.whitelist = fonts; //将字体加入到白名单
  Quill.register(Font, true);
  export default {
    name: 'Agreement',
    components: {quillEditor},
    data() {
      return {
        // 富文本配置
        Option: {
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
      }
    },
    created() {

    },
    mounted() {
      this.goPage ();
    },
    methods: {
      goPage () {
        getTerTxt().then(res => {
          console.log(res.result.data)
          this.fContent = res.result.data.txt;
        })
      },
      // 编辑器
      onChange({editor, html, text}) {
        this.fContent = html;
      },
      handleSubmit() {
        let params = {};
        params['html'] = this.fContent;
        console.log(params)
        getTerTxt(params).then(res => {
          console.log(res.result.data)
          this.$message.info('修改成功');
          // this.$router.push({ name: 'Card'})
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