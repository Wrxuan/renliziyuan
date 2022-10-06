<template>
  <div class="departments-container">
    <el-card>
      <tree-tools :tree-node="company" :is-root="false" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <tree-tools slot-scope="{ data }" :tree-node="data" @addDept="handelAddDept" />
    </el-tree>
    <add-dept :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import treeTools from './components/tree-tools.vue'
import { tranListToTreeData } from '@/utils'
import addDept from './components/add-dept.vue'
export default {
  components: { treeTools, addDept },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      dialogVisible: false,
      currentNode: {}
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const { depts, companyManage, companyName } = await getDepartments()
      this.departs = tranListToTreeData(depts, '')
      console.log(this.departs)
      this.company = { name: companyName, menager: companyManage, id: '' }
    },
    handelAddDept(node) {
      this.dialogVisible = true
      this.currentNode = node
      console.log(this.currentNode)
    }
  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        padding-right: 20px;
      }
    }
  }
  </style>
