<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/utils/supabase'

const drawer = ref(false)
const requests = ref([])
const router = useRouter()

const form = ref({
  preferredDate: '',
  alternateDate: '',
  purpose: '',
  office: '',
  engagement: '',
  institution: '',
  contactPerson: '',
  delegateCount: '',
  delegateNames: '',
  topics: '',
  otherInfo: ''
})
const checkRequests = async () => {
  try {
    const { data, error } = await supabase
      .from('visitation_requests')
      .select('*')
      .eq('user_id', supabase.auth.user()?.id)
    
    if (error) throw error
    requests.value = data || []
  } catch (error) {
    console.error('Error fetching requests:', error)
  }
}
// Submit form
const submitForm = async () => {
  try {
    isLoading.value = true
    const { data, error } = await supabase
      .from('visitation_requests')
      .insert([{
        ...form.value,
        user_id: supabase.auth.user()?.id,
        status: 'Pending',
        created_at: new Date()
      }])
    
    if (error) throw error
    
    // Reset form and refresh requests
    form.value = {
      preferredDate: '',
      alternateDate: '',
      purpose: '',
      office: '',
      engagement: '',
      institution: '',
      contactPerson: '',
      delegateCount: '',
      delegateNames: '',
      topics: '',
      otherInfo: ''
    }
    
    await checkRequests()
    router.push('/trace&track')
    
  } catch (error) {
    console.error('Submission error:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  checkRequests()
})

const buttons = [
  { label: 'VISITATION FORM', path: '/visitationform' },
  { label: 'TRACE AND TRACK', path: '/trace&track' },
  { label: 'FEEDBACK FORM', path: '/feedbackform' },
  { label: 'LOG OUT', path: '/' },
]


const handleLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error during logout:', error.message)
      return
    }
    localStorage.removeItem('authToken')

    // Redirect to login or home page
    await router.push('/login')
  } catch (err) {
    console.error('Unexpected error during logout:', err)
  }
}
</script>

<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app :theme="theme">
      <v-navigation-drawer
        v-model="drawer"
        temporary
        app
      >
        <v-list>
          <v-list-item
            v-for="(btn, i) in buttons"
            :key="i"
          >
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
          <v-col
            v-for="(btn, i) in buttons"
            :key="i"
            cols="auto"
            class="d-flex justify-center px-2"
          >
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
          <v-sheet elevation="1" color="#F5FDE3" rounded max-width="800" class="mx-auto pa-6 pa-sm-4 pa-xs-2">
            <h2 class="font-weight-bold mb-4 text-center">VISITATION FORM</h2>
            <h3>IMPORTANT NOTE:</h3>
            <p>
              This Visitation Form must be accomplished before the actual date of the visit. The Caraga
              State University will not accommodate visitors before or after the approved schedule
              without prior notice.
            </p>
            <v-divider class="my-4" color="black" thickness="2"></v-divider>
            <v-form @submit.prevent="submitForm">
            <h3>I. GENERAL INFORMATION</h3>
            <p class="mr-5">Preferred Date And Time of Visit.</p>
            <v-text-field v-model="form.preferredDate" variant="outlined" density="compact"></v-text-field>
            <p>Alternate Date And Time of Visit.</p>
            <v-text-field v-model="form.alternateDateDate" variant="outlined" density="compact"></v-text-field>
            <p>Purpose of Visit.</p>
            <v-text-field v-model="form.purpose" variant="outlined" density="compact"></v-text-field>
            <p>Selected Faculty Centered Office Organization to Visit.</p>
            <v-text-field v-model="form.office" variant="outlined" density="compact"></v-text-field>
            <p>Manner of Engagement (in-person or virtual)</p>
            <v-text-field v-model="form.engagement" variant="outlined" density="compact"></v-text-field>
            <h3 class="mt-4">II. VISITORS INFORMATION</h3>
            <p>Name of Institution Agency.</p>
            <v-text-field v-model="form.institution" variant="outlined" density="compact"></v-text-field>
            <p>Name and Contact Details of the Contact Person.</p>
            <v-text-field v-model="form.contactPerson" variant="outlined" density="compact"></v-text-field>
            <p>Number of Delegate(s).</p>
            <v-text-field lv-model="form.delegateCount" variant="outlined" density="compact" type="number"></v-text-field>
            <p>Names and Position of the Delegates.</p>
            <v-text-field  v-model="form.delegateNames" variant="outlined" density="compact" rows="2"></v-text-field>
            <p>Topics for Discussion.</p>
            <v-text-field v-model="form.topics" variant="outlined" density="compact" rows="2"></v-text-field>
            <p>Other Information Concern.</p>
            <v-text-field v-model="form.otherInfo" variant="outlined" density="compact" rows="2"></v-text-field>
            <v-row justify="center" class="mt-6">
              <v-col cols="auto">
                <v-btn color="green"                   
                    type="submit"
                    :loading="isLoading"
                    :disabled="isLoading">Submit</v-btn>
              </v-col>
            </v-row>
          </v-form>
          </v-sheet>
        </v-container>
        <v-container>
          <v-sheet class="mx-auto" width="800"> </v-sheet>
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
