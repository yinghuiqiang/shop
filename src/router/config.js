import Home from '../views/home'
import Center from '../views/center'
import AddUser from '../views/user/addUser'
import UserList from '../views/user/userList'
import AddBaby from '../views/baby/addBaby'
import BadyList from '../views/baby/babyList'
import AddClass from '../views/class/addClass'
import ClassList from '../views/class/classList'
import AddTeacher from '../views/teacher/addTeacher'
import TeacherList from '../views/teacher/teacherList'
const configRouters = [
    {
        path: '/home',
        component: Home
    },{
        path:'/center',
        component:Center
    },{
        path:'/addUser',
        component:AddUser
    },{
        path:'/userList',
        component:UserList
    },{
        path:'/addBaby',
        component:AddBaby
    },{
        path:'/babyList',
        component:BadyList
    },{
        path:'/addClass',
        component:AddClass
    },{
        path:'/classList',
        component:ClassList
    },{
        path:'/addTeacher',
        component:AddTeacher
    },{
        path:'/teacherList',
        component:TeacherList
    }
]

export default configRouters;