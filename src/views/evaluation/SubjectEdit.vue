<template>
  <div>
    <a-form-item
      :wrapperCol="{ span: 24 }"
      style="text-align: right"
    >
      <a-button type="primary">返回</a-button>

    </a-form-item>
    <a-card :bordered="false" class="card" title="题干信息">
      <a-form-item
        label="标题"
        style="height: 300px"
      >
        <quill-editor
          ref="myTextEditor"
          v-model="fContent"
          :options="editorOption"
          @change="onEditorChange($event)"
          style="height: 200px">
        </quill-editor>
      </a-form-item>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
      <a-row :gutter="48">
        <a-col :md="12" :sm="24">
          <a-form-item label="思维方式">
            <a-select v-model="swfs" placeholder="请选择" default-value="0">
              <a-select-option :key="b.id" v-for="b in option">{{ b.value }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="数学素养">
            <a-select  mode="multiple" v-model="swfs" placeholder="请选择">
              <a-select-option :key="b.id" v-for="b in option">{{ b.value }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="知识点">
            <a-tree-select
              :treeData="treeData"
              :value="value"
              @change="onChange"
              treeCheckable
              :showCheckedStrategy="SHOW_PARENT"
              searchPlaceholder='Please select'
            />
          </a-form-item>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-form-item label="知识点">
            <a-switch v-model="status" />
          </a-form-item>
        </a-col>
      </a-row>
        </a-form>
      </div>



    </a-card>
    <a-card :bordered="false" class="card" title="选项信息">
      <a-col :md="10" :sm="24" style="margin-right: 10%;margin-bottom: 100px">
      <a-form-item
        label="选项A"
        style="height: 300px;"
      >
        <a-radio>正确答案</a-radio>
        <quill-editor
          ref="myTextEditor"
          v-model="fContent"
          :options="editorOption"
          @change="onEditorChange($event)"
          style="height: 200px">
        </quill-editor>
      </a-form-item>
      </a-col>

      <a-col :md="10" :sm="24" style="margin-bottom: 100px">
      <a-form-item
        label="选项B"
        style="height: 300px;"
      >
        <a-radio>正确答案</a-radio>
        <quill-editor
          ref="myTextEditor"
          v-model="fContent"
          :options="editorOption"
          @change="onEditorChange($event)"
          style="height: 200px">
        </quill-editor>
      </a-form-item>
      </a-col>

      <a-col :md="10" :sm="24" style="margin-right: 10%;margin-bottom: 100px">
      <a-form-item
        label="选项C"
        style="height: 300px"
      >
        <a-radio>正确答案</a-radio>
        <quill-editor
          ref="myTextEditor"
          v-model="fContent"
          :options="editorOption"
          @change="onEditorChange($event)"
          style="height: 200px">
        </quill-editor>
      </a-form-item>
      </a-col>
      <a-col :md="10" :sm="24" style="margin-bottom: 100px">
      <a-form-item
        label="选项D"
        style="height: 300px"
      >
        <a-radio>正确答案</a-radio>
        <quill-editor
          ref="myTextEditor"
          v-model="fContent"
          :options="editorOption"
          @change="onEditorChange($event)"
          style="height: 200px">
        </quill-editor>
      </a-form-item>
      </a-col>


    </a-card>
    <a-card :bordered="false" class="card" title="答题解析">
      <a-form-item
        label="解析"
        style="height: 300px"
      >
        <quill-editor
          ref="myTextEditor"
          v-model="fContent"
          :options="editorOption"
          @change="onEditorChange($event)"
          style="height: 200px">
        </quill-editor>
      </a-form-item>
    </a-card>
  </div>

</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import * as Quill from 'quill' // 引入编辑器
  import { TreeSelect } from 'ant-design-vue'
  const SHOW_PARENT = TreeSelect.SHOW_PARENT
  var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif']
  var Font = Quill.import('formats/font')
  Font.whitelist = fonts // 将字体加入到白名单
  Quill.register(Font, true)

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
        name: "SubjectEdit",
        components: { quillEditor},
      data () {
        return {
          fContent:'',
          // 富文本配置
          editorOption: {
            modules: {
              toolbar: [
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                // [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],

                [{ 'size': [] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],
                [{ 'font': fonts }], // 把上面定义的字体数组放进来

                [{ 'align': [] }],

                ['clean'],
                ['image', 'video']
              ]
            },
            theme: 'snow'
          },
          option:[{id:1,value:"例1"},{id:2,value:"例2"},{id:3,value:"例3"}],
          swfs:[],
          value: ['0-0-0'],
          treeData,
          SHOW_PARENT,
          status:true
        }
      },
      methods: {
        // 编辑器
        onEditorChange ({ editor, html, text }) {
          this.fContent = html
          this.fContents = text
        },
        onChange (value) {
          console.log('onChange ', value)
          this.value = value
        },
      },
      mounted(){
      }
    }
</script>

<style scoped>
  .card {
    margin-bottom: 25px;
  }

</style>