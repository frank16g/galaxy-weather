<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
    <div class="max-w-3xl mx-auto px-4 py-10">
      <header class="text-center text-white mb-8">
        <h1 class="text-3xl font-bold">🌤 Galaxy Weather</h1>
        <p class="opacity-80">Consulta el clima de tu ciudad</p>
      </header>

      <div class="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl">
        <SearchBar :loading="loading" @search="onSearch" />

        <p v-if="error" class="text-red-300 mt-4">{{ error }}</p>
        <p v-else-if="loading" class="text-white/80 mt-4">Cargando…</p>

        <WeatherCard v-if="weather" class="mt-5" :weather="weather" />
      </div>

      <CityHistory
        class="mt-6"
        :items="historyItems"
        @select="onSearch"
        @remove="onRemoveFromHistory"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '@/components/ui/SearchBar.vue'
import WeatherCard from '@/components/ui/WeatherCard.vue'
import CityHistory from '@/components/ui/CityHistory.vue'
import { useWeather } from '@/composables/useWeather'
import { useCityHistory } from '@/composables/useCityHistory'

// clima actual
const { fetchByCity, data, loading, error } = useWeather()
const weather = data

// historial
const { cities, add, remove } = useCityHistory()

type HistoryItem = {
  city: string
  country?: string
  temp?: number
}

const historyItems = computed<HistoryItem[]>(() => {
  const items: HistoryItem[] = cities.value.map(c => ({ city: c as string }))
  // si el clima actual pertenece a una ciudad del historial, se agrega la info
  if (weather.value && cities.value.includes(weather.value.name.toLowerCase())) {
    const idx = items.findIndex(i => i.city === weather.value!.name.toLowerCase())
    if (idx !== -1) {
      items[idx] = {
        city: weather.value.name.toLowerCase(),
        country: weather.value.sys?.country,
        temp: weather.value.main?.temp
      }
    }
  }
  return items
})

async function onSearch(city: string) {
  const res = await fetchByCity(city)
  if (res) add(res.name) 
}

function onRemoveFromHistory(city: string) {
  remove(city)
}
</script>
