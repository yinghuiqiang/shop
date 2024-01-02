<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>幼儿早期教育管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumbTitle">幼儿管理</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column label="幼儿编码" prop="_id"></el-table-column>
      <el-table-column label="姓名" prop="babyName"></el-table-column>
      <el-table-column label="年龄" prop="age"> </el-table-column>
      <el-table-column label="性别" prop="gender">
        <template #default="scope">
          <div>
            {{ scope.row.gender == 1 ? '男' : '女' }}
          </div>
        </template>
      </el-table-column>
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
      <el-table-column label="个人介绍" prop="introduction">
        <template #default="scope">
          <div class="introduction">
            {{ scope.row.introduction }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="所属课程" prop="classList">
        <template #default="scope">
          <p v-for="item in scope.row.classList">
            {{ item.className }}
          </p>
        </template>
      </el-table-column>
      <el-table-column width="300" label="操作" style="padding-left: 50px">
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

    <el-dialog :title="`更新幼儿信息`" v-model="dialogVisible">
      <el-form :model="updateForm" :rules="updateFormRules" ref="updateFormRef">
        <el-form-item label="姓名" label-width="80px" prop="teacherName">
          <el-input v-model="updateForm.babyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" label-width="80px" prop="age">
          <el-select
            style="width: 100%"
            v-model="updateForm.age"
            placeholder="请选择年龄"
          >
            <el-option
              v-for="(item, index) in optionsAge"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
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
        <el-form-item label="添加课程" label-width="80px" prop="classCode">
          <el-select
            v-model="updateForm.classCode"
            multiple
            collapse-tags
            collapse-tags-tooltip
            :max-collapse-tags="7"
            placeholder="请添加课程"
            style="width: 100%"
          >
            <el-option
              v-for="item in classList"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="个人介绍" label-width="80px" prop="introduction">
          <el-input
            type="textarea"
            v-model="updateForm.introduction"
            row="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="教师" label-width="80px" prop="avatar">
          <upload
            :avatar="updateForm.avatar"
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
import { getBabyList, getCourseList, findBabyById, deleteBabyById,changeBabyById } from '@/api'
// import { getTeacherList, findTeacherById,getCourseList,changeTeacherById } from '@/api'
const tableData = ref([])
const store = useStore()
onMounted(() => {
  getTableData()
})

const updateFormRules = reactive({
  babyName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  introduction: [{ required: true, message: '请输入介绍', trigger: 'blur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'change' }],
  gender: [{ required: true, message: '请输入性别', trigger: 'change' }],
})
const updateFormRef = ref()

const dialogVisible = ref(false)
const updateForm = reactive({
  babyName: '',
  age: null,
  gender: null,
  avatar: '',
  introduction: '',
  classCode: [],
  classList: [],
  file: null,
})
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
const optionsAge = []
for (let i = 0; i <= 15; i++) {
  optionsAge.push(i)
}

const getTableData = async () => {
  const result = await getBabyList()
  console.log(result)
  if (result.length >= 0) {
    tableData.value = result
  }
}

// 点击编辑按钮。打开弹出框
const handleEdit = async (row) => {
  const result = await findBabyById({ _id: row._id })
  console.log(result, '@@@@@@@@@@@@')
  if (result) {
    Object.assign(updateForm, result)
    result.classList.forEach((item) => {
      updateForm.classCode.push(item.classCode)
    })
  }
  console.log(updateForm)
  dialogVisible.value = true
}

// 删除课程
const confirmEvent = async (row) => {
  const result = await deleteBabyById({
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
    if (vaild) {
      console.log(updateForm);
      const result = await changeBabyById(updateForm)
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
  updateForm.avatar = URL.createObjectURL(file)
  updateForm.file = file
}
const classList = ref([])
onMounted(async () => {
  const result = await getCourseList()
  if (result.length >= 0) {
    result.forEach((item) => {
      let classItem = {
        classId: item._id,
        className: item.className,
      }
      classList.value.push(classItem)
    })
  }
})
</script>

<style lang="scss" scoped>
.introduction {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  // width: 200px;
}
</style>
