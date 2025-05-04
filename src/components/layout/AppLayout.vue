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
        <v-container >
          <slot name="content"></slot>
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


