<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useRouter } from 'vue-router'
import { formActionDefault, supabase } from '@/utils/supabase'  
const visible = ref(false)
const refVForm = ref()

const router = useRouter()

const formDataDefault = {
  email: '',
  password: '',
}
const formData = ref({
  ...formDataDefault,
})

const formAction = ref({
  ...formActionDefault,
})

const onSubmit = async () => {
  formAction.value = { ...formActionDefault, formProcess: true }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    })

    if (error) {
      formAction.value.formErrorMessage = error.message || 'Invalid email or password'
      formAction.value.formStatus = error.status || 400

     
      setTimeout(() => {
        formAction.value.formErrorMessage = ''
      }, 2000)

      return
    }

    if (data?.user) {
     
      formAction.value.formSuccessMessage = 'Successfully Logged In.'

      if (data.session?.access_token) {
        localStorage.setItem('authToken', data.session.access_token)
      }
      const { error: insertError } = await supabase
        .from('users') 
        .insert({
          id: data.user.id,
          email: data.user.email,
          created_at: new Date(),
        })

      if (insertError) {
        console.error('Error inserting user into database:', insertError.message)
      }


      await router.push('/homepage')
    }
  } catch (error) {
    console.error('Login error:', error)
    formAction.value.formErrorMessage = error.message || 'An error occurred during login'


    setTimeout(() => {
      formAction.value.formErrorMessage = ''
    }, 2000)
  } finally {
    formAction.value.formProcess = false
  }
}

const onFormSubmit = () => {
  refVForm.value.validate().then(({ valid }) => {
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

    <h4 class="mb-7">Forget password?</h4>

    <v-btn class="mt-2" type="submit" block color="#3CCC32" :disabled="formAction.formProcess"
      :loading="formAction.formProcess">
      <h3>Log in</h3>
    </v-btn>
  </v-form>
</template>
