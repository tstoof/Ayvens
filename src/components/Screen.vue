<script setup lang="ts">
    import { ref } from 'vue'

    const result = ref('0')
    const buttonsDisabled = ref(false)

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

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement
        target.value = target.value.replace(/,/g, '.')
        result.value = target.value
        if (result.value.length === 0) {
            result.value = "0"
        }
    }

</script>

<template>
     
    <input id="screen" 
        type="text" 
        v-model="result"
        @input="handleInput"
        @keyup.enter="handleEnter"        
    />
   
</template>

<style scoped>

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

</style>