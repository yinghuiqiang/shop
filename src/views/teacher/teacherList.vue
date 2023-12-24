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
          <p><span>姓名：</span><strong>{{ item.teacherName }}</strong></p>
          <p><span>年龄：</span><strong>{{ item.age }}</strong></p>
          <p><span>性别：</span><strong>{{ item.gender == 1 ? '男' : "女" }}  </strong></p>
          <p><span>所属课程：</span><strong v-for="item1 in item.classList">{{ item1.className }}</strong></p>
          <p><span>个人介绍：</span>{{ item.introduction }}</p>
        </div>
      </div>
    </div>

    <!-- <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="头像">
        <template #default="scope">
          <div v-if="scope.row.avatar">
            <el-avatar
              :size="50"
              :src="'http://localhost:4545' + scope.row.avatar"
            ></el-avatar>
          </div>
          <div v-else>
            <el-avatar
              :size="50"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="角色">
        <template #default="scope">
          <div v-if="scope.row.role == 1">
            <el-tag type="danger">管理员</el-tag>
          </div>
          <div v-else-if="scope.row.role == 2">
            <el-tag type="success">系统员工</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            confirmButtonText="确定"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="这是一段内容确定删除吗？"
            @confirm="confirmEvent(scope.row)"
          >
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table> -->
    <el-dialog :title="`更新用户信息`" v-model="dialogVisible">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="updateForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input
            type="password"
            v-model="updateForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="80px" prop="gender">
          <el-select
            style="width: 100%"
            v-model="updateForm.gender"
            placeholder="请选择性别"
          >
            <el-option
              v-for="item in optionsGender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域" label-width="80px" prop="role">
          <el-select
            style="width: 100%"
            v-model="updateForm.role"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="个人简介" label-width="80px" prop="introduction">
          <el-input
            type="textarea"
            v-model="updateForm.introduction"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateUserInfo">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, reactive } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'
import { getTeacherList, findUserById, deleteUserById,changeUserInfoById, } from '@/api'
const tableData = ref([])
const store = useStore()
onMounted(() => {
  getTableData()
})

const options = [
  {
    label: '管理员',
    value: 1,
  },
  {
    label: '系统员工',
    value: 2,
  },
]
// 性别
const optionsGender = [
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
]

const updateFormRules = reactive({
  username: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  gender: [{ required: true, message: '请选择权限', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
})
const updateFormRef = ref()

const dialogVisible = ref(false)
const updateForm = reactive({
  username: '',
  role: 2,
  password: '',
  introduction: '',
  gender: store.state.userInfo.gender ? store.state.userInfo.gender : 2,
})

const getTableData = async () => {
  const result = await getTeacherList()
  // console.log(result,"@@@@@@@@@@@@@@@@");
  if (result.length >= 0) {
    tableData.value = result
  }
}

const handleEdit = async (row) => {
  const result = await findUserById({ _id: row._id })
  console.log(result)
  if (result.length == 1) {
    Object.assign(updateForm, result[0])
  }
  dialogVisible.value = true
}

const confirmEvent = async (row) => {
  const result = await deleteUserById({
    _id: row._id,
  })
  if (result.message == 'success') {
    ElMessage.success({
      message: '删除成功',
      type: 'success',
    })
    getTableData()
  }
}

const updateUserInfo = async () => {
  // await axios.put
  updateFormRef.value.validate(async (vaild) => {
    console.log(updateForm);
    if (vaild) {
      const result = await changeUserInfoById(updateForm)
      // console.log(result);
      if (result) {
        ElMessage.success({
          message: '更新成功',
          type: 'success',
        })
        dialogVisible.value = false
        getTableData()
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.teacherList{
  width: 100%;
  height: 100px;
  margin-top: 15px;
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
          text-align: right;
          display: inline-block;
        }
      }
    }
  }
}
</style>
