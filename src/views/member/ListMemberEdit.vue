<template>
  <div>
    <a-form-item
      :wrapperCol="{ span: 24 }"
      style="text-align: right"
    >
      <a-button type="primary" style="margin-right: 25px">综合报告</a-button>
      <a-button type="primary">返回</a-button>

    </a-form-item>
  <a-card :bordered="false" class="card" title="会员详情">
    <!--<a-divider style="margin-bottom: 32px"/>-->
    <detail-list>
      <detail-list-item term="头像"><img :src="details.img" alt="" style="width: 80px;"></detail-list-item>
      <detail-list-item term="账号">{{ details.zh }}</detail-list-item>
      <detail-list-item term="昵称">{{ details.nc }}</detail-list-item>
      <detail-list-item term="性别">{{ details.sex }}</detail-list-item>
      <detail-list-item term="手机号">{{ details.phone }}</detail-list-item>
      <detail-list-item term="出生日期">￥{{ details.csrq }}</detail-list-item>
      <detail-list-item term="邮箱">{{ details.email }}</detail-list-item>
      <detail-list-item term="学校">{{ details.school }}</detail-list-item>
      <detail-list-item term="班级">{{ details.class }}</detail-list-item>
      <detail-list-item term="注册时间">{{ details.zcTime }}</detail-list-item>
      <detail-list-item term="最后登录时间">{{ details.zhdlTime }}</detail-list-item>
      <detail-list-item term="会员状态"><a-switch defaultChecked :disabled="disabled" v-model="details.status" /></detail-list-item>
    </detail-list>
  </a-card>
    <!--<a-divider style="margin-bottom: 32px"/>-->

  <a-card :bordered="false" class="card">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="订单明细" key="1">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="输入搜索">
                  <a-input v-model="queryParam1.id" placeholder="标题"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="订单状态">
                  <a-select v-model="queryParam1.status" placeholder="请选择" default-value="0">
                    <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="支付状态">
                    <a-select v-model="queryParam1.useStatus" placeholder="请选择" default-value="0">
                      <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="创建时间">
                    <a-date-picker v-model="queryParam1.Startdate" style="width: 100%" placeholder="请选择开始时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="支付时间">
                    <a-date-picker v-model="queryParam1.Enddate" style="width: 100%" placeholder="请选择结束时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
                  </a-form-item>
                </a-col>

              </template>
              <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table1.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam1 = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <s-table
          ref="table1"
          size="default"
          rowKey="id"
          :columns="tab1columns"
          :data="goPagetab1"
        >

      <span slot="action" slot-scope="text, record, index">
        <template>
          <a title="查看" @click="handleLook(text, record, index)"><a-icon type="search" /></a>
        </template>
      </span>
        </s-table>
      </a-tab-pane>
      <a-tab-pane tab="积分明细" key="2" forceRender>
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="输入搜索">
                  <a-input v-model="queryParam2.id" placeholder="标题"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="积分来源">
                  <a-select v-model="queryParam2.status" placeholder="请选择" default-value="0">
                    <a-select-option :key="s.id" v-for="s in option">{{ s.value }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="积分时间">
                    <a-date-picker v-model="queryParam2.Startdate" style="width: 100%" placeholder="请选择更新时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="有效时间">
                    <a-date-picker v-model="queryParam2.Startdate" style="width: 100%" placeholder="请选择更新时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || 24" :sm="24">
                  <span
                    class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                    <a-button type="primary" @click="$refs.table2.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParam2 = {}">重置</a-button>
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
          <a-card
            hoverable
            style="width: 300px;margin-bottom: 15px"
          >
            <a-card-meta
              title="总积分"
              description="12">
              <a-avatar slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png" />
            </a-card-meta>
          </a-card>
          <a-button type="primary" @click="openMol">修改积分</a-button>
        </div>
        <s-table
          ref="table2"
          size="default"
          rowKey="id"
          :columns="tab2columns"
          :data="goPagetab2"
          showPagination="auto"
        >
        </s-table>
        <a-modal
          title="修改积分"
          v-model="visible"
        >
          <template slot="footer" >
            <a-button key="back" @click="visible=false" >取消</a-button>
            <a-button key="submit" type="primary" @click="handleSubmit">
              确定
            </a-button>
          </template>
          <a-card :bordered="false">
            <a-form :form="form">
              <a-form-item
                label="类型"
                :labelCol="{lg: {span: 5}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 19}, sm: {span: 17} }"
              >
                <a-radio-group v-decorator="['type',{initialValue: 0}]" >
                  <a-radio value="0">
                    加积分
                  </a-radio>
                  <a-radio value="1">
                    减积分
                  </a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="会员昵称"
                           :labelCol="{lg: {span: 5}, sm: {span: 7}}"
                           :wrapperCol="{lg: {span: 19}, sm: {span: 17} }">
                大叔的哈苏
              </a-form-item>
              <a-form-item label="剩余积分"
                           :labelCol="{lg: {span: 5}, sm: {span: 7}}"
                           :wrapperCol="{lg: {span: 19}, sm: {span: 17} }">
                191
              </a-form-item>
              <a-form-item label="修改值"
                           :labelCol="{lg: {span: 5}, sm: {span: 7}}"
                           :wrapperCol="{lg: {span: 19}, sm: {span: 17} }"
                           :validate-status="number.validateStatus"
                           :help="number.errorMsg || tips">
                <a-input-number
                  :value="number.value"
                  :min="8"
                  :max="12"
                  @change="handleNumberChange"
                />
              </a-form-item>
              <a-form-item label="备注"
                           :labelCol="{lg: {span: 5}, sm: {span: 7}}"
                           :wrapperCol="{lg: {span: 19}, sm: {span: 17} }">
                <a-textarea v-decorator="['desc']"></a-textarea>
              </a-form-item>


            </a-form>
          </a-card>
        </a-modal>
      </a-tab-pane>
      <a-tab-pane tab="我的课程" key="3">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="输入搜索">
                  <a-input v-model="queryParam3.id" placeholder="标题"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="分类">
                  <a-select v-model="queryParam3.status" placeholder="请选择" default-value="0">
                    <a-select-option :key="s.id" v-for="s in option">{{ s.value }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="知识点">
                    <a-select v-model="queryParam3.zsd" placeholder="请选择" default-value="0">
                      <a-select-option :key="l.id" v-for="l in option">{{ l.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="思维方式">
                    <a-select v-model="queryParam3.swfs" placeholder="请选择" default-value="0">
                      <a-select-option :key="b.id" v-for="b in option">{{ b.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="数学素养">
                    <a-select v-model="queryParam3.sxsy" placeholder="请选择" default-value="0">
                      <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="状态">
                    <a-select v-model="queryParam3.zt" placeholder="请选择" default-value="0">
                      <a-select-option :key="b.id" v-for="b in option">{{ b.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="更新时间">
                    <a-date-picker v-model="queryParam3.Startdate" style="width: 100%" placeholder="请选择更新时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || 24" :sm="24">
                  <span
                    class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                    <a-button type="primary" @click="$refs.table3.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParam3 = {}">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                    </a>
                  </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <s-table
          ref="table3"
          size="default"
          rowKey="id"
          :columns="tab3columns"
          :data="goPagetab3"
          showPagination="auto"
        >
          <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
          </span>
          <span slot="action" slot-scope="text, record, index">
        <template>
          <a title="查看" @click="handleLook(text, record, index)"><a-icon type="search" /></a>
        </template>
      </span>
        </s-table>
      </a-tab-pane>
      <a-tab-pane tab="错题剖析" key="4">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="输入搜索">
                  <a-input v-model="queryParam4.id" placeholder="标题"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="城市">
                  <a-select v-model="queryParam4.status" placeholder="请选择" default-value="0">
                    <a-select-option :key="s.id" v-for="s in option">{{ s.value }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <template v-if="advanced">
                <a-col :md="8" :sm="24">
                  <a-form-item label="年份">
                    <a-select v-model="queryParam4.status" placeholder="请选择" default-value="0">
                      <a-select-option :key="s.id" v-for="s in option">{{ s.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="数学素养">
                    <a-select v-model="queryParam4.sxsy" placeholder="请选择" default-value="0">
                      <a-select-option :key="c.id" v-for="c in option">{{ c.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="题号">
                    <a-select v-model="queryParam4.status" placeholder="请选择" default-value="0">
                      <a-select-option :key="s.id" v-for="s in option">{{ s.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="分类">
                    <a-select v-model="queryParam4.status" placeholder="请选择" default-value="0">
                      <a-select-option :key="s.id" v-for="s in option">{{ s.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="思维方式">
                    <a-select v-model="queryParam4.swfs" placeholder="请选择" default-value="0">
                      <a-select-option :key="b.id" v-for="b in option">{{ b.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="知识点">
                    <a-select v-model="queryParam4.zsd" placeholder="请选择" default-value="0">
                      <a-select-option :key="l.id" v-for="l in option">{{ l.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="状态">
                    <a-select v-model="queryParam4.zt" placeholder="请选择" default-value="0">
                      <a-select-option :key="b.id" v-for="b in option">{{ b.value }}</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="更新时间">
                    <a-date-picker v-model="queryParam4.Startdate" style="width: 100%" placeholder="请选择更新时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="!advanced && 8 || 24" :sm="24">
                  <span
                    class="table-page-search-submitButtons"
                    :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                    <a-button type="primary" @click="$refs.table4.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParam4 = {}">重置</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 8px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                    </a>
                  </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <s-table
          ref="table4"
          size="default"
          rowKey="id"
          :columns="tab4columns"
          :data="goPagetab4"
          showPagination="auto"
        >
          <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
          </span>
          <span slot="action" slot-scope="text, record, index">
        <template>
          <a title="播放预览" @click="handleLook(text, record, index)"><a-icon type="video-camera" /></a>
        </template>
      </span>
        </s-table>
      </a-tab-pane>
      <a-tab-pane tab="历史测评" key="5">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="输入搜索">
                  <a-input v-model="queryParam5.id" placeholder="会员账号\昵称\测评名称"/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="测评时间">
                  <a-date-picker v-model="queryParam5.Startdate" style="width: 100%" placeholder="请选择更新时间" format="YYYY-MM-DD HH:mm:ss" :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"/>
                </a-form-item>
              </a-col>
              <a-col>
                  <span class="table-page-search-submitButtons">
                    <a-button type="primary" @click="$refs.table5.refresh(true)">查询</a-button>
                    <a-button style="margin-left: 8px" @click="() => queryParam5 = {}">重置</a-button>
                  </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <s-table
          ref="table5"
          size="default"
          rowKey="id"
          :columns="tab5columns"
          :data="goPagetab5"
          showPagination="auto"
        >
          <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
          </span>
          <span slot="action" slot-scope="text, record, index">
        <template>
          <a title="查看" @click="handleLook(text, record, index)"><a-icon type="search" /></a>
        </template>
      </span>
        </s-table>
      </a-tab-pane>
    </a-tabs>

  </a-card>
  </div>
</template>

<script>
  // import { PageView } from '@/layouts'
  import { STable,Ellipsis } from '@/components'
  import DetailList from '@/components/tools/DetailList'
  import { getListMemberDet,getListMemberTab1,getListMemberTab2,getListMemberTab3,getListMemberTab4,getListMemberTab5} from '@/api/listMember'
  const DetailListItem = DetailList.Item
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

  function validatePrimeNumber (number) {
    if (number === 11) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    }
    return {
      validateStatus: 'error',
      errorMsg: 'The prime between 8 and 12 is 11!',
    };
  }
  export default {
    name:'ListMemberEdit',
    components: {
      // PageView,
      DetailList,
      DetailListItem,
      STable,
      Ellipsis
    },
    data () {
      return {
        form: this.$form.createForm(this),
        number: {
          value: 0,
        },
        tips: '只能输入数字，仅支持整数，最小填1',
        option: [{ id: 1, value: "例1" }, { id: 2, value: "例2" }, { id: 3, value: "例3" }],
        // 高级搜索 展开/关闭
        advanced: false,
        visible:true,
        // tab查询参数
        queryParam1: {},
        queryParam2: {},
        queryParam3: {},
        queryParam4: {},
        queryParam5: {},
        disabled: true,
        id: '',
        details: {},
        // 表头tab1
        tab1columns: [
      {
            title: '订单编号',
            dataIndex: 'ddbh'
          },
          {
            title: '商品',
            dataIndex: 'img',
            customRender: text => < img alt = "轮播图片" style = "width: 50px;height: 50px" src = { text } />
      },

        {
          title: '订单状态',
          dataIndex: 'ddzt'
        },
        {
          title: '支付状态',
          dataIndex: 'zfzt'
        },
        {
          title: '订单总额',
          dataIndex: 'ze'
        },
        {
          title: '创建时间',
          dataIndex: 'cjTime'
          // sorter: true
        },
        {
          title: '支付时间',
          dataIndex: 'zfTime'
          // sorter: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '150px',
          scopedSlots: { customRender: 'action' }
        }
        ],
      tab2columns: [
        {
          title: '积分来源',
          dataIndex: 'ly'
        },
        {
          title: '积分变化',
          dataIndex: 'bh'
        },
        {
          title: '时间',
          dataIndex: 'sj'
        },
        {
          title: '有效期',
          dataIndex: 'yxq'
        },
        {
          title: '备注',
          dataIndex: 'bz'
        }
      ],
      tab3columns: [
        {
          title: '名称',
          dataIndex: 'title'
        },
        {
          title: '图片',
          dataIndex: 'img',
          customRender: text => <img alt="轮播图片" style="width: 50px;height: 50px" src={text} />
    },
      {
        title: '价格',
          dataIndex: 'price'
      },
      {
        title: '分类',
          dataIndex: 'type'
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
        title: '浏览量',
          dataIndex: 'browse'
      },
      {
        title: '状态',
          dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
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
      tab4columns: [
        {
          title: '名称',
          dataIndex: 'title'
        },
        {
          title: '城市',
          dataIndex: 'cs'
        },
        {
          title: '年份',
          dataIndex: 'nf'
        },
        {
          title: '题号',
          dataIndex: 'th'
        },
      {
        title: '价格',
          dataIndex: 'price'
      },
      {
        title: '分类',
          dataIndex: 'type'
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
        title: '浏览量',
          dataIndex: 'browse'
      },
      {
        title: '状态',
          dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '更新时间',
          dataIndex: 'updateTime'
      },
      {
        title: '操作',
          dataIndex: 'action',
        width: '50px',
        scopedSlots: { customRender: 'action' }
      }
    ],
        tab5columns: [
        {
          title: '测评名称',
          dataIndex: 'title'
        },
        {
          title: '用时',
          dataIndex: 'ys'
        },
        {
          title: '测评结果等级',
          dataIndex: 'dj'
        },
        {
          title: '测评时间',
          dataIndex: 'cpTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '50px',
          scopedSlots: { customRender: 'action' }
        }
      ],
    }
    },
    mounted () {
      // 查询基本信息
      this.id = this.$route.query.id
      const params = {}
      params['id'] = this.id
      getListMemberDet(params).then(res => {
        console.log(res.result.data)
        this.details = res.result.data;
        // this.form.setFieldsValue({status:this.details.status});
      })
    },
    methods: {
      openMol(){
        this.visible = true;
      },

      handleNumberChange (value) {
        this.number = {
          // ...validatePrimeNumber(value),
          value:value
        };
      },
      handleSubmit(){},
      moment,
      goPagetab1 (parameter) {
        return getListMemberTab1(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      goPagetab2 (parameter) {
        return getListMemberTab2(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      goPagetab3 (parameter) {
        // console.log(this.queryParam)
        return getListMemberTab3(Object.assign(parameter)).then(res => {
          console.log(res)
          return res.result
        })
      },
      goPagetab4 (parameter) {
        // console.log(this.queryParam)
        return getListMemberTab4(Object.assign(parameter)).then(res => {
          console.log(res)
          return res.result
        })
      },
      goPagetab5 (parameter) {
        // console.log(this.queryParam)
        return getListMemberTab5(Object.assign(parameter)).then(res => {
          console.log(res)
          return res.result
        })
      },
      // tab切换
      callback (key) {
        console.log(key)
      },
      // 搜索展开关闭
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
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
<style scoped>
  .card{
    margin-bottom: 24px;
  }
</style>