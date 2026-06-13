<script setup>
    import Header from './Header.vue'
    const emit = defineEmits(['openDrawer']);

    function openDrawer() {
        emit('openDrawer')
    }

    const storedFavorites = localStorage.getItem('favorites')
    const favoritePokemons = storedFavorites ? JSON.parse(storedFavorites) : []
</script>

<template>
    <Header @openDrawer="openDrawer" />

    <main class="mdc-top-app-bar--fixed-adjust">
        <template v-if="favoritePokemons.length">

        </template>
        <template v-else>
            <h2 class="noPokemon">No favorite pokemons</h2>
        </template>
    </main>
</template>

<style scoped>
    * {
        font-family: Roboto;
    }

    .noPokemon {
        text-align: center;
        font-size: 2em;
    }
</style>
