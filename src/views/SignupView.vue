<script setup>
import { ref } from 'vue'

const theme = ref('green')
</script>

<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-main
        class="fill-height"
        style="
          background-image: url('/bg.png');
          background-size: cover;
          background-position: center;
        "
      >
        <v-container class="fill-height d-flex align-center justify-center">
          <v-row class="justify-center">
            <v-col cols="12" md="6">
              <v-card class="mx-auto my-8" max-width="500">
                <template v-slot:title>
                  <h2 class="text-center" style="color:black;">Sign Up</h2>
                </template>

                <div class="d-flex justify-center gap-4 mt-2">
                  <v-btn class="mx-1" color="#3CCC32"><h3>Sign up</h3></v-btn>

                  <router-link to="/login">
                    <v-btn class="mx-1" color="#D9D9D9"><h3>Log in</h3></v-btn>
                  </router-link>
                </div>

                <v-card-text class="pt-4">
                  <v-form fast-fail @submit.prevent>
                    <v-text-field label="Email" prepend-inner-icon="mdi-email" />

                    <v-text-field label="Password" type="password" prepend-inner-icon="mdi-lock" />

                    <v-text-field
                      label="Confirm password"
                      type="password"
                      prepend-inner-icon="mdi-lock-check"
                    />

                    <v-btn class="mt-2" type="submit" block color="#3CCC32">
                      <h3>Sign up</h3>
                    </v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-footer
        color="#D5E1D2"
        class="justify-center text-center"
        style="border-bottom: 4px solid yellow"
        app
      >
        All rights reserved. Caraga State University
      </v-footer>
    </v-app>
  </v-responsive>
</template>
