<template>
  <form class="flex gap-2" @submit.prevent="submit">
    <UInput v-model="term" placeholder="Busca una ciudad… (p.ej. Madrid)" class="flex-1" />
    <UButton type="submit">Buscar</UButton>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ (e: 'search', city: string): void }>()
const term = ref('')

function submit() {
  const value = term.value.trim()
  if (!value) return
  emit('search', value)
}
</script>
