<template>
  <div class="dashboard">
    <h1 class="title text-center">简易记账本</h1>
    <div class="flex-h-v-c">
      <div class="filter-btns ac-card">
        <span>按月筛选：</span>
        <el-select v-model="billsQuery.time">
          <el-option v-for="(item, index) in months" :key="index" :label="item" :value="index + 1">
          </el-option>
        </el-select>
        <el-button class="m-l-15" size="medium" type="primary" @click="billFormVisible = true"
          >添加</el-button
        >
      </div>
    </div>
    <div class="bill-wrap flex-h-c m-t-10">
      <ul class="bill-list ac-card">
        <h2>2019年账单：</h2>
        <li v-for="(item, index) in bills" :key="index">
          <span>时间：{{ item.time | timestampToString }}；</span>
          <span>类型：{{ item.type === '1' ? '收入' : '支出' }}；</span>
          <span>分类：{{ item.category }}；</span>
          <span>金额：{{ item.amount }}</span>
        </li>
      </ul>
    </div>

    <el-dialog title="添加账单" :visible.sync="billFormVisible" :click-modal="false" width="400px">
      <el-form :model="billForm" :rules="billRules" ref="ruleForm" label-width="100px">
        <el-form-item label="分类:" prop="type">
          <el-radio v-model="billForm.type" label="1">收入</el-radio>
          <el-radio v-model="billForm.type" label="0">支出</el-radio>
        </el-form-item>
        <el-form-item label="时间:" prop="time">
          <el-date-picker
            v-model="billForm.time"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            value-format="timestamp"
            placeholder="选择日期时间"
            style="width: 222px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="类型:" prop="type">
          <el-select v-model="billForm.category" placeholder="请选择账单类型" style="width: 222px">
            <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="金额:" prop="amount">
          <el-input
            type="number"
            v-model="billForm.amount"
            placeholder="账单金额"
            style="width: 222px"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="billFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="billFormVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBill } from 'api/bill.api';
import { getCategory } from 'api/category.api';

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      bills: [],
      category: [],
      billFormVisible: false,
      billForm: {
        time: '',
        type: '1',
        category: '',
        amount: ''
      },
      billsQuery: {
        mouth: 1
      },
      billRules: {},
      months: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月'
      ]
    };
  },
  created() {
    this.getBill();
    this.getCategory();
  },
  methods: {
    async getBill() {
      this.bills = await getBill(this.billsQuery);
    },
    async getCategory() {
      this.category = await getCategory();
    }
  }
};
</script>
<style lang="scss" scoped>
.dashboard {
  background: #f9f9fb;
  .title {
    margin: 10px 0;
  }

  .bill-list {
    overflow-y: auto;
    width: 750px;
    height: 600px;
  }
}
</style>
