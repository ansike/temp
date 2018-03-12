import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/pages/home/home.vue'], resolve);
const Welcome = resolve => require(['@/pages/home/welcome.vue'], resolve);
const MindexIndex = resolve => require(['@/pages/mineIndex/index.vue'], resolve);

//我的学生
const MineStudent = resolve => require(['@/pages/mineStudent/mineStudent.vue'], resolve);
const ClassList = resolve => require(['@/pages/mineStudent/classlist.vue'], resolve);
const StudentDetail = resolve => require(['@/pages/mineStudent/studentdetail.vue'], resolve);
const UnitDetail = resolve => require(['@/pages/mineStudent/unitdetail.vue'], resolve);

//个人中心
const Personal = resolve => require(['@/pages/personal/personal.vue'], resolve);

Vue.use(Router)

export default new Router({
	// mode:'history',
    base:'/static/desktc/',
  	routes: [
    	{
      	path: '/',
      	component: Home,
        children:[
          {
            path: '/',
            name: 'welcome',
            component: Welcome
          },
          {
            path: '/index',
            name: 'index',
            component: MindexIndex
          },
          {
            path: '/course',
            name: 'minecourse',
            component: MindexIndex
          },
          {
            path: '/student',
            component: MineStudent,
            children:[
              {
                path: '/',
                name: 'classlist',
                component: ClassList
              },
              {
                path: '/student/studentdetail',
                name: 'studentdetail',
                component: StudentDetail
              },
              {
                path: '/student/unitdetail',
                name: 'unitdetail',
                component: UnitDetail
              },
            ]
          },
          {
            path: '/personal',
            name: 'personal',
            component: Personal
          },
          // {
          //   path: '/',
          //   name: 'welcome',
          //   component: Welcome
          // }
        ]
    	},
      // {
      //     path: '/',
      //     name: 'HelloWorld',
      //     component: HelloWorld
      // }
  	]
})
