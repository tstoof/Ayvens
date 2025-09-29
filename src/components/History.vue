<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  resultHistory: string[]
}>()

const showHistory = ref(false)

const toggleHistory = () => {
  showHistory.value = !showHistory.value
}
</script>

<template>
  <button id="history-button" @click="toggleHistory">
    H
  </button>

  <div id="historyContainer"v-if="showHistory">
    <div v-for="(item, index) in props.resultHistory" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<style scoped>
#history-button {
  border: 1px solid rgb(138, 137, 137);
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  border-radius: 15%;
  height: 30px;
  width: 33%;
  background-color: whitesmoke;
}

#historyContainer {
    background-color: rgb(255, 255, 255);
}
</style>
