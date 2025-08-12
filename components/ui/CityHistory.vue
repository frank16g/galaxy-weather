<script setup lang="ts">
import type { WeatherResponse } from '@/types/weather'
import { computed } from 'vue'
// ⬇️ usa la ruta donde tengas el helper:
import { getWeatherIcon } from '@/composables/getWeatherIcon' // o '@/utils/getWeatherIcon'

const props = defineProps<{ weather: WeatherResponse }>()
const emit = defineEmits<{
  remove: [city: string]
  select: [city: string]
}>()

// Datos derivados
const country = computed(() => props.weather?.sys?.country ?? '')
const windText = computed(() =>
  props.weather?.wind ? `${props.weather.wind.speed} m/s` : 'N/A'
)
const visibilityText = computed(() =>
  typeof props.weather?.visibility === 'number'
    ? `${props.weather.visibility} m`
    : 'N/A'
)
const timeText = computed(() =>
  props.weather?.dt ? new Date(props.weather.dt * 1000).toLocaleString() : '-'
)

// URL del icono oficial de OpenWeather
const iconUrl = computed(() =>
  getWeatherIcon(props.weather?.weather?.[0]?.icon, 4)
)

// Eventos
const onRemove = () => emit('remove', props.weather.name)
const onSelect = () => emit('select', props.weather.name)
</script>

<template>
  <!-- Protegemos SSR: solo pintamos si hay datos -->
  <div v-if="weather"
    class="relative bg-white/10 backdrop-blur-lg p-4 rounded-xl hover:shadow-lg transition cursor-pointer"
    @click="onSelect">
    <!-- Botón eliminar arriba a la derecha -->
    <button class="absolute top-1 right-1 p-1 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
      title="Eliminar ciudad" @click.stop="onRemove">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10 8.586l3.95-3.95a1 1 0 011.414 1.414L11.414 10l3.95 3.95a1 1 0 01-1.414 1.414L10 11.414l-3.95 3.95a1 1 0 01-1.414-1.414L8.586 10l-3.95-3.95A1 1 0 016.05 4.636L10 8.586z"
          clip-rule="evenodd" />
      </svg>
    </button>


    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4 text-left">
        <!-- Icono -->
        <img :src="iconUrl" :alt="weather.weather?.[0]?.description || 'icon'" class="w-14 h-14 meteo-anim" />
        <!-- Info -->
        <div>
          <h3 class="text-lg font-semibold">
            {{ weather.name }}
            <span class="text-xs text-white/70">({{ country }})</span>
          </h3>
          <p class="text-xs capitalize text-white/80">
            {{ weather.weather?.[0]?.description }}
          </p>
        </div>
      </div>

      <!-- Temperatura -->
      <div class="text-2xl font-bold">
        {{ Math.round(weather.main?.temp ?? 0) }}°C
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes floatWeather {
  0% {
    transform: translateY(0)
  }

  50% {
    transform: translateY(-5px)
  }

  100% {
    transform: translateY(0)
  }
}

.meteo-anim {
  animation: floatWeather 3s ease-in-out infinite;
}
</style>
