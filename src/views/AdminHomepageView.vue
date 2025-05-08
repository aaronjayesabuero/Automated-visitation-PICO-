<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const drawer = ref(false)
const router = useRouter()
const isLoading = ref(false)
const stats = ref({
  totalSubmissions: 0,
  pendingRequests: 0,
  approvedToday: 0
})
const recentActivity = ref([])

// Admin navigation buttons
const buttons = [

  { label: 'DASHBOARD', path: '/dashboard' },
  { label: 'SUBMISSIONS', path: '/admin/submissions' },
  { label: 'LOG OUT', path: '/' }
]

// Fetch dashboard data from Supabase
const fetchDashboardData = async () => {
  try {
    isLoading.value = true
    
    // Get total submissions count
    const { count: total } = await supabase
      .from('visitation_requests')
      .select('*', { count: 'exact' })
    
    // Get pending requests count
    const { count: pending } = await supabase
      .from('visitation_requests')
      .select('*', { count: 'exact' })
      .eq('status', 'Pending')
    
    // Get approved today count
    const today = new Date().toISOString().split('T')[0]
    const { count: approved } = await supabase
      .from('visitation_requests')
      .select('*', { count: 'exact' })
      .eq('status', 'Approved')
      .gte('created_at', today)
      .lte('created_at', `${today}T23:59:59`)
    
    // Get recent activity
    const { data: activity } = await supabase
      .from('visitation_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    stats.value = {
      totalSubmissions: total || 0,
      pendingRequests: pending || 0,
      approvedToday: approved || 0
    }

    recentActivity.value = activity?.map(item => ({
      id: item.id,
      time: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date(item.created_at).toLocaleDateString(),
      text: `${item.status} request from ${item.institution}`,
      color: item.status === 'Approved' ? 'green' : item.status === 'Denied' ? 'red' : 'blue'
    })) || []

  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    localStorage.removeItem('authToken')
    await router.push('/login')
  } catch (err) {
    console.error('Logout error:', err)
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app>
      <!-- Navigation Drawer -->
      <v-navigation-drawer v-model="drawer" temporary app>
        <v-list>
          <v-list-item v-for="(btn, i) in buttons" :key="i">
            <router-link
              v-if="btn.label !== 'LOG OUT'"
              :to="btn.path"
              class="text-decoration-none w-100"
            >
              <v-list-item-title class="text-black">
                {{ btn.label }}
              </v-list-item-title>
            </router-link>
            <v-list-item-title
              v-else
              class="text-black cursor-pointer"
              @click="handleLogout"
            >
              {{ btn.label }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- App Bar -->
      <v-app-bar app fixed color="#3E8639" height="110" flat elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />
        <v-row class="align-center ml-2" no-gutters>
          <v-col cols="auto">
            <v-img src="/csulogo2.png" width="350" height="300" alt="CSU Logo" class="ma-2 " />
          </v-col>
        </v-row>
        <v-spacer />
        <v-row class="d-none d-md-flex mr-4" dense>
          <v-col v-for="(btn, i) in buttons" :key="i" cols="auto" class="d-flex justify-center px-2">
            <router-link
              v-if="btn.label !== 'LOG OUT'"
              :to="btn.path"
              style="text-decoration: none"
            >
              <v-btn color="#D9D9D9" class="text-black" height="40" width="180">
                {{ btn.label }}
              </v-btn>
            </router-link>
            <v-btn
              v-else
              color="#D9D9D9"
              class="text-black"
              height="40"
              width="180"
              @click="handleLogout"
            >
              {{ btn.label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>

      <!-- Main Content -->
      <v-main style="height: 100vh; overflow-y: auto">
        <v-container>
          <v-sheet elevation="1" color="#F5FDE3" rounded class="pa-6">
            <h2 class="text-center mb-6">Admin Dashboard</h2>
            
            <!-- Loading State -->
            <v-progress-linear
              v-if="isLoading"
              indeterminate
              color="green"
              class="mb-6"
            ></v-progress-linear>

            <!-- Admin Statistics Cards -->
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-card color="green-lighten-4" class="pa-4">
                  <v-card-title class="text-h5">Total Submissions</v-card-title>
                  <v-card-text class="text-h4 text-center">
                    {{ stats.totalSubmissions }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="blue-lighten-4" class="pa-4">
                  <v-card-title class="text-h5">Pending Requests</v-card-title>
                  <v-card-text class="text-h4 text-center">
                    {{ stats.pendingRequests }}
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="orange-lighten-4" class="pa-4">
                  <v-card-title class="text-h5">Approved Today</v-card-title>
                  <v-card-text class="text-h4 text-center">
                    {{ stats.approvedToday }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- Recent Activity -->
            <v-card class="mb-6">
              <v-card-title>Recent Activity</v-card-title>
              <v-card-text>
                <v-timeline v-if="recentActivity.length">
                  <v-timeline-item
                    v-for="item in recentActivity"
                    :key="item.id"
                    :color="item.color"
                    small
                  >
                    <div class="d-flex">
                      <strong class="me-4">{{ item.time }}</strong>
                      <div>{{ item.text }}</div>
                    </div>
                    <div class="text-caption text-right">{{ item.date }}</div>
                  </v-timeline-item>
                </v-timeline>
                <p v-else class="text-center py-4">No recent activity</p>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-container>

        <!-- Footer -->
        <v-footer class="text-center d-flex flex-column ga-1 py-2" color="#100A08">
          <div class="d-flex justify-center align-center pa-1">
            <v-img src="/csulogo.png" width="100" height="100" alt="CSU Logo"></v-img>
          </div>
          <div class="text-caption font-weight-bold opacity-60">
            <span>Copyright © 2025 All rights reserved.</span>
            <a
              href="https://www.carsu.edu.ph/"
              target="_blank"
              rel="noopener"
              class="text-decoration-underline mt-1 white--text"
            >
              Caraga State University
            </a>
          </div>
          <v-divider></v-divider>
        </v-footer>
      </v-main>
    </v-app>
  </v-responsive>
</template>