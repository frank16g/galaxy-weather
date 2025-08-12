import { ref, computed } from 'vue'

const STORAGE_KEY = 'gw:city-history'

export function useCityHistory() {
  const cities = ref<string[]>([])

  const load = () => {
    if (process.client) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        cities.value = raw ? JSON.parse(raw) : []
      } catch {
        cities.value = []
      }
    }
  }

  const save = () => {
    if (process.client) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cities.value))
    }
  }

  const add = (city: string) => {
    const c = city.trim().toLowerCase()
    if (!c) return
    cities.value = [c, ...cities.value.filter(x => x !== c)].slice(0, 10)
    save()
  }

  const remove = (city: string) => {
    const c = city.trim().toLowerCase()
    cities.value = cities.value.filter(x => x !== c)
    save()
  }

  const clear = () => {
    cities.value = []
    save()
  }

  // cliente
  if (process.client) {
    load()
  }

  return {
    cities: computed(() => cities.value),
    add, remove, clear
  }
}
