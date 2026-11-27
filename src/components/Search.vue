<script setup lang="ts">
import Spinner from './Spinner.vue';
import { getSitesFromStore } from '@/functions/store';
import { computed, onMounted, ref, shallowRef, useTemplateRef } from 'vue';

const sites = getSitesFromStore()

const text = ref('')
const textInput = useTemplateRef('text-input')
const selectedIndex = ref(0)
const isLoading = ref(false)

const currentSites = shallowRef(sites)

const filteredSites = computed(() => {
  return currentSites.value
    .filter((x) => x.name.toLowerCase().startsWith(text.value.toLowerCase()))
    .slice(0, 4)
})

onMounted(() => {
  if (!textInput.value) return

  textInput.value.onkeydown = (event) => {
    const selectedSite = filteredSites.value[selectedIndex.value]

    if (event.code == 'Enter') {
      isLoading.value = true

      if (selectedSite) {
        window.location.href = selectedSite.url
      } else {
        const query = textInput.value
        window.location.href = `https://www.google.com/search?q=${query}`
      }
    }

    if (event.code == 'Tab') {
      event.preventDefault()

      if (!selectedSite?.children) return

      currentSites.value = selectedSite.children
      text.value = ''
    }

    if (event.code == 'ArrowDown') {
      selectedIndex.value = Math.min(selectedIndex.value + 1, filteredSites.value.length - 1)
    }

    if (event.code == 'ArrowUp') {
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
    }

    if (event.code == 'Escape') {
      currentSites.value = sites
    }
  }

  textInput.value?.focus()
})
</script>

<template>
  <div class="search">
    <input v-model="text" ref="text-input" />
    <div v-if="isLoading" class="loading">
      <Spinner />
    </div>
    <div
      v-else
      v-for="(site, key) in filteredSites"
      :key="key"
      class="item"
      :class="{ selected: key == selectedIndex }"
    >
      {{ site.name }}
    </div>
  </div>
</template>

<style scoped>
.search  {
  width: fit-content;
  height: 310px;
  display: flex;
  flex-direction: column;
  background-color: #20232a;
  padding: 10px;
  border-radius: 10px;

  .loading {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    width: 500px;
    height: 50px;
    font-size: 20px;
    background-color: #2b303b;
    appearance: none;
    border: 1px solid #6f6b73;
    color: #b9b4bf;
    border-radius: 10px;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  .item {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #b9b4bf;
    font-size: 18px;
  }

  .selected {
    background-color: #23262e;
    color: #05debe;
  }
}
</style>
