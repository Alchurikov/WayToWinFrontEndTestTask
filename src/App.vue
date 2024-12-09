<template>
  <header class="bg-blue-600 text-white p-4">
    <nav class="container mx-auto">
      <ul class="flex space-x-6">
        <li>
          <RouterLink
            to="/doctors"
            class="hover:text-blue-200 transition-colors"
            :class="{ 'font-bold': $route.path === '/doctors' }"
          >
            Doctors
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/nurses"
            class="hover:text-blue-200 transition-colors"
            :class="{ 'font-bold': $route.path === '/nurses' }"
          >
            Nurses
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>

  <main class="container mx-auto p-4">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped></style>
