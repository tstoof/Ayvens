<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
    result: string
    setResult: (val: string) => void
    buttonsDisabled: boolean
}>()

const handleEnter = () => {
    try {
        props.setResult(eval(props.result).toString())
    } catch {
        props.setResult('Error')
        setTimeout(() => props.setResult('0'), 1000)
    }
}

const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const newValue = target.value.replace(/,/g, '.')
    props.setResult(newValue)
}
</script>

<template>
  <input
    id="screen"
    type="text"
    :value="props.result"
    @input="handleInput"
    @keyup.enter="handleEnter"
    :disabled="props.buttonsDisabled"
  />
</template>

<style scoped>
#screen {
  background-color: beige;
  width: 250px;
  height: 70px;
  font-size: 25px;
  text-align: right;
  padding-right: 10px;
  border-radius: 5%;
  border: 1px solid rgb(138, 137, 137);
  margin-bottom: 20px;
}
</style>
