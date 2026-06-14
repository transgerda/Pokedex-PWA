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
