<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import WeatherCard from '@/components/ui/WeatherCard.vue'
import CityHistory from '@/components/ui/CityHistory.vue'
import { useWeather } from '@/composables/useWeather'
import { useCityHistory } from '@/composables/useCityHistory'

definePageMeta({ layout: 'default' })

const { fetchByCity, fetchDailyExtremesByCity, data: weather, loading, error } = useWeather()
const { cities, add, remove, fetchWeatherForCities, loadFromStorage } = useCityHistory()

const historyWeather = ref<any[]>([])
const dailyExtremes = ref<{ min: number; max: number } | null>(null)

async function loadHistoryWeather () {
  if (process.client && cities.value.length === 0) {
    loadFromStorage()
  }
  historyWeather.value = await fetchWeatherForCities()
}

// Buscar una ciudad nueva
const onSearch = async (city: string) => {
  const result = await fetchByCity(city)
  if (result) {
    add(result.name)
    dailyExtremes.value = await fetchDailyExtremesByCity(result.name)
    await loadHistoryWeather()
  }
}

// Eliminar ciudad del historial
const removeCity = async (city: string) => {
  remove(city)
  await loadHistoryWeather()
}

// Cargar historial al abrir
onMounted(loadHistoryWeather)
</script>

<template>
  <div class="text-center text-white px-4 py-6">
    <div class="max-w-3xl mx-auto px-4 py-10">
      <header class="text-center text-white mb-8">
        <h1 class="text-3xl font-bold">🌤 Galaxy Weather</h1>
        <p class="opacity-80">Consulta el clima de tu ciudad</p>
      </header>

      <div class="bg-white/10 border border-white/10 rounded-2xl p-5 backdrop-blur-md shadow-xl">
        <SearchBar :loading="loading" @search="onSearch" />

        <p v-if="error" class="text-red-300 mt-4">{{ error }}</p>
        <p v-else-if="loading" class="text-white/80 mt-4">Cargando…</p>

        <div class="max-w-3xl mx-auto">
          <WeatherCard
            v-if="weather"
            class="mt-5"
            :weather="weather"
            :daily-extremes="dailyExtremes"
          />
        </div>
      </div>

      <!-- Historial -->
      <ClientOnly>
        <section class="mt-6 max-w-3xl mx-auto text-left text-white">
          <h2 class="text-xl font-semibold mb-3">Historial</h2>

          <div v-if="historyWeather.length === 0" class="text-white/70">
            No hay búsquedas recientes.
          </div>

          <div class="space-y-2">
            <CityHistory
              v-for="w in historyWeather"
              :key="w.name + '-' + (w.dt || '')"
              :weather="w"
              @select="onSearch"
              @remove="removeCity"
            />
          </div>
        </section>
      </ClientOnly>
    </div>
  </div>
</template>
