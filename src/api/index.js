import instance from './request'

// user start
export const getUserList = (data) =>
  instance({
    url: '/get-user-list',
    method: 'post',
    // data,
  })
export const userLogin = (data) =>
  instance({
    url: '/user-login',
    method: 'post',
    data,
  })
export const addUser = (data) =>
  instance({
    url: '/add-user',
    method: 'post',
    data,
    headers: {
      // 提交的是一个表单文件
      'Content-Type': 'multipart/form-data',
    },
  })
export const deleteUserById = (data) =>
  instance({
    url: '/delete-user-byid',
    method: 'post',
    data,
  })
export const changeUserById = (data) =>
  instance({
    url: '/change-user-byid',
    method: 'post',
    data,
    headers: {
      // 提交的是一个表单文件
      'Content-Type': 'multipart/form-data',
    },
  })
export const changeUserInfoById = (data) =>
  instance({
    url: '/change-user-info-byid',
    method: 'post',
    data,
  })
export const findUserById = (data) =>
  instance({
    url: '/find-user-byid',
    method: 'post',
    data,
  })

// class start
export const getCourseList = () =>
  instance({
    url: '/get-course-list',
    method: 'post',
  })
export const addCourse = (data) =>
  instance({
    url: '/add-course',
    method: 'post',
    data,
    headers: {
      // 提交的是一个表单文件
      'Content-Type': 'multipart/form-data',
    },
  })
export const deleteCourseById = (data) =>
  instance({
    url: '/delete-course-byid',
    method: 'post',
    data,
  })
export const changeCourseById = (data) =>
  instance({
    url: '/change-course-byid',
    method: 'post',
    data,
    headers: {
      // 提交的是一个表单文件
      'Content-Type': 'multipart/form-data',
    },
  })
export const findCourseById = (data) =>
  instance({
    url: '/find-course-byid',
    method: 'post',
    data,
  })

// teacher start
export const addTeacher = (data) =>
  instance({
    url: '/add-teacher',
    method: 'post',
    data,
    headers: {
      // 提交的是一个表单文件
      'Content-Type': 'multipart/form-data',
    },
  })
  export const getTeacherList = () =>
  instance({
    url: '/get-teacher-list',
    method: 'post',
  })