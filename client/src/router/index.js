import Vue from 'vue'
import Router from 'vue-router'
import Polls from '@/components/Polls'
import viewPoll from '@/components/ViewPoll/Index'
import Callback from '@/components/Callback'
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '*',
    //   redirect: 'polls'
    // },
    {
      path: '/polls',
      name: 'polls',
      component: Polls
    },
    {
      path: '/polls',
      name: 'view-poll',
      component: viewPoll
    },
    {
      path: '/login_github',
      name: 'login',
      component: Polls
    },
    {
      path: '/*',
      name: 'callback_github',
      component: Callback
    }
  ]
})
