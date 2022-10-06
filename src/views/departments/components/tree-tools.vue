<template>
  <el-row type="flex" justify="space-around" align="middle" style="height:40px;width: 100%;">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex">
        <span style="margin-right:16px">{{ treeNode.manager }}</span>
        <el-dropdown @command="handleCommand">
          <span>
            操作<i class="el-icon-arrow-down el-icon--right" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="add">添加子部门</el-dropdown-item>
            <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
            <el-dropdown-item v-if="isRoot" command="del">删除部门</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleCommand(type) {
      console.log(type)
      if (type === 'add') {
        this.$emit('addDept', this.treeNode)
        // console.log(this.treeNode)
      } else if (type === 'edit') {
        this.$emit('editDept', this.treeNode)
        //
      } else {
        //
        this.$confirm('是否确认删除该部门', '提示', {
          type: 'warning'
        }).then(async res => {
          return delDepartments(this.treeNode.id)
        }).then(res => {
          this.$message.success('删除成功')
          this.$emit('refreshList')
        })
      }
    }
  }
}
</script>

<style>

</style>
