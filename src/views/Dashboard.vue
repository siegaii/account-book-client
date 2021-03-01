<template>
  <div class="dashboard">
    <h1>dashboard</h1>
  </div>
</template>

<script>
import { getBill } from 'api/bill.api';

export default {
  name: 'Dashboard',
  components: {},
  created() {
    getBill();
  },
  methods: {
    async getBill() {
      const data = await getBill();
      console.log('data: ', data);
    }
  }
};
</script>
