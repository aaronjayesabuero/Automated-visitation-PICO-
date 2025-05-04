<script setup>
const props = defineProps(['formSuccessMessage', 'formErrorMessage'])
</script>

<template>
  <v-alert
    v-if="props.formSuccessMessage"
    :text="props.formSuccessMessage"
    title="Success"
    type="success"
    closable
  ></v-alert>
  <v-alert
    v-if="props.formErrorMessage"
    :text="props.formErrorMessage"
    title="Error"
    type="error"
    closable
  ></v-alert>
</template>
