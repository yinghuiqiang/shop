<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>幼儿早期教育管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumbTitle">课程列表</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" style="width: 100%" stripe >
      <el-table-column label="课程名称" prop="className"></el-table-column>
      <el-table-column label="课程编码" prop="_id">
      </el-table-column>
      <el-table-column label="课程logo">
        <template #default="scope">
          <div v-if="scope.row.classLogo">
            <el-avatar
              :size="50"
              :src="'http://localhost:4545' + scope.row.classLogo"
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
      <el-table-column width="500" label="课程介绍"  prop="description">
            <template #default="scope">
                <div class="introduction">
                    {{ scope.row.description }}
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
    </el-table>
    <el-dialog :title="`更新课程信息`" v-model="dialogVisible">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
        <el-form-item label="课程名称" label-width="80px" prop="className">
          <el-input v-model="updateForm.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍" label-width="80px" prop="description">
          <el-input
            type="textarea"
            v-model="updateForm.description"
            row="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程logo" label-width="80px" prop="classLogo">
                <upload
                  :avatar="updateForm.classLogo"
                  @avatarChange="uploadHandler"
                ></upload>
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
import uploadFn from '@/util/upload'
import upload from '@/components/upload/upload.vue'
// import { getUserList, findUserById, deleteUserById,changeUserInfoById } from '@/api'
import { getCourseList,deleteCourseById,findCourseById,changeCourseById} from '@/api'
const tableData = ref([])
const store = useStore()
onMounted(() => {
  getTableData()
})

const updateFormRules = reactive({
  className: [{ required: true, message: '请输入名字', trigger: 'blur' }],
  description: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
})
const updateFormRef = ref()

const dialogVisible = ref(false)
const updateForm = reactive({
  className: '',
  description: '',
  classLogo:'',
  file:null
})

const getTableData = async () => {
  const result = await getCourseList()
  if (result.length >= 0) {
    tableData.value = result
  }
}

// 点击编辑按钮。打开弹出框
const handleEdit = async (row) => {
  const result = await findCourseById({ _id: row._id })
  console.log(updateForm, result,"@@@@@@@@@@@@");
  if (result) {
    Object.assign(updateForm, result)
  }
  dialogVisible.value = true
}

// 删除课程
const confirmEvent = async (row) => {
  const result = await deleteCourseById({
    _id: row._id,
  })
  if (result.message == 'success') {
    console.log(111111);
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
      const result = await changeCourseById(updateForm)
      console.log(result,"result");
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
const uploadHandler = (file) => {
  // console.log(file);
  // 将文件转码为url格式
  updateForm.classLogo = URL.createObjectURL(file)
  updateForm.file = file
}
</script>
