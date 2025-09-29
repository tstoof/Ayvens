<script setup lang="ts">
import { ref } from 'vue'
import Buttons from './components/Buttons.vue'
import Screen from './components/Screen.vue'
import ButtonsContainer from './components/ButtonsContainer.vue'

const result = ref('0')
const buttons = ['(', ')', '%', 'CE', '7', '8', '9','/','4', '5', '6','*','1', '2', '3','-', '0', '.', '=', '+' ]
const buttonsDisabled = ref(false)
const operatorsList = ['(', ')', '+', '-', '%', '*', '/']

const handleClick = (value: string) => {
    const lastChar = result.value[result.value.length - 1]  
    
    if (lastChar === '=') {
        result.value = '0'
    }

    if (value === "CE") {
        result.value = "0"
        return
    }

    if (value === "=") {

        try {
            result.value = eval(result.value).toString()  
        }
        catch (error) {
            result.value = "Error"
            buttonsDisabled.value = true
            setTimeout(() => {
                result.value = '0'
                buttonsDisabled.value = false
            }, 1000)
        }
        return
    }

    if (operatorsList.includes(value)) {
        if (operatorsList.includes(lastChar!)) {
            result.value = result.value.slice(0,-1) + value
        } else {
            result.value += value
        }
        return
    }

    if (result.value === "0") {
        result.value = value
    }
    else if (value !== "=") {
        result.value += value
    }
}
 


</script>

<template>
    <div id="calculator_background">
        <Screen/>
        <div id="buttons_container">
            <div 
                class="button" 
                v-for="(button, index) in buttons"
                :key="index"
                @click="handleClick(button)"
                :style="{pointerEvents: buttonsDisabled?'none': 'auto', opacity: buttonsDisabled ? 0.5 : 1 }"
            >
                <Buttons :operator="button"/>
            </div>
        </div>
        


    </div>
</template>

<style scoped>
    #calculator_background {
        border: 0.5px grey solid;
        padding-bottom: 30px;
        padding-top: 100px;
        padding-left: 30px;
        padding-right: 30px;
        background-color: cadetblue;
        border-radius: 5%;
        box-shadow: 10px 5px 5px rgb(41, 40, 40);
       }  

    #buttons_container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    } 
</style>