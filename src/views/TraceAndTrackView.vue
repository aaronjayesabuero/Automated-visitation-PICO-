<template>
  <v-container>
    <h1 class="text-h5 mb-4">Trace & Track</h1>

    <v-alert v-if="requests.length === 0" type="info" class="mb-4">
      No visitation requests found.
    </v-alert>

    <v-list v-else>
      <v-list-item
        v-for="request in requests"
        :key="request.id"
        class="mb-4"
      >
        <v-card class="w-100 pa-3">
          <v-card-title class="d-flex justify-space-between align-center">
            <div>
              <h3 class="mb-1">{{ request.purpose }}</h3>
              <p class="mb-1">
                Submitted on: {{ new Date(request.created_at).toLocaleString() }}
              </p>
              <p class="mb-0">
                Preferred: <strong>{{ request.preferredDate }}</strong><br />
                Alternate: <strong>{{ request.alternateDate }}</strong>
              </p>
            </div>
            <v-chip
              :color="getStatusColor(request.status)"
              text-color="white"
              class="font-weight-bold"
            >
              {{ request.status }}
            </v-chip>
          </v-card-title>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { supabase } from '@/supabase'

const requests = ref([])
let userId = null
let channel = null

const fetchRequests = async () => {
  const user = (await supabase.auth.getUser()).data.user
  if (!user) return

  userId = user.id

  const { data, error } = await supabase
    .from('visitation')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching requests:', error.message)
  } else {
    requests.value = data
  }
}

const getStatusColor = (status) => {
  switch (status) {
    case 'Pending':
      return 'orange'
    case 'Approved':
      return 'green'
    case 'Rejected':
      return 'red'
    default:
      return 'grey'
  }
}

const setupRealtime = async () => {
  channel = supabase
    .channel('visitation-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'visitation',
        filter: `user_id=eq.${userId}`,
      },
      () => {
        fetchRequests() // Refresh list on any insert/update/delete for this user
      }
    )
    .subscribe()
}

onMounted(async () => {
  await fetchRequests()
  await setupRealtime()
})

onBeforeUnmount(() => {
  if (channel) {
    supabase.removeChannel(channel)
  }
})
</script>

<style scoped>
h3 {
  font-weight: bold;
}
</style>
