<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const buttons = [
  { label: 'VISITATION FORM', path: '/visitationform' },
  { label: 'TRACE AND TRACK', path: '/traceandtrack' },
  { label: 'FEEDBACK FORM', path: '/feedbackform' },
]
</script>

<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app :theme="theme">
      <v-app-bar class="sticky-nav" color="#3E8639" height="130" flat>
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
        <div
          style="
            position: sticky;
            top: 10px;
            z-index: 9;
            background: white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          "
        >
          <v-row class="justify-center my-6" dense>
            <v-col
              v-for="(btn, i) in buttons"
              :key="i"
              cols="auto"
              class="d-flex justify-center px-2"
            >
              <router-link :to="btn.path" style="text-decoration: none">
                <v-btn
                  :color="route.path === btn.path ? '#3CCC32' : '#D9D9D9'"
                  class="text-black"
                  height="40"
                  width="180"
                >
                  {{ btn.label }}
                </v-btn>
              </router-link>
            </v-col>
          </v-row>
        </div>
        <v-sheet elevation="1" color="#F5FDE3" rounded max-width="800" class="mx-auto pa-6">
          <h2 class="font-weight-bold mb-4 text-center">VISITATION FORM</h2>
          <h3>IMPORTANT NOTE:</h3>
          <p>
            This Visitation Form must be accomplished before the actual date of the visit.The Caraga
            State University will not accomodate visitors before or after the approved schedule
            without prior notice.
          </p>
          <v-divider class="my-4" color="black" thickness="2"></v-divider>
          <h3>I. GENERAL INFORMATION</h3>
          <p class="mr-5">Preferred Date And Time of Visit.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Alternate Date And Time of Visit.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Purpose of Visit.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Selected Faculty Centered Office Organization to Visit.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Manner of Engagement (in-person or vitual)</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <h3 class="mt-4">II. VISITORS INFORMATION</h3>
          <p>Name of Institution Agency.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Name and Contact Details of the Contact Person.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Number of Delegates(s).</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Names and Position of the Delegates.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Topics for Discussion.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <p>Other Information Concern.</p>
          <v-text-field label="" variant="solo-filled"></v-text-field>
          <v-row justify="center" class="mt-6">
            <v-col cols="auto">
              <v-btn color="green" style="color:black;">Submit</v-btn>
            </v-col>
          </v-row>
        </v-sheet>
        <v-container>
          <v-sheet class="mx-auto" width="800"> </v-sheet>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
