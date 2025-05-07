<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const drawer = ref(false)
const router = useRouter()
const isLoading = ref(false)

const feedback = ref({
  name: '',
  email: '',
  q1: '',
  q2: '',
  q3: '',
  q4: '',
  q5: '',
  q6: ''
})

const submitFeedback = async () => {
  try {
    isLoading.value = true
    const { error } = await supabase.from('feedback').insert([
      {
        ...feedback.value,
        submitted_at: new Date()
      }
    ])
    if (error) throw error

    alert('Thank you for your feedback!')
    feedback.value = {
      name: '',
      email: '',
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q6: ''
    }
  } catch (err) {
    console.error('Error submitting feedback:', err)
  } finally {
    isLoading.value = false
  }
}

const buttons = [
  { label: 'VISITATION FORM', path: '/visitationform' },
  { label: 'TRACE AND TRACK', path: '/trace&track' },
  { label: 'FEEDBACK FORM', path: '/feedbackform' },
  { label: 'LOG OUT', path: '/' }
]

const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error during logout:', error.message)
      return
    }
    localStorage.removeItem('authToken')
    await router.push('/login')
  } catch (err) {
    console.error('Unexpected error during logout:', err)
  }
}
</script>

<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app>
      <v-navigation-drawer v-model="drawer" temporary app>
        <v-list>
          <v-list-item v-for="(btn, i) in buttons" :key="i">
            <router-link
              v-if="btn.label !== 'LOG OUT'"
              :to="btn.path"
              class="text-decoration-none w-100"
            >
              <v-list-item-title class="text-black">
                {{ btn.label }}
              </v-list-item-title>
            </router-link>
            <v-list-item-title
              v-else
              class="text-black cursor-pointer"
              @click="handleLogout"
            >
              {{ btn.label }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app fixed color="#3E8639" height="110" flat elevate-on-scroll>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none" />
        <v-row class="align-center ml-2" no-gutters>
          <v-col cols="auto">
            <v-img src="/csulogo2.png" width="350" height="300" alt="CSU Logo" class="ma-2" />
          </v-col>
        </v-row>
        <v-spacer />
        <v-row class="d-none d-md-flex mr-4" dense>
          <v-col v-for="(btn, i) in buttons" :key="i" cols="auto" class="d-flex justify-center px-2">
            <router-link
              v-if="btn.label !== 'LOG OUT'"
              :to="btn.path"
              style="text-decoration: none"
            >
              <v-btn color="#D9D9D9" class="text-black" height="40" width="180">
                {{ btn.label }}
              </v-btn>
            </router-link>
            <v-btn
              v-else
              color="#D9D9D9"
              class="text-black"
              height="40"
              width="180"
              @click="handleLogout"
            >
              {{ btn.label }}
            </v-btn>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-main style="height: 100vh; overflow-y: auto">
        <v-container>
          <v-sheet elevation="1" color="#F5FDE3" rounded max-width="800" class="mx-auto pa-6">
            <h2 class="font-weight-bold mb-4 text-center">FEEDBACK FORM</h2>
            <p class="mb-4 text-center">
              We value your feedback! Please answer the following questions.
            </p>
            <v-divider class="my-4" color="black" thickness="2"></v-divider>

            <v-form @submit.prevent="submitFeedback">
              <v-text-field v-model="feedback.name" label="1. Your Name" variant="outlined" required></v-text-field>

              <v-text-field v-model="feedback.email" label="2. Your Email (optional)" variant="outlined"></v-text-field>

              <v-textarea
                v-model="feedback.q1"
                label="3. What was the purpose of your visit?"
                variant="outlined"
                required
              ></v-textarea>

              <v-textarea
                v-model="feedback.q2"
                label="4. How would you rate the services provided?"
                variant="outlined"
                required
              ></v-textarea>

              <v-textarea
                v-model="feedback.q3"
                label="5. Was the staff helpful and accommodating?"
                variant="outlined"
                required
              ></v-textarea>

              <v-textarea
                v-model="feedback.q4"
                label="6. What improvements can we make?"
                variant="outlined"
              ></v-textarea>

              <v-textarea
                v-model="feedback.q5"
                label="7. Would you recommend our service to others?"
                variant="outlined"
              ></v-textarea>

              <v-textarea
                v-model="feedback.q6"
                label="8. Any other comments or suggestions?"
                variant="outlined"
              ></v-textarea>

              <v-row justify="center" class="mt-6">
                <v-col cols="auto">
                  <v-btn color="green" type="submit" :loading="isLoading" :disabled="isLoading">
                    Submit Feedback
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-sheet>
        </v-container>

        <v-footer class="text-center d-flex flex-column ga-1 py-2" color="#100A08">
          <div class="d-flex justify-center align-center pa-1">
            <v-img src="/csulogo.png" width="100" height="100" alt="CSU Logo"></v-img>
          </div>
          <div class="text-caption font-weight-bold opacity-60">
            <span>Copyright © 2025 All rights reserved.</span>
            <v-hover>
              <template v-slot:default="{ isHovering, props }">
                <a
                  v-bind="props"
                  href="https://www.carsu.edu.ph/"
                  target="_blank"
                  rel="noopener"
                  class="text-decoration-underline mt-1"
                  :style="{ color: isHovering ? '#4CAF50' : 'white', transition: 'color 0.3s' }"
                >
                  Caraga State University
                </a>
              </template>
            </v-hover>
          </div>
          <v-divider></v-divider>
        </v-footer>
      </v-main>
    </v-app>
  </v-responsive>
</template>
