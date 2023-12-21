<template>
  <el-aside :width="$store.state.isCollapse ? '64px' : '200px'">
    <el-menu
      :default-active="route.path"
      :router="true"
      :collapse-transition="false"
      :collapse="$store.state.isCollapse"
    >
      <el-menu-item index="/home">
        <el-icon>
          <home-filled />
        </el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-menu-item index="/center">
        <el-icon>
          <avatar />
        </el-icon>
        <template #title>个人中心</template>
      </el-menu-item>
      <el-sub-menu index="/user" v-if="store.state.userInfo.role == 1">
        <template #title>
          <el-icon>
            <user-filled />
          </el-icon>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addUser">添加用户</el-menu-item>
          <el-menu-item index="/userList">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/baby">
        <template #title>
          <el-icon><Watermelon /></el-icon>
          <span>幼儿管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addBaby">添加幼儿</el-menu-item>
          <el-menu-item index="/babyList">幼儿管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/class">
        <template #title>
          <el-icon><Reading /></el-icon>
          
          <span>课程管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addClass">添加课程</el-menu-item>
          <el-menu-item index="/classList">课程管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="/teacher">
        <template #title>
          <el-icon><Tools /></el-icon>
          <span>教师管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addTeacher">添加教师</el-menu-item>
          <el-menu-item index="/teacherList">教师管理</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  HomeFilled,
  UserFilled,
  Avatar,
  Reading,
  Watermelon,
  Tools,
  Box,
} from "@element-plus/icons";

const store = useStore()

// const vNew = {
//   mounted(el) {
//     // console.log('指令获取到的DOM',el)
//     if (store.state.userInfo.role == 2 || store.state.userInfo.role == 1) return
//     el.parentNode.removeChild(el)
//   },
// }

// const vProduct = {
//   mounted(el) {
//     // console.log('指令获取到的DOM',el)
//     if (store.state.userInfo.role == 3 || store.state.userInfo.role == 1) return
//     el.parentNode.removeChild(el)
//   },
// }
// const vAdmin = {
//   mounted(el) {
//     // console.log('指令获取到的DOM',el)
//     console.log(store.state.userInfo.role)
//     if (store.state.userInfo.role == 4 || store.state.userInfo.role == 1) return
//     el.parentNode.removeChild(el)
//   },
// }
const route = useRoute()
</script>

<style lang="scss" scoped>
.el-aside {
  height: 100vh;
  .el-menu {
    height: 100vh;
  }
}
</style>
