# 🌤 Galaxy Weather

Aplicación web en **Nuxt 3** para consultar el clima actual de cualquier ciudad usando la API de [OpenWeatherMap](https://openweathermap.org/).  
Guarda un historial de búsquedas en LocalStorage y muestra los datos con iconografía dinámica.

## 🚀 Funcionalidades
- Buscar ciudad y mostrar:
  - Estado meteorológico con iconos
  - Temperatura actual, máxima y mínima
  - Presión, humedad, visibilidad y viento
- Historial persistente de ciudades
- Diseño responsive con **Tailwind CSS**

## 📦 Tecnologías
Nuxt 3 · Vue 3 · TypeScript · Tailwind CSS · OpenWeatherMap API

## ⚙️ Instalación
```bash
git clone https://github.com/frank16g/galaxy-weather.git
cd galaxy-weather
npm install
cp .env.example .env   # Añadir API Key de OpenWeatherMap
npm run dev

## 📂 Variables de entorno
Variable                           Descripción               
---------------------------------  ------------------------- 
`NUXT_PUBLIC_OPENWEATHER_API_KEY`  API Key de OpenWeatherMap 

## 👨‍💻 Autor
Rafael Guillén Carrera
