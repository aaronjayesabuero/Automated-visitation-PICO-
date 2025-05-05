<script setup>
import { ref } from 'vue'

const drawer = ref(false)
const buttons = [
  { label: 'VISITATION FORM', path: '/visitationform' },
  { label: 'TRACE AND TRACK', path: '/traceandtrack' },
  { label: 'FEEDBACK FORM', path: '/feedbackform' },
]
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
            <router-link :to="btn.path" class="text-decoration-none w-100">
              <v-list-item-title class="text-black">
                {{ btn.label }}
              </v-list-item-title>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app fixed color="#3E8639" height="130" flat elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />

        <v-row class="align-center ml-2" no-gutters>
          <v-col cols="auto">
          <v-img src="/csulogo.png" width="90" height="100" alt="CSU Logo" class="ma-2" />
        </v-col>
        <v-col>
          <div class="text-black text-caption text-sm-subtitle-1">
            <div class="font-weight-bold text-body-1 text-sm-h6">Caraga State University</div>
            <div class="text-subtitle-2 mt-1">
              <span style="color: green; font-size: 20px; font-weight: bold">C</span>ompetence
              &nbsp; <span style="color: green; font-size: 20px; font-weight: bold">S</span>ervice
              &nbsp;<span style="color: green; font-size: 20px; font-weight: bold">U</span
              >prightness
              </div>
          </div>
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
            <router-link :to="btn.path" style="text-decoration: none">
              <v-btn color="#D9D9D9" class="text-black" height="40" width="180">
                {{ btn.label }}
              </v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-app-bar>
      
      <v-main style="height: 100vh; overflow-y: auto">
        <v-container class="pt-16">
          <v-sheet
            elevation="1"
            color="#F5FDE3"
            rounded
            max-width="800"
            class="mx-auto pa-6 pa-sm-4 pa-xs-2"
          >
            <h4 class="font-weight-bold mb-4 text-center">
              CSU conducts training to sustain commitment to university branding
            </h4>
            <v-img
              src="/picomeeting.png"
              max-height="300"
              max-width="100%"
              contain
              class="mb-4"
            />
            <v-img
              src="/picomeeting2.png"
              max-height="300"
              max-width="100%"
              contain
              class="mb-4"
            />
          </v-sheet>
          <RouterView />

          <v-sheet class="mx-auto mt-10" width="800" color="green" />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
