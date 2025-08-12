<template>
  <div v-if="items.length" class="mt-6">
    <h3 class="text-white/90 font-semibold mb-3">Historial</h3>
    <ul class="flex flex-col gap-2">
      <li
        v-for="it in items"
        :key="it.city"
        class="group flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2 text-white transition"
      >
        <button class="flex items-center gap-3 flex-1 text-left" @click="emit('select', it.city)">
          <span class="text-xl">🌤️</span>
          <span class="font-medium capitalize">{{ it.city }}</span>
          <span class="opacity-80">({{ it.country ?? '—' }})</span>
          <span class="ml-auto font-semibold">{{ it.temp != null ? Math.round(it.temp) + '°C' : '—' }}</span>
        </button>

        <button
          class="ml-2 p-1.5 rounded-full bg-red-500/80 hover:bg-red-600 active:scale-95 transition"
          title="Eliminar"
          @click.stop="emit('remove', it.city)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 8.586 13.95 4.636a1 1 0 1 1 1.414 1.414L11.414 10l3.95 3.95a1 1 0 0 1-1.414 1.414L10 11.414l-3.95 3.95A1 1 0 0 1 4.636 13.95L8.586 10l-3.95-3.95A1 1 0 1 1 6.05 4.636L10 8.586z" clip-rule="evenodd"/>
          </svg>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
type HistoryItem = { city: string; country?: string; temp?: number }
defineProps<{ items: HistoryItem[] }>()
const emit = defineEmits<{ select: [city: string]; remove: [city: string] }>()
</script>
