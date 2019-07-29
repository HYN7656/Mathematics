<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: right"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/content/card' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
      </a-form-item>
      <a-form-item
        label="标题"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="['title',{rules: [{ required: true, message: '请输入标题' }]}]"
          name="name"
          placeholder="请输入标题"/>
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
        label="起止日期"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-range-picker
          name="buildTime"
          style="width: 100%"
          format="YYYY-MM-DD HH:mm:ss"
          :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
          v-decorator="['buildTime',{rules: [{ required: true, message: '请选择起止日期' }]}]"/>
      </a-form-item>
      <a-form-item
        label="状态"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-switch v-decorator="['status',{ valuePropName: 'checked'}]" />
      </a-form-item>
      <a-form-item
        label="权重"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input placeholder="请输入权重" v-decorator="['qz',{rules: [{ required: false, message: '请输入权重' }]}]"/>
      </a-form-item>
      <a-form-item
        label="类型"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
      >
        <a-radio-group v-decorator="['type',{initialValue: 0}]" @change="onChange">
          <a-radio :value="0" >
            链接
          </a-radio>
          <a-radio :value="1">
            课程
          </a-radio>
          <a-radio :value="2">
            题库
          </a-radio>
          <a-radio :value="3">
            资讯
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="内容"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
        :required="false"
      >
        <a-select v-decorator="['gender']">
          <a-select-option :key="l.id" v-for="l in option">{{ l.value }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <router-link :to="{ path: '/content/card' }"><a-button style="margin-left: 8px">返回</a-button></router-link>
        <a-button style="margin-left: 8px" @click="handleReset">重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>

</template>

<script>
import moment from 'moment'
import { getCardDet, getCardSel, getCardAdd, getCardEdit } from '@/api/content'
export default {
  name: 'CardEdit',
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
    this.form.setFieldsValue({status:false});
    // 默认查询类型第一个
    this.selContent(this.contId);
    // 判断是添加还是编辑
    if (this.$route.query.state == 'add') {
      this.$route.meta.title = '轮播管理添加';
    } else if (this.$route.query.state == 'edit') {
      this.$route.meta.title = '轮播管理编辑';
      this.id = this.$route.query.id;
      let params = {};
      params['id'] = this.id;
      getCardDet(params).then(res => {
        console.log(res.result.data);
        this.form.setFieldsValue(res.result.data);

        // 日期返显
        this.form.setFieldsValue({
          buildTime:[moment(res.result.data.startTime, 'YYYY-MM-DD HH:mm:ss'), moment(res.result.data.endTime, 'YYYY-MM-DD HH:mm:ss')]
        });
        // 图片返显
        this.fileList = res.result.data.fileList;
      })
    }
  },
  methods: {
    moment,
    // 重置
    handleReset () {
      this.form.resetFields()
    },
    // 提交表单
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          if(!this.id){
            //新增
            console.log(values)
            let params = {}
            params['title'] = values.title;
            params['type'] = values.type;
            params['startTime'] = values.buildTime[0].format('YYYY-MM-DD HH:mm:ss');
            params['endTime'] = values.buildTime[1].format('YYYY-MM-DD HH:mm:ss');
            params['status'] = values.status;
            params['qz'] = values.qz;
            params['gender'] = values.gender;
            // params['fileList'] = values.fileList;
            console.log(params)
            getCardAdd(params).then(res => {
              console.log(res.result.data)
              this.$message.info('添加成功');
              // this.$router.push({ name: 'Card'})
            })
          }else {
            //编辑
            console.log(values)
            let params = {}
            params['id'] = this.id;
            params['title'] = values.title;
            params['type'] = values.type;
            params['startTime'] = values.buildTime[0].format('YYYY-MM-DD HH:mm:ss');
            params['endTime'] = values.buildTime[1].format('YYYY-MM-DD HH:mm:ss');
            params['status'] = values.status;
            params['qz'] = values.qz;
            params['gender'] = values.gender;
            // params['fileList'] = values.fileList;
            console.log(params)
            getCardEdit(params).then(res => {
              console.log(res.result.data)
              this.$message.info('编辑成功');
              // this.$router.push({ name: 'Card'})
            })
          }
        }
      })
    },
    // 点击类型，查询内容
    onChange (e) {
      this.contId = e.target.value;
      this.selContent(this.contId)
    },
    // 内容select
    selContent(id){
      let params = {};
      params[id] = id;
      getCardSel(params).then(res => {
        this.option = res.result.data
      })
    },
    handleChange (info) {
      console.log(info)
      this.fileList = info.fileList;
      // console.log(fileList)
      // this.fileList = fileList;
      // console.log(this.fileList)
    },
    // 预览框关闭
    handleCancel () {
      this.previewVisible = false
    },
    //点击文件链接或预览图标时的回调
    handlePreview (file) {
      console.log(file)
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    uploadUrlImg(){
      // return config.baseURL + '/newsInfo/newsFile';
      return 'https://www.mocky.io/v2/5cc8019d300000980a055e76';
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
