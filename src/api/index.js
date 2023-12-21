import instance from './request'

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
