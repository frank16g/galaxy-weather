<template>
  <div class="max-w-2xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold text-sky-400">🌤 Galaxy Weather</h1>
    <p class="text-slate-300">Consulta el clima por ciudad</p>

    <UiSearchBar @search="onSearch" />

    <div v-if="loading" class="text-slate-400">Cargando…</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>

    <UCard v-else-if="weather">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-xl font-semibold">
            {{ weather.name }}
            <span v-if="country" class="text-slate-400 text-sm">({{ country }})</span>
          </h2>
          <p class="capitalize text-slate-400">{{ weather.weather?.[0]?.description }}</p>
        </div>
        <div class="text-4xl font-bold">{{ Math.round(weather.main.temp) }}°C</div>
      </div>

      <div class="grid grid-cols-2 gap-3 mt-4 text-sm">
        <div class="flex justify-between"><span>Máx / Mín</span><span>{{ Math.round(weather.main.temp_max) }}° / {{ Math.round(weather.main.temp_min) }}°</span></div>
        <div class="flex justify-between"><span>Humedad</span><span>{{ weather.main.humidity }}%</span></div>
        <div class="flex justify-between"><span>Presión</span><span>{{ weather.main.pressure }} hPa</span></div>
        <div class="flex justify-between"><span>Viento</span><span>{{ windText }}</span></div>
        <div class="flex justify-between"><span>Visibilidad</span><span>{{ visibilityText }}</span></div>
        <div class="flex justify-between"><span>Actualización</span><span>{{ timeText }}</span></div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWeather } from '@/composables/useWeather'

const { data, loading, error, fetchByCity } = useWeather()

const weather = data
const country = computed(() => weather.value?.sys?.country ?? '')
const windText = computed(() => weather.value?.wind ? `${(weather.value.wind.speed * 3.6).toFixed(0)} km/h` : 'N/A')
const visibilityText = computed(() => typeof weather.value?.visibility === 'number' ? `${(weather.value.visibility / 1000).toFixed(1)} km` : 'N/A')
const timeText = computed(() => weather.value?.dt ? new Date(weather.value.dt * 1000).toLocaleString() : '-')

async function onSearch(city: string) {
  await fetchByCity(city)
}
</script>
