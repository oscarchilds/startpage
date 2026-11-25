<script setup lang="ts">
import Search from './components/Search.vue';
import type { Site } from './types';

const sites: Site[] = [
  {
    name: 'GitHub',
    url: 'https://github.com'
  }
]
</script>

<template>
  <div class="container">
    <Search :sites="sites" />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
</style>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #262a33;
}
</style>
