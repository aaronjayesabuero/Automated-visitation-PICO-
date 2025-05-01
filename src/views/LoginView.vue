<script setup>
import { ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
const organization = ref('')
</script>

<template>
  <AppLayout>
    <template #content>
      <v-row class="justify-center">
        <v-col cols="12" md="6">
          <v-card class="mx-auto" elevation="16" max-width="344">
            <div class="d-flex justify-center align-center pa-1  ">
              <v-img src="/csulogo.png" width="140" height="150" alt="CSU Logo"></v-img>
            </div>

            <v-card-item>
              <v-card-title class="text-h6 text-center">CARAGA STATE UNIVERSITY</v-card-title>
            </v-card-item>

            <v-card-text class="text-center">
              <span style="color: green; font-size: 20px; font-weight: bold">C</span>ompetence
              &nbsp; <span style="color: green; font-size: 20px; font-weight: bold">S</span>ervice
              &nbsp;
              <span style="color: green; font-size: 20px; font-weight: bold">U</span>prightness
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-card class="mx-auto my-8" max-width="500">
        <template v-slot:title>
          <h2 class="text-center" style="color: black">Log in</h2>
        </template>

        <div class="d-flex justify-center gap-4 mt-2">
          <RouterLink to="/signup">
            <v-btn class="mx-1" color="#D9D9D9"><h3>Sign up</h3></v-btn>
          </RouterLink>
          <v-btn class="mx-1" color="#3CCC32"><h3>Log in</h3></v-btn>
        </div>

        <v-card-text class="pt-4">
          <v-form fast-fail @submit.prevent>
            <v-text-field label="Email" prepend-inner-icon="mdi-email" />

            <v-text-field label="Password" type="password" prepend-inner-icon="mdi-lock" />
            <v-select
              v-model="organization"
              label="Organization"
              :items="['admin', 'visitor']"
              prepend-inner-icon="mdi-account"
              density="compact"
              class="mt-2"
            ></v-select>

            <h4 class="mb-7">Forget password?</h4>

            <v-btn class="mt-2" type="submit" block color="#3CCC32">
              <h3>Log in</h3>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </AppLayout>
</template>
