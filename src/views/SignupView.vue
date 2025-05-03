<script setup>
import { ref } from 'vue'
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
import AppLayout from '@/components/layout/AppLayout.vue'
const organization = ref('')
const visible = ref(false)
const Confirmvisible = ref(false)
const refVForm = ref()

const formDataDafault = {
  email: '',
  password: '',
  password_confimation: '',
}

const formData = ref({
  ...formDataDafault,
})

const onSubmit = () => {
  alert(formData.value.email)
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}

</script>

<template>
  <app-layout>
    <template #content>
      <v-row class="justify-center">
        <v-col cols="12" md="6">
          <v-card class="mx-auto" elevation="16" max-width="344">
            <div class="d-flex justify-center align-center pa-1">
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
          <h2 class="text-center" style="color: black">Sign Up</h2>
        </template>

        <div class="d-flex justify-center gap-4 mt-2">
          <v-btn class="mx-1" color="#3CCC32"><h3>Sign up</h3></v-btn>

          <router-link to="/login">
            <v-btn class="mx-1" color="#D9D9D9"><h3>Log in</h3></v-btn>
          </router-link>
        </div>

        <v-card-text class="pt-4">
          <v-form ref="refVForm" @submit.prevent="onFormSubmit">
            <v-text-field
            v-model="formData.email"
              label="Email"
              prepend-inner-icon="mdi-email"
              :rules="[requiredValidator, emailValidator]"
            />

            <v-text-field
            v-model="formData.password"
              label="Password"
              prepend-inner-icon="mdi-lock"
              :type="visible ? 'text' : 'password'"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              density="compact"
              @click:append-inner="visible = !visible"
              :rules="[requiredValidator, passwordValidator]"
            ></v-text-field>

            <v-text-field
            v-model="formData.password_confimation"
              label="Confirm password"
              prepend-inner-icon="mdi-lock-check"
              :type="Confirmvisible ? 'text' : 'password'"
              :append-inner-icon="Confirmvisible ? 'mdi-eye-off' : 'mdi-eye'"
              density="compact"
              @click:append-inner="Confirmvisible = !Confirmvisible"
              :rules="[requiredValidator, confirmedValidator(formData.password_confimation, formData.password)]"
            >
            </v-text-field>
            <v-select
              v-model="organization"
              label="Organization"
              :items="['admin', 'visitor']"
              prepend-inner-icon="mdi-account"
              density="compact"
              class="mt-2"
            ></v-select>

            <v-btn class="mt-2" type="submit" block color="#3CCC32">
              <h3>Sign up</h3>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </app-layout>
</template>
