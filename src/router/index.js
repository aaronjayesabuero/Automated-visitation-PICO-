import { createRouter, createWebHistory } from 'vue-router'
import SignupView from '@/views/SignupView.vue'
import LoginView from '@/views/LoginView.vue'
import HomepageView from '@/views/HomepageView.vue'
import VisitationFormView from '@/views/VisitationFormView.vue'
import TraceTrackView from '@/views/Trace&TrackView.vue'
import FeedbackView from '@/views/FeedbackView.vue'
import AdminHomepageView from '@/views/AdminHomepageView.vue'
import SubmissionsView from '@/views/SubmissionsView.vue'

// Mock authentication function (replace with your actual auth logic)
const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Example: Check if a token exists
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signup'
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
      name: 'homepage',
      component: HomepageView,
      meta: { requiresAuth: true }, // Add meta field for protected routes
    },
    {
      path: '/visitationform',
      name: 'visitationform',
      component: VisitationFormView,
      meta: { requiresAuth: true }, // Add meta field for protected routes
    },
    {
      path: '/trace&track',
      name: 'trace&track',
      component: TraceTrackView,
      meta: { requiresAuth: true },
    },

    {
      path: '/feedbackform',
      name: 'feedbackform',
      component: FeedbackView,
      meta: { requiresAuth: true },
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: AdminHomepageView,
     
    },
    {
      path: '/admin/submissions',
      name: 'admin/submissions',
      component: SubmissionsView,
     
    },
  ],
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' }); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router
