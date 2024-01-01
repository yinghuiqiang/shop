<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>幼儿早期教育管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumbTitle">教师列表</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="teacherList">
      <div class="teacherItem" v-for="item in tableData">
        <img :src="`http://localhost:4545${item.avatar}`" alt="">
        <div class="info">
          <p><span>姓名：</span><strong>{{ item.babyName }}</strong></p>
          <p><span>年龄：</span><strong>{{ item.age }}</strong></p>
          <p><span>性别：</span><strong>{{ item.gender == 1 ? '男' : "女" }}  </strong></p>
          <p><span>家长姓名：</span><strong>{{ item.partiarchName }}（{{item.patriarchPhone}}）</strong></p>
          <p><span>所属课程：</span><strong v-for="item1 in item.classList">《{{ item1.className }}》</strong></p>
          <p><span>个人介绍：</span>{{ item.introduction }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getBabyList} from '@/api'
const tableData = ref([])
const store = useStore()
onMounted(() => {
  getTableData()
})

const getTableData = async () => {
  const result = await getBabyList()
  if (result.length >= 0) {
    tableData.value = result
  }
}
</script>

<style lang="scss" scoped>
.teacherList{
  width: 100%;
  margin: 30px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .teacherItem{
    width: calc(33% - 15px);
    box-shadow: 0 20px 50px rgba(24, 18, 14, 0.5);;
    margin-bottom: 25px;
    img{
      width: 100%;
      height: 250px;
    }
    .info{
      padding: 10px 15px;
      p{
        margin-bottom: 8px;
        line-height: 1.8;
        span{
          width: 80px;
          text-wrap: wrap;
          text-align: right;
          display: inline-block;
        }
      }
    }
  }
}
</style>
