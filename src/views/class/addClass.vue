<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>幼儿早期教育管理系统</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">
        <span class="breadcrumbTitle">添加课程</span>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-form
      :model="addCourseForm"
      :rules="addCourseRules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="课程名称" prop="className">
        <el-input v-model="addCourseForm.className"></el-input>
      </el-form-item>
      <el-form-item label="课程介绍" prop="description">
        <el-input
          type="textarea"
          v-model="addCourseForm.description"
          rows="6"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程logo" prop="avatar">
        <upload
          :avatar="addCourseForm.classLogo"
          @avatarChange="uploadHandler"
        ></upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">添加课程</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import upload from '@/components/upload/upload.vue'
import { ElMessage } from 'element-plus'
import uploadFn from '@/util/upload'
import { addCourse } from '@/api'

const ruleForm = ref()

const addCourseForm = reactive({
  className: '',
  description: '',
  classLogo: '',
  file: null,
})

const addCourseRules = reactive({
  className: [
    { required: true, message: '请输入课程名称', trigger: 'blur' },
    {
      min: 2,
      max: 20,
      message: '长度在 2 到 20 个字符',
      trigger: 'blur',
    },
  ],
  description: [{ required: true, message: '请输入课程描述', trigger: 'blur' }],
  classLogo: [{ required: true, message: '请添加课程logo', trigger: 'blur' }],
})

const submitForm = () => {
  ruleForm.value.validate(async (valid) => {
    if (valid) {
      const result = await addCourse(addCourseForm);
      console.log(result);
      if (result.message = 'success') {
        ElMessage.success({
          message: "添加课程成功",
          type: "success"
        });
        addCourseForm.className = "";
        addCourseForm.description = "";
        addCourseForm.classLogo = "";
      }
      console.log(addCourseForm)
    }
  })
}

const uploadHandler = (file) => {
  // console.log(file);
  addCourseForm.classLogo = URL.createObjectURL(file)
  addCourseForm.file = file
}
</script>

<style scope lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.demo-ruleForm {
  margin-top: 50px;
}
</style>
