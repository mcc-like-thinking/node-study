<template>
  <div class="app-container">
    <el-form class="filter-form" :inline="true" :model="query" ref="queryForm">
      
      <el-form-item label="名称" prop="title">
        <el-input v-model="mcc" placeholder="mcc" clearable></el-input>
      </el-form-item>
      
      <el-form-item label="名称" prop="title">
        <el-input v-model="scc" placeholder="scc" clearable></el-input>
      </el-form-item>
      
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "form",
    data() {
      return {
        query: {
          pageNum: 1,
          pageSize: 10
        }
      }
    }
  }
</script>