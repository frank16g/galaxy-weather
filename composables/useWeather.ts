import { ref } from 'vue'
import type { WeatherResponse } from '@/types/weather'

export function useWeather() {
  const data = ref<WeatherResponse | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function geocode(city: string, key: string) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`
    return await $fetch<{ name: string; lat: number; lon: number; country?: string }[]>(url)
  }

  async function fetchByCity(city: string): Promise<WeatherResponse | null> {
    loading.value = true
    error.value = null
    try {
      const config = useRuntimeConfig()
      const key = config.public.openWeatherKey || ''
      if (!key) throw new Error('Falta configurar NUXT_PUBLIC_OPENWEATHER_KEY')

      const term = city.trim()
      if (!term) { error.value = 'Introduce una ciudad'; return null }

      const results = await geocode(term, key)
      if (!results?.length) { error.value = 'Ciudad no encontrada'; return null }

      const { lat, lon } = results[0]!
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${key}`
      const res = await $fetch<WeatherResponse>(url)
      data.value = res
      return res
    } catch (e: any) {
      error.value = e?.data?.message || e?.message || 'Error al consultar el clima'
      return null
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchByCity }
}
