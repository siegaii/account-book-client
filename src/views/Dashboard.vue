<template>
  <div class="dashboard">
    <h1 class="title text-center">简易记账本</h1>
    <div class="flex-h-v-c">
      <div class="filter-btns ac-card ">
        <span>年份：</span>
        <el-date-picker
          class="m-r-15"
          v-model="billsQuery.year"
          format="yyyy"
          type="year"
          placeholder="请选择年份"
          style="width: 150px"
          @change="getBill"
        />
        <template v-if="billsQuery.year">
          <span>月份：</span>
          <el-select v-model="billsQuery.mouth" @change="getBill" style="width: 150px">
            <el-option
              v-for="(item, index) in months"
              :key="index"
              :label="item"
              :value="index + 1"
            />
          </el-select>
        </template>
        <span class="m-l-15">分类：</span>
        <el-select
          v-model="billsQuery.category"
          @change="getBill"
          class="m-r-15"
          style="width: 160px"
        >
          <el-option v-for="item in category" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>

        <span>排序：</span>
        <el-select
          v-model="billsQuery.amountSort"
          @change="getBill"
          class="m-r-15"
          style="width: 180px"
          placeholder="对金额排序"
        >
          <el-option label="无排序" :value="0" />
          <el-option label="升序" :value="1" />
          <el-option label="降序" :value="-1" />
        </el-select>
        <el-button size="medium" type="primary" @click="billFormVisible = true">
          添加
        </el-button>
      </div>
    </div>
    <div class="flex-h-v-c">
      <div class="statistical m-t-10 ac-card">
        <strong class="m-r-30">
          {{ months[billsQuery.mouth - 1] }}{{ getCategoryName(billsQuery.category) }}统计
        </strong>
        <span class="m-r-15">收入：{{ this.incomeStatistics }}</span>
        <span>支出：{{ this.spendingStatistics }}</span>
      </div>
    </div>
    <div class="bill-wrap flex-h-c m-t-10">
      <div class="bill-list ac-card">
        <el-table :data="bills" style="width: 100%">
          <el-table-column prop="time" label="时间" width="width">
            <template slot-scope="scope">
              {{ scope.row.time | timestampToString }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="width">
            <template slot-scope="scope">
              {{ scope.row.type === '1' ? '收入' : '支出' }}
            </template>
          </el-table-column>
          <el-table-column prop="category" label="分类" width="width"> </el-table-column>
          <el-table-column prop="amount" label="金额" width="width"> </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog
      title="添加账单"
      :visible.sync="billFormVisible"
      :click-modal="false"
      @close="resetForm"
      width="400px"
    >
      <el-form :model="billForm" :rules="billRules" ref="billForm" label-width="100px">
        <el-form-item label="类型:" prop="type">
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
        <el-form-item label="分类:" prop="category">
          <el-select v-model="billForm.category" placeholder="请选择账单分类" style="width: 222px">
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
        <el-button type="primary" @click="submitBillForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getBill, postBill } from 'api/bill.api';
import { getCategory } from 'api/category.api';

export default {
  name: 'Dashboard',
  components: {},
  data() {
    const validateAmount = (rule, value, callback) => {
      const float = value.toString().split('.')[1];
      if (float && float.length > 2) {
        callback(new Error('保留两位小数'));
      } else {
        callback();
      }
    };
    return {
      bills: [],
      category: [],
      billFormVisible: false,
      billForm: {
        time: '',
        type: '',
        category: '',
        amount: ''
      },
      billsQuery: {
        year: 1546300800000,
        mouth: '',
        category: '',
        amountSort: 0 // 0 不排序，1 升序， 2 降序
      },
      billRules: {
        time: [{ type: 'date', required: true, message: '请选择账单时间', trigger: 'change' }],
        type: [{ required: true, message: '请选择账单分类', trigger: 'change' }],
        category: [{ required: true, message: '请选择账单类型', trigger: 'change' }],
        amount: [
          { required: true, message: '请输入账单金额', trigger: 'change' },
          { validator: validateAmount, trigger: 'change' }
        ]
      },
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
  computed: {
    incomeStatistics() {
      let sum = 0;
      this.bills.map((item) => {
        if (item.type === '1') {
          sum += Number(item.amount);
        }
      });
      return sum;
    },
    spendingStatistics() {
      let sum = 0;
      this.bills.map((item) => {
        if (item.type === '0') {
          sum += Number(item.amount);
        }
      });
      return sum;
    }
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
    },
    getCategoryName(id) {
      const category = this.category.find((item) => item.id === id);
      return category ? category.name : '';
    },
    submitBillForm() {
      this.$refs['billForm'].validate(async (valid) => {
        if (valid) {
          try {
            await postBill(this.billForm);
            this.$message.success('添加账单成功');
            this.getBill();
          } catch (err) {
            this.$message.error('添加账单失败');
          } finally {
            this.billFormVisible = false;
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
      this.$refs['billForm'].resetFields();
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
