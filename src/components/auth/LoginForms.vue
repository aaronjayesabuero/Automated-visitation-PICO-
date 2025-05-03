<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator } from '@/utils/validators'

const organization = ref('')
const visible = ref(false)
const refVForm = ref()

const formDataDafault = {
  email: '',
  password: '',
}

const formData = ref({
  ...formDataDafault,
})

const onSubmit = () => {
  // alert(formData.value.email)
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
    >
    </v-text-field>

    <v-text-field
      v-model="formData.password"
      prepend-inner-icon="mdi-lock"
      label="Password"
      :type="visible ? 'text' : 'password'"
      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
      density="compact"
      @click:append-inner="visible = !visible"
      :rules="[requiredValidator]"
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

    <h4 class="mb-7">Forget password?</h4>

    <v-btn class="mt-2" type="submit" block color="#3CCC32">
      <h3>Log in</h3>
    </v-btn>
  </v-form>
</template>
