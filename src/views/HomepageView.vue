<script setup>
import { ref } from 'vue'
const content = ref(['', '']);
const theme = ref('light')
</script>
<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app :theme="theme">
      <v-app-bar color="#3E8639" height="130" flat>
        <div class="d-flex align-center">
          <v-img src="/csulogo.png" width="130" height="150" alt="CSU Logo" class="ma-4 ml-6" />
          <div class="ms-4 text-black">
            <p>Republic of the Philippines</p>
            <h2 class="text-black">Caraga State University</h2>
            <p>Ampayon, Butuan City 86OO, Philippines</p>
            <p class="text-subtitle-2">
              <span style="color: green; font-size: 20px; font-weight: bold">C</span>ompetence
              &nbsp; <span style="color: green; font-size: 20px; font-weight: bold">S</span>ervice
              &nbsp;<span style="color: green; font-size: 20px; font-weight: bold">U</span
              >prightness
            </p>
          </div>
        </div>
        <v-spacer />
      </v-app-bar>

      <v-main>
        <v-container>
          <RouterView to="/homepage"></RouterView>
          <v-sheet class="mx-auto" width="800">
            <v-form>
              <p>I. lalab</p>
              <v-text-field v-model="content"></v-text-field>
            </v-form>
          </v-sheet>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
