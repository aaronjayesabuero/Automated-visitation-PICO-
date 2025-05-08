<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'

const drawer = ref(false)
const submissions = ref([])
const isLoading = ref(false)
const selectedSubmission = ref(null)
const denyComment = ref('')
const isDenyDialogOpen = ref(false)

const buttons = [
{ label: 'DASHBOARD', path: '/dashboard' },
  { label: 'SUBMISSIONS', path: '/admin/submissions' },
  { label: 'LOG OUT', path: '/' }
]

const fetchSubmissions = async () => {
  try {
    isLoading.value = true
    const { data, error } = await supabase
      .from('visitation_requests')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    submissions.value = data || []
  } catch (error) {
    console.error('Error fetching submissions:', error)
  } finally {
    isLoading.value = false
  }
}

const approveSubmission = async (id) => {
  try {
    const { error } = await supabase
      .from('visitation_requests')
      .update({ status: 'Approved' })
      .eq('id', id)
    
    if (error) throw error
    await fetchSubmissions()
  } catch (error) {
    console.error('Approval error:', error)
  }
}

const openDenyDialog = (submission) => {
  selectedSubmission.value = submission
  isDenyDialogOpen.value = true
}

const denySubmission = async () => {
  try {
    if (!denyComment.value.trim()) {
      alert('Please provide a reason for denial')
      return
    }
    
    const { error } = await supabase
      .from('visitation_requests')
      .update({ 
        status: 'Denied',
        admin_comment: denyComment.value 
      })
      .eq('id', selectedSubmission.value.id)
    
    if (error) throw error
    
    denyComment.value = ''
    isDenyDialogOpen.value = false
    await fetchSubmissions()
  } catch (error) {
    console.error('Denial error:', error)
  }
}

onMounted(() => {
  fetchSubmissions()
})
</script>

<template>
  <v-responsive class="border rounded" max-height="max">
    <v-app>
      <v-navigation-drawer v-model="drawer" temporary app>
        <v-list>
          <v-list-item v-for="(btn, i) in buttons" :key="i">
            <router-link :to="btn.path" class="text-decoration-none w-100">
              <v-list-item-title class="text-black">{{ btn.label }}</v-list-item-title>
            </router-link>
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
            <router-link :to="btn.path" style="text-decoration: none">
              <v-btn color="#D9D9D9" class="text-black" height="40" width="180">{{ btn.label }}</v-btn>
            </router-link>
          </v-col>
        </v-row>
      </v-app-bar>

      <v-main style="height: 100vh; overflow-y: auto">
        <v-container>
          <v-sheet elevation="1" color="#F5FDE3" rounded max-width="1200" class="mx-auto pa-6">
            <h2 class="font-weight-bold mb-6 text-center">VISITATION REQUESTS</h2>
            
            <v-card v-if="isLoading" class="text-center py-8">
              <v-progress-circular indeterminate color="green"></v-progress-circular>
              <p class="mt-4">Loading submissions...</p>
            </v-card>

            <v-data-table
              v-else
              :headers="[
                { title: 'Request ID', key: 'id' },
                { title: 'Institution', key: 'institution' },
                { title: 'Purpose', key: 'purpose' },
                { title: 'Preferred Date', key: 'preferredDate' },
                { title: 'Status', key: 'status' },
                { title: 'Actions', key: 'actions' }
              ]"
              :items="submissions"
              class="elevation-1"
            >
              <template v-slot:item.status="{ item }">
                <v-chip :color="item.status === 'Approved' ? 'green' : item.status === 'Denied' ? 'red' : 'orange'">
                  {{ item.status }}
                </v-chip>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn
                  v-if="item.status === 'Pending'"
                  color="green"
                  size="small"
                  class="mr-2"
                  @click="approveSubmission(item.id)"
                >
                  Approve
                </v-btn>
                <v-btn
                  v-if="item.status === 'Pending'"
                  color="red"
                  size="small"
                  @click="openDenyDialog(item)"
                >
                  Deny
                </v-btn>
                <span v-else class="text-grey">Processed</span>
              </template>
            </v-data-table>
          </v-sheet>
        </v-container>

        <v-dialog v-model="isDenyDialogOpen" max-width="500">
          <v-card>
            <v-card-title class="headline">Deny Request</v-card-title>
            <v-card-text>
              <p>Request from: <strong>{{ selectedSubmission?.institution }}</strong></p>
              <p>Purpose: {{ selectedSubmission?.purpose }}</p>
              
              <v-textarea
                v-model="denyComment"
                label="Reason for denial"
                variant="outlined"
                class="mt-4"
                required
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" @click="isDenyDialogOpen = false">Cancel</v-btn>
              <v-btn color="red" @click="denySubmission">Confirm Denial</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-footer class="text-center d-flex flex-column ga-1 py-2" color="#100A08">
          <div class="d-flex justify-center align-center pa-1">
            <v-img src="/csulogo.png" width="100" height="100" alt="CSU Logo"></v-img>
          </div>
          <div class="text-caption font-weight-bold opacity-60">
            <span>Copyright © 2025 All rights reserved.</span>
            <a
              href="https://www.carsu.edu.ph/"
              target="_blank"
              rel="noopener"
              class="text-decoration-underline mt-1 white--text"
            >
              Caraga State University
            </a>
          </div>
          <v-divider></v-divider>
        </v-footer>
      </v-main>
    </v-app>
  </v-responsive>
</template>