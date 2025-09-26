<script setup lang="ts">
import { ref } from 'vue'

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

const handleEnter = () => {
    try {
        result.value = eval(result.value).toString()
    } catch {
        result.value = 'Error'
        buttonsDisabled.value = true
        setTimeout(() => {
            result.value = '0'
            buttonsDisabled.value = false
        }, 1000)
    }
}   


</script>

<template>
    <div id="calculator_background">
        
        <input id="screen" 
            type="text" 
            v-model="result"
            @keyup.enter="handleEnter"        
        />

        <div id="buttons_container">
            <div 
                class="button" 
                v-for="(button, index) in buttons"
                :key="index"
                :class="{
                    CE: button === 'CE', 
                    answer: button === '=', 
                    operators: operatorsList.includes(button)
                }"
                @click="handleClick(button)"
                :style="{pointerEvents: buttonsDisabled?'none': 'auto', opacity: buttonsDisabled ? 0.5 : 1 }"
            >
                {{ button }}
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

    #screen {
        background-color: beige;
        width: 250px;
        position: relative;
        height: 70px;
        top: -60px;
        font-size: 25px;
        text-align: right;
        padding-right: 10px;
        border-radius: 5%;
    }


    .button {
        border: 1px solid rgb(138, 137, 137);
        background-color: whitesmoke;
        cursor: pointer;
        text-align: center;
        font-size: 20px;
        border-radius: 15%;
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

    #buttons_container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
</style>