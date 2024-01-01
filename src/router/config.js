import Home from '../views/home'
import Center from '../views/center/index'
import AddUser from '../views/user/addUser'
import UserList from '../views/user/userList'
import AddBaby from '../views/baby/addBaby'
import BadyList from '../views/baby/babyList'
import BadyManage from '../views/baby/babyManage'
import AddClass from '../views/class/addClass'
import ClassList from '../views/class/classList'
import ClassManage from '../views/class/classManage'
import AddTeacher from '../views/teacher/addTeacher'
import TeacherList from '../views/teacher/teacherList'
import TeacherManage from '../views/teacher/teacherManage'
const configRouters = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/center',
    component: Center,
  },
  {
    path: '/addUser',
    component: AddUser,
  },
  {
    path: '/userList',
    component: UserList,
  },
  {
    path: '/addBaby',
    component: AddBaby,
  },
  {
    path: '/babyList',
    component: BadyList,
  },
  {
    path: '/babyManage',
    component: BadyManage,
  },
  {
    path: '/addClass',
    component: AddClass,
  },
  {
    path: '/classList',
    component: ClassList,
  },
  {
    path: '/classManage',
    component: ClassManage,
  },
  {
    path: '/addTeacher',
    component: AddTeacher,
  },
  {
    path: '/teacherList',
    component: TeacherList,
  },
  {
    path: '/teacherManage',
    component: TeacherManage,
  },
]

export default configRouters
