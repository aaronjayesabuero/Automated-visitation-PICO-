<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const requests = ref([])
const isLoading = ref(false)

const fetchRequests = async () => {
  try {
    isLoading.value = true

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError) throw new Error('Failed to retrieve user information.')
    if (!user) throw new Error('User is not authenticated.')

    // Fetch visitation requests for the authenticated user
    const { data, error } = await supabase
      .from('visitation_requests')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }) // Sort by most recent

    if (error) throw error
    requests.value = data || []
  } catch (error) {
    console.error('Error fetching requests:', error)
    alert('Failed to fetch requests. Please try again.')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchRequests()
})
</script>

<template>
  <v-container>
    <h2 class="text-center mb-4">Trace and Track</h2>
    <v-sheet elevation="1" color="#F5FDE3" rounded max-width="800" class="mx-auto pa-6">
      <v-progress-circular
        v-if="isLoading"
        indeterminate
        color="green"
        class="d-flex justify-center my-4"
      ></v-progress-circular>

      <v-alert v-if="!isLoading && requests.length === 0" type="info" class="text-center">
        No visitation requests found.
      </v-alert>

      <v-list v-else>
        <v-list-item
          v-for="request in requests"
          :key="request.id"
          class="mb-4"
        >
          <v-card class="w-100">
            <v-card-title>
              <div>
                <h3>{{ request.purpose }}</h3>
                <p>Status: <strong>{{ request.status }}</strong></p>
              </div>
            </v-card-title>
            <v-card-subtitle>
              Preferred Date: {{ request.preferredDate }}<br />
              Alternate Date: {{ request.alternateDate }}
            </v-card-subtitle>
          </v-card>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-container>
</template>