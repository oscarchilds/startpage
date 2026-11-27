<script setup lang="ts">
import { getDataFromStore, saveDataToStore } from '@/functions/store';
import { ref } from 'vue';

const data = getDataFromStore() ?? ""

const textInput = ref(data)

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
