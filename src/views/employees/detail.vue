<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 数据同步视图 -->
        <!-- 视图同步数据 -->
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane label="登录账户设置" lazy name="first">
            <el-form ref="form" :model="accountInfo" :rules="accountInfoRules" label-width="80px">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="accountInfo.username" />
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="accountInfo.password" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployloyees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" lazy name="second">
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" lazy name="third">
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user.js'
import UserInfo from './compoents/user-info.vue'
import JobInfo from './compoents/job-info.vue'
import Cookies from 'js-cookie'
export default {
  components: { UserInfo, JobInfo },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {},
      accountInfoRules: {
        username: [{ required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度2-10位', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '密码长度最小6位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadEmployessInfo()
  },
  methods: {
    async loadEmployessInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accountInfo = res
      console.log(res)
    },
    async updateEmployloyees() {
      try {
        await this.$refs.form.validate()
        await saveUserDetailById(this.accountInfo)
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      }
    },
    tabClick() {
      Cookies.set('activeName', this.activeName)
    }
  }
}
</script>

<style>

</style>
