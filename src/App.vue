<script setup lang="ts">
import { ref } from 'vue';
import Search from './components/Search.vue';
import Edit from './components/Edit.vue';

const editMode = ref(false)
</script>

<template>
  <div class="container">
    <Edit v-if="editMode" @close="editMode = false" />
    <template v-else>
      <Search />
      <button @click="editMode = true">Edit Mode</button>
    </template>
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

button {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
</style>
