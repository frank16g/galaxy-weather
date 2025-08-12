<template>
  <UApp>
    <div class="min-h-dvh bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-white">
      <header class="border-b border-white/10">
        <nav class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <h1 class="text-lg font-semibold tracking-tight">🌤️ Galaxy Weather</h1>
          <div class="text-xs text-white/60">Nuxt + Tailwind + @nuxt/ui</div>
        </nav>
      </header>

      <main class="mx-auto max-w-5xl px-4 py-8">
        <slot />
      </main>

      <footer class="mt-10 border-t border-white/10">
        <div class="mx-auto max-w-5xl px-4 py-6 text-xs text-white/50">
          Galaxy Weather © 2025
        </div>
      </footer>
    </div>
  </UApp>
</template>
