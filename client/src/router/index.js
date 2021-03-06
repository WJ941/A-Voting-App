import Vue from 'vue'
import Router from 'vue-router'
import Polls from '@/components/Polls'
import viewPoll from '@/components/ViewPoll/Index'
import newPoll from '@/components/NewPoll'
import Callback from '@/components/Callback'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Polls
    },
    {
      path: '/polls',
      name: 'polls',
      component: Polls
    },
    {
      path: '/poll/:pollId',
      name: 'view-poll',
      component: viewPoll
    },
    {
      path: '/login_github',
      name: 'login',
      component: Polls
    },
    {
      path: '/newPoll',
      name: 'newPoll',
      component: newPoll
    },
    {
      path: '/callback_github',
      name: 'callback_github',
      component: Callback
    }
  ]
})
