<template>
  <form @submit.prevent="submit" class="flex justify-center gap-2 mb-6">
    <input
      v-model="term"
      type="text"
      placeholder="Introduce una ciudad"
      class="px-3 py-2 rounded-lg text-white w-64"
    />
    <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700">Buscar</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'
const emit = defineEmits(['search'])
const term = ref('')

function submit() {
  if (!term.value.trim()) return
  emit('search', term.value.trim())
  term.value = ''
}
</script>

<style scoped>
</style>
