<script setup lang="ts">
import { getDataFromStore, saveDataToStore } from '@/functions/store';
import { ref } from 'vue';

const formatJson = (raw: string) => {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2)
  } catch {
    return raw
  }
}

const dataFromStore = getDataFromStore() ?? ""
const dataFromStoreFormatted = formatJson(dataFromStore)
const textInput = ref(dataFromStoreFormatted)

const save = () => {
  saveDataToStore(textInput.value)
  emit('close')
}

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div>
    <textarea v-model=textInput rows="20" cols="100" />
    <button @click="save">Save and Close</button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
}
</style>
