<script setup>
import { ref } from 'vue'
import { requiredValidator, emailValidator } from '@/utils/validators'
import { useRouter } from 'vue-router'
import { formActionDefault, supabase } from '@/utils/supabase'  // Import Vue Router for navigation

const visible = ref(false)
const refVForm = ref()

// Initialize Vue Router for navigation
const router = useRouter()

// Default structure for form data
const formDataDefault = {
  email: '',
  password: '',
}

// Reactive variable to hold form data
const formData = ref({
  ...formDataDefault,
})

// Reactive variable to manage form action states (e.g., loading, error messages)
const formAction = ref({
  ...formActionDefault,
})

const onSubmit = async () => {
  // Reset form action state and enable loading indicator
  formAction.value = { ...formActionDefault, formProcess: true }

  try {
    // Attempt to sign in using Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.value.email,
      password: formData.value.password,
    })

    if (error) {
      // Display error message and status code if login fails
      formAction.value.formErrorMessage = error.message || 'Invalid email or password'
      formAction.value.formStatus = error.status || 400

      // Clear the error message after 2 seconds
      setTimeout(() => {
        formAction.value.formErrorMessage = ''
      }, 2000)

      return
    }

    if (data?.user) {
      // Display success message upon successful login
      formAction.value.formSuccessMessage = 'Successfully Logged In.'

      // Insert user credentials into your database (optional)
      const { error: insertError } = await supabase
        .from('users') // Replace 'users' with your actual table name
        .insert({
          id: data.user.id,
          email: data.user.email,
          created_at: new Date(),
        })

      if (insertError) {
        console.error('Error inserting user into database:', insertError.message)
      }

      // Redirect user to the appropriate page
      await router.push('/homepage')
    }
  } catch (error) {
    // Log and display any unexpected errors during login
    console.error('Login error:', error)
    formAction.value.formErrorMessage = error.message || 'An error occurred during login'

    // Clear the error message after 2 seconds
    setTimeout(() => {
      formAction.value.formErrorMessage = ''
    }, 2000)
  } finally {
    // Disable loading indicator
    formAction.value.formProcess = false
  }
}

const onFormSubmit = () => {
  refVForm.value.validate().then(({ valid }) => {
    if (valid) onSubmit() // Submit the form if validation passes
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

    <v-btn class="mt-2" type="submit" block color="#3CCC32">
      <h3>Log in</h3>
    </v-btn>
  </v-form>
</template>
