<template>
  <div v-if="weather" class="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-lg text-white">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold">
          {{ weather.name }}
          <span class="text-sm opacity-80">({{ country }})</span>
        </h2>
        <p class="capitalize opacity-80">{{ weather.weather?.[0]?.description }}</p>
      </div>
      <div class="text-5xl font-bold">{{ Math.round(weather.main.temp) }}°C</div>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-5 text-sm">
      <div class="flex justify-between"><span>Máx / Mín</span><span>{{ tMax }}° / {{ tMin }}°</span></div>
      <div class="flex justify-between"><span>Humedad</span><span>{{ weather.main.humidity }}%</span></div>
      <div class="flex justify-between"><span>Presión</span><span>{{ weather.main.pressure }} hPa</span></div>
      <div class="flex justify-between"><span>Viento</span><span>{{ windKmh }} km/h</span></div>
      <div class="flex justify-between"><span>Visibilidad</span><span>{{ visibilityText }}</span></div>
      <div class="flex justify-between"><span>Actualización</span><span>{{ timeText }}</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { WeatherResponse } from '@/types/weather'
import { computed } from 'vue'

const props = defineProps<{ weather: WeatherResponse }>()

const country = computed(() => props.weather?.sys?.country ?? '-')
const tMax = computed(() => Math.round(props.weather.main.temp_max))
const tMin = computed(() => Math.round(props.weather.main.temp_min))
const windKmh = computed(() => {
  const ms = props.weather.wind?.speed ?? 0
  return Math.round(ms * 3.6)
})
const visibilityText = computed(() => {
  const v = props.weather.visibility
  return typeof v === 'number' ? `${(v/1000).toFixed(1)} km` : '—'
})
const timeText = computed(() =>
  props.weather.dt ? new Date(props.weather.dt * 1000).toLocaleString() : '—'
)
</script>
