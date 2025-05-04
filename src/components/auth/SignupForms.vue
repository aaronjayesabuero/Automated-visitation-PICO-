<script setup>
import { ref } from 'vue'
import { supabase, formActionDefault } from '@/utils/supabase'
import AlertNotification from '@/components/common/AlertNotification.vue'
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

const formDataDefault = {
  email: '',
  password: '',
  password_confimation: '',
}

const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

const onSubmit = async () => {
  formAction.value = { ...formActionDefault }
  formAction.value.formProcess = true

  const { data, error } = await supabase.auth.signUp({
    email: formData.value.email,
    password: formData.value.password,
  })
  if (error) {
    formAction.value.formErrorMessage = error.message
    formAction.value.formStatus = error.status
  } else if (data) {
    formAction.value.formSuccessMessage = 'Successfully Sign.'
    // formAction.value.formErrorMessage = ''
    refVForm.value?.reset()
  }
  formAction.value.formProcess = false
}

const onFormSubmit = () => {
  refVForm.value?.validate().then(({ valid }) => {
    if (valid) onSubmit()
  })
}
</script>

<template>
  <AlertNotification
    :form-success-message="formAction.formSuccessMessage"
    :form-error-message="formAction.formErrorMessage"
  ></AlertNotification>
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

    <v-btn
      class="mt-2"
      type="submit"
      block
      color="#3CCC32"
      :disabled="formAction.formProcess"
      :loading="formAction.formProcess"
    >
      <h3>Sign up</h3>
    </v-btn>
  </v-form>
</template>
