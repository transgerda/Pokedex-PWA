<script setup>
    import {
        onMounted,
    } from 'vue'

    const props = defineProps({
        id: String,
        name: String,
        url: String
    })

    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`
</script>

<template>
    <div class="pokemon-card">
        <img :src="image" :alt="name" />
        <h2>{{ name }}</h2>
    </div>
</template>

<style scoped>
    .pokemon-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 1rem;
        text-align: center;

        img {
            height: 96px;
        }
    }
</style>
