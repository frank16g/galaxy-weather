// composables/useCityHistory.ts
import { ref, onMounted } from 'vue'
import { useWeather } from './useWeather'
import type { WeatherResponse } from '@/types/weather'

const cities = ref<string[]>([])

export function useCityHistory() {
  function loadFromStorage() {
    if (!process.client) return
    try {
      const raw = localStorage.getItem('cities')
      const parsed = raw ? JSON.parse(raw) : []
      cities.value = Array.isArray(parsed) ? parsed : []
    } catch {
      cities.value = []
    }
  }

  function saveToStorage() {
    if (!process.client) return
    localStorage.setItem('cities', JSON.stringify(cities.value))
  }

  function add(city: string) {
    const c = city.trim()
    if (!c) return
    // lo ponemos al principio, evitando duplicados
    cities.value = [c, ...cities.value.filter(x => x.toLowerCase() !== c.toLowerCase())]
    saveToStorage()
  }

  function remove(city: string) {
    const c = city.trim()
    cities.value = cities.value.filter(x => x.toLowerCase() !== c.toLowerCase())
    saveToStorage()
  }

  async function fetchWeatherForCities(): Promise<WeatherResponse[]> {
    // asegurar que en cliente cargamos storage
    if (process.client && cities.value.length === 0) loadFromStorage()

    const { fetchByCity } = useWeather()
    const result: WeatherResponse[] = []
    for (const c of cities.value) {
      const w = await fetchByCity(c, false)
      if (w) result.push(w)
    }
    return result
  }

  onMounted(loadFromStorage)

  return { cities, add, remove, fetchWeatherForCities, loadFromStorage }
}
