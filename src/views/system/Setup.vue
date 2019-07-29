<template>

<div>
<a-card class="card" title="积分设置" :bordered="false">

  <a-row class="form-row" :gutter="16">
    <a-col :xl="{span: 11, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
      <a-form-item
        label="消费获取积分规则">
        <a-input
          addonBefore="消费"
          addonAfter="元 获得1积分"
          v-model="form.xfgz"
          placeholder="请输入"/>
      </a-form-item>
    </a-col>
    <a-col :xl="{span: 11, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
      <a-form-item
        label="签到获取积分规则">
        <a-input
          addonBefore="每天签到获得"
          addonAfter="积分"
          v-model="form.qdgz"
          placeholder="请输入"/>
      </a-form-item>
    </a-col>
  </a-row>
  <a-row class="form-row" :gutter="16">
    <a-col :xl="{span: 11, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
      <a-form-item
        label="分享获取积分规则">
        <a-input
          addonBefore="分享一次获得"
          addonAfter="积分"
          v-model="form.fxgz"
          placeholder="请输入"/>
        <a-input
          addonBefore="每天最高获得"
          addonAfter="积分"
          v-model="form.zggz"
          placeholder="请输入"/>
      </a-form-item>
    </a-col>
    <a-col :xl="{span: 11, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
      <a-form-item
        label="积分过期规则">
        <a-input
          addonBefore="积分有效时间"
          addonAfter="年"
          v-model="form.yxsj"
          placeholder="请输入"/>
      </a-form-item>
    </a-col>
  </a-row>

</a-card>
  <a-card class="card" title="订单设置" :bordered="false">

      <a-row class="form-row" :gutter="16">
        <a-col :xl="{span: 11, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
          <a-form-item
            label="订单取消规则">
            <a-input
              addonBefore="订单超过"
              addonAfter="小时 未支付，自动取消订单"
              v-model="form.ddcs"
              placeholder="请输入"/>
          </a-form-item>
        </a-col>
        <a-col :xl="{span: 11, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
          <a-form-item
            label="订单评价规则">
            <a-input
              addonBefore="订单超过"
              v-model="form.ddhp"
              addonAfter="天 未评价，默认5星好评"
              placeholder="请输入"/>
          </a-form-item>
        </a-col>
      </a-row>

  </a-card>
  <a-form-item
    :wrapperCol="{ span: 24 }"
    style="text-align: center"
  >
  <a-button type="primary" @click="save">提交</a-button>
  </a-form-item>

</div>

</template>

<script>
  export default {
    name: 'Setup',
    data () {
      return {
        form:{}
      }
    },
    methods: {
      save(){
        console.log(this.form)
      },
    }
  }
</script>

<style scoped>
  .card{
    margin-bottom: 24px;
  }
</style>
