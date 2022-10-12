<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <!-- <svg-icon iconClass="eye-open"></svg-icon> -->
    <!-- <UploadExcel :before-upload="beforeUpload" :on-success="handleSuccess" /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import UploadExcel from '@/components/UploadExcel/index.vue'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }, // created() {
  //   this.$store.dispatch('user/getUserInfo')
  // }

  // components: { UploadExcel },
  methods: {
    // handleSuccess(data) {
    //   console.log('data', data)
    // },
    // beforeUpload(file) {
    //   console.log(file)
    //   if (file.size > 9 * 1024) {
    //     this.$message.error('to Big')
    //     return false
    //   }
    //   return true
    // }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
