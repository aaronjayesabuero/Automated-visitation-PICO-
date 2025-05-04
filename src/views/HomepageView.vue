<script setup>
const buttons = [
  { label: 'VISITATION FORM', path: '/visitationform' },
  { label: 'TRACE AND TRACK', path: '/traceandtrack' },
  { label: 'FEEDBACK FORM', path: '/feedbackform' },
]
</script>
<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app :theme="theme">
      <v-app-bar app fixed color="#3E8639" height="130" flat elevate-on-scroll>
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
      <v-main style="height: 100vh; overflow-y: auto">
        <div style="
            position: sticky;
            top: 10px;
            z-index: 9;
            background: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          ">
        <v-row class="justify-center my-6" dense>
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
      </div>
        <v-sheet elevation="1" color="#F5FDE3" rounded max-width="800" class="mx-auto pa-6">
          <h4 class="font-weight-bold mb-4">
            CSU conducts training to sustain commitment to university branding
          </h4>
          <v-img src="/picomeeting.png" max-height="300" max-width="500" contain class="mb-4" />
          <v-img src="/picomeeting2.png" max-height="300" max-width="500" contain class="mb-4" />
        </v-sheet>
        <v-container>
          <RouterView to="/homepage"></RouterView>
          <v-sheet class="mx-auto" width="800" color="green"> </v-sheet>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
