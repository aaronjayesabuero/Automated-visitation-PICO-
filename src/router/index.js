import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import HomepageView from '@/views/HomepageView.vue'
import VisitationFormView from '@/views/VisitationFormView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/signup'
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/homepage',
      name:'homepage',
      component: HomepageView,
    },

    {
      path: '/visitationform',
      name:'visitationform',
      component: VisitationFormView,
    },


  ],
})

export default router
