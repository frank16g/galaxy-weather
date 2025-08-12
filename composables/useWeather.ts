// composables/useWeather.ts
import { ref } from 'vue'
import type { WeatherResponse } from '@/types/weather'

export function useWeather() {
  const data = ref<WeatherResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Geocodificación se mantiene solo para extremos diarios si la usas en otro sitio
  async function geocode(city: string, key: string) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`
    return await $fetch<{ name: string; lat: number; lon: number; country?: string }[]>(url)
  }

  // ✅ Para obtener el clima usamos weather?q=... en lugar de geocodificar
  async function fetchByCity(city: string, setData = true): Promise<WeatherResponse | null> {
    loading.value = true
    error.value = null
    try {
      const config = useRuntimeConfig()
      const key = config.public.openWeatherKey ?? ''
      if (!key) throw new Error('Falta configurar la API key de OpenWeather')

      const term = city.trim()
      if (!term) { error.value = 'Introduce una ciudad'; return null }

      // Pedir el tiempo directamente por nombre de ciudad (lang=es para descripciones en español)
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(term)}&units=metric&lang=es&appid=${key}`
      const res = await $fetch<WeatherResponse>(url)
      if (setData) data.value = res
      return res
    } catch (e: any) {
      error.value = e?.data?.message || e?.message || 'Error al consultar el clima'
      return null
    } finally {
      loading.value = false
    }
  }

  // 🔥 La función de extremos diarios se mantiene, si la usas, pero mejorando la precisión.
  async function fetchDailyExtremesByCity(city: string) {
    const config = useRuntimeConfig()
    const key = config.public.openWeatherKey ?? ''
    if (!key) throw new Error('Falta API key')

    const results = await geocode(city, key)
    if (!results?.length) throw new Error('Ciudad no encontrada')
    const { lat, lon } = results[0]!

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${key}`
    const forecast = await $fetch<{ list: Array<{ dt: number; main: { temp: number; temp_min: number; temp_max: number } }> }>(url)

    const next24 = forecast.list.slice(0, 8)
    const mins = next24.map(i => i.main.temp_min)
    const maxs = next24.map(i => i.main.temp_max)

    return {
      min: Math.round(Math.min(...mins)),
      max: Math.round(Math.max(...maxs))
    }
  }

  return { fetchByCity, fetchDailyExtremesByCity, data, loading, error }
}
