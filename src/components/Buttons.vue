<script setup lang="ts">
const props = defineProps<{
  operator: string
}>()

// Define which symbols are operators
const operatorSymbols = ['+', '-', '*', '/', '%', '(', ')']
</script>

<template>
  <div 
    class="button"
    :class="{
      CE: props.operator === 'CE',
      answer: props.operator === '=',
      operators: operatorSymbols.includes(props.operator)
    }"
  >
    {{ props.operator }}
  </div>
</template>

<style scoped>
.button {
  border: 1px solid rgb(138, 137, 137);
  cursor: pointer;
  text-align: center;
  font-size: 20px;
  border-radius: 15%;
  height: 30px;
  width: 100%;
  background-color: whitesmoke;
}

.button.CE {
  background-color: rgb(219, 102, 102);
}

.button.answer {
  background-color: rgb(78, 188, 240);
}

.button.operators {
  background-color: rgb(188, 251, 253);
}

.button:hover {
  background-color: rgb(194, 191, 191);
}

.button.CE:hover {
  background-color: rgb(167, 67, 67);
}

.button.answer:hover {
  background-color: rgb(38, 135, 180);
}

.button.operators:hover {
  background-color: rgb(119, 214, 218);
}
</style>
