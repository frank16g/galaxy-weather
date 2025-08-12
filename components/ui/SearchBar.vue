<template>
  <form class="flex gap-2" @submit.prevent="submit">
    <UInput v-model="term" placeholder="Busca una ciudad (p.ej. Madrid)" class="flex-1" />
    <UButton type="submit" :loading="loading">Buscar</UButton>
  </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{ search: [city: string] }>()
const props = defineProps<{ loading?: boolean }>()

const term = ref('')

function submit() {
  if (term.value.trim()) {
    emit('search', term.value.trim())
  }
}
</script>
