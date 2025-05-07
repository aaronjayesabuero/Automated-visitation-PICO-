<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'
const drawer = ref(false)
const router = useRouter()
const buttons = [
  { label: 'VISITATION FORM', path: '/visitationform' },
  { label: 'TRACE AND TRACK', path: '/traceandtrack' },
  { label: 'FEEDBACK FORM', path: '/feedbackform' },
  { label: 'LOG OUT', path: '/' },
]
// Logout function
const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error during logout:', error.message)
      return
    }

    localStorage.removeItem('authToken')

    // Redirect to login or home page
    await router.push('/login')
  } catch (err) {
    console.error('Unexpected error during logout:', err)
  }
}
</script>
<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app :theme="theme">
      <v-navigation-drawer
        v-model="drawer"
        temporary
        app
      >
      
        <v-list>
          <v-list-item
            v-for="(btn, i) in buttons"
            :key="i"
          >
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

      <v-app-bar app fixed color="#3E8639" height="110" flat elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />

        <v-row class="align-center ml-2" no-gutters>
          <v-col cols="auto">
          <v-img src="/csulogo2.png" width="350" height="300" alt="CSU Logo" class="ma-2" />
        </v-col>
        </v-row>
        <v-spacer />
      
      <v-row class="d-none d-md-flex mr-4" dense>
          <v-col
            v-for="(btn, i) in buttons"
            :key="i"
            cols="auto"
            class="d-flex justify-center px-2"
          >
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
      
      <v-main style="height: 100vh; overflow-y: auto">
        <v-container >
          <v-sheet
            elevation="1"
            color="#F5FDE3"
            rounded
            max-width="800"
            class="mx-auto pa-6 pa-sm-4 pa-xs-2"
          >
            <h4 class="font-weight-bold mb-4 text-center">
              CSU conducts training to sustain commitment to university branding.
            </h4>
            <v-img
              src="/picomeeting.png"
              max-height="550"
              max-width="100%"
              contain
              class="mb-4"
            />
            <v-img
              src="/picomeeting2.png"
              max-height="600"
              max-width="100%"
              contain
              class="mb-4"
            />
          </v-sheet>
          <RouterView />

          <v-sheet class="mx-auto mt-10" width="800" color="green" />
        </v-container>
        
    <v-footer class="text-center d-flex flex-column ga-1 py-2" color="#100A08">
      <div class="d-flex justify-center align-center pa-1">
              <v-img src="/csulogo.png" width="100" height="100" alt="CSU Logo"></v-img>
            </div>
    <div class="text-caption font-weight-bold opacity-60">
      <span>Copyright © 2025 All rights reserved.</span>
      <v-hover>
  <template v-slot:default="{ isHovering, props }">
    <a
      v-bind="props"
      href="https://www.carsu.edu.ph/"
      target="_blank"
      rel="noopener"
      class="text-decoration-underline mt-1"
      :style="{ color: isHovering ? '#4CAF50' : 'white', transition: 'color 0.3s' }"
    >
      Caraga State University
    </a>
  </template>
</v-hover>
    </div>
    <v-divider></v-divider>
  </v-footer>
      </v-main>
    </v-app>

  </v-responsive>
</template>
