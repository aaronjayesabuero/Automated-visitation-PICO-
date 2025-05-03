<script setup>
import { ref } from 'vue'

import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from '@/utils/validators'
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
      :rules="[
        requiredValidator,
        confirmedValidator(formData.password_confimation, formData.password),
      ]"
    >
    </v-text-field>
    <v-select
      v-model="organization"
      label="Organization"
      :items="['admin', 'visitor']"
      prepend-inner-icon="mdi-account"
      density="compact"
      class="mt-2"
      :rules="[requiredValidator]"
    ></v-select>

    <v-btn class="mt-2" type="submit" block color="#3CCC32">
      <h3>Sign up</h3>
    </v-btn>
  </v-form>
</template>
