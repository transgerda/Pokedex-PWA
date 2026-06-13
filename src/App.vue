<script setup>
    import Header from './components/Header.vue'
    import Drawer from './components/Drawer.vue'
    import './styles/main.scss'
    import {
        ref,
        computed
    } from 'vue'

    const storedPokemon = localStorage.getItem('pokemons')
    const pokemons = ref(storedPokemon ? JSON.parse(storedPokemon) : [])

    if (!pokemons.value.length) {
        console.log('fetching pokemons...')

        fetch('https://pokeapi.co/api/v2/pokemon?limit=9999')
            .then(response => response.json())
            .then(data => {
                pokemons.value = data.results.map(pokemon => ({
                    id: pokemon.url.split('/').reverse()[1],
                    name: pokemon.name,
                    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').reverse()[1]}.png`,
                    url: pokemon.url,
                }))
                localStorage.setItem('pokemons', JSON.stringify(pokemons.value))
            })
            .catch(error => console.error(error))
    }

    const drawer = ref(null)

    function openDrawer() {
        if (drawer.value)
            drawer.value.openDrawer()
    }
</script>

<template>

    <head>
        <meta name="description" content="A simple pokedex app built with Vue.js and Material Design Components" />
        <meta name="msaplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
    </head>

    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet">

    <Drawer ref="drawer" />
    <Header @openDrawer="openDrawer" />

    <router-view :pokemons="pokemons" />
</template>

<style>
    * {
        font-family: Roboto;
    }

    .pokemon-wrapper {
        margin: 20px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
</style>
