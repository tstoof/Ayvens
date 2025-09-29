<script setup lang="ts">
    import { ref, defineProps, defineEmits } from 'vue'

    const props = defineProps<{
        resultHistory: string[]
    }>()

    const emit = defineEmits<{
        (e: 'updateResult', value: string): void
    }>()

    const showHistory = ref(false)

    const toggleHistory = () => {
        showHistory.value = !showHistory.value
    }

    const selectHistoryItem = (item: string) => {
        const equalIndex = item.indexOf('=')
        const valueAfterEqual = item.slice(equalIndex + 1).trim()
        emit('updateResult', valueAfterEqual)
        showHistory.value = false 
    }
</script>

<template>
    <div id="gap">
        <button id="history-button" @click="toggleHistory">
        H
        </button>

        <div id="historyContainer" v-if="showHistory">
            <div 
            v-for="(item, index) in props.resultHistory" 
            :key="index"
            @click="selectHistoryItem(item)"
            class="history-item"
            >
            {{ item }}
            </div>
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
    background-color: rgb(248, 194, 255);
    }

    #historyContainer {
    margin-top: 10px;
    background-color: #ffdeff;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-height: 200px;
    overflow-y: auto;
    position: relative;
    left: 33%;
    }

    .history-item {
    padding: 5px 10px;
    cursor: pointer;
    }

    .history-item:hover {
    background-color: #f5a4f1;
    }

    #gap {
        margin-bottom: 10px;
        position: relative;
        left: -33%;
    }
</style>
