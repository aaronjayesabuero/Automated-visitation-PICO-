<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const drawer = ref(false)
const router = useRouter()
const hasRequests = ref(false) // Default to false since user hasn't submitted yet

const buttons = [
  { label: 'VISITATION FORM', path: '/visitationform' },
  { label: 'TRACE AND TRACK', path: '/traceandtrack' },
  { label: 'FEEDBACK FORM', path: '/feedbackform' },
  { label: 'LOG OUT', path: '/' },
]

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
</script>

<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app :theme="theme">
      
      <v-navigation-drawer v-model="drawer" temporary app>
        <v-list>
          <v-list-item v-for="(btn, i) in buttons" :key="i">
            <router-link v-if="btn.label !== 'LOG OUT'" :to="btn.path" class="text-decoration-none w-100">
              <v-list-item-title class="text-black">{{ btn.label }}</v-list-item-title>
            </router-link>
            <v-list-item-title v-else class="text-black cursor-pointer" @click="handleLogout">
              {{ btn.label }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app fixed color="#3E8639" height="110" flat elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />
        <v-row class="align-center ml-2" no-gutters>
          <v-col cols="auto">
            <v-img src="/csulogo2.png" width="350" height="300" alt="CSU Logo" class="ma-2" />
          </v-col>
        </v-row>
        <v-spacer />
        <v-row class="d-none d-md-flex mr-4" dense>
          <v-col v-for="(btn, i) in buttons" :key="i" cols="auto" class="d-flex justify-center px-2">
            <router-link v-if="btn.label !== 'LOG OUT'" :to="btn.path" style="text-decoration: none">
              <v-btn color="#D9D9D9" class="text-black" height="40" width="180">{{ btn.label }}</v-btn>
            </router-link>
            <v-btn v-else color="#D9D9D9" class="text-black" height="40" width="180" @click="handleLogout">
              {{ btn.label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-main style="height: 100vh; overflow-y: auto">

        <div
          style="
            position: sticky;
            top: 10px;
            z-index: 9;
            background: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          "
        >
        </div>
        <v-container>
          <v-sheet elevation="1" color="#F5FDE3" rounded max-width="800" class="mx-auto pa-6">
            <h2 class="font-weight-bold mb-4 text-center">TRACE AND TRACK REQUEST STATUS</h2>
            
            <v-card class="text-center py-12" color="#F5FDE3" flat>
              <v-icon size="64" color="grey">mdi-file-remove-outline</v-icon>
              <h3 class="mt-4 text-grey">You don't have any requests yet</h3>
              <v-btn 
                color="green" 
                class="mt-6"
                to="/visitationform"
                size="large"
              >
                <v-icon start>mdi-plus</v-icon>
                Create Your First Request
              </v-btn>
            </v-card>
          </v-sheet>
        </v-container>

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