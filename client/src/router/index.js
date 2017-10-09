import Vue from 'vue'
import Router from 'vue-router'
import Polls from '@/components/Polls'
import viewPoll from '@/components/ViewPoll/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'polls'
    },
    {
      path: '/polls',
      name: 'polls',
      component: Polls
    },
    {
      path: '/polls/:pollId',
      name: 'view-poll',
      component: viewPoll
    }
  ]
})
