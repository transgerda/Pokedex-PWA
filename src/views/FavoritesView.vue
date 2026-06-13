<script setup>
    import PokemonCard from '../components/PokemonCard.vue'
    import PokemonSheet from '../components/PokemonSheet.vue';

    import {
        computed,
        ref,
        onMounted,
    } from 'vue';

    const sheet = ref(null)

    function openSheet(id) {
        if (sheet.value)
            sheet.value.openSheet(id)
    }

    const storedFavorites = localStorage.getItem('favorites')
    const favoritePokemons = ref(storedFavorites ? JSON.parse(storedFavorites) : [])

    const props = defineProps({
        pokemons: Array,
    })

    const visiblePokemon = computed(() => {
        return props.pokemons.filter(p => favoritePokemons.value.includes(p.id))
    })

    function handleStorageChange() {
        favoritePokemons.value = JSON.parse(localStorage.getItem('favorites'))
    }

    onMounted(() => {
        window.addEventListener('favorites-changed', handleStorageChange)
    })
</script>

<template>
    <PokemonSheet ref="sheet" :pokemons="visiblePokemon" />

    <main class="mdc-top-app-bar--fixed-adjust">
        <div v-if="visiblePokemon.length" class="pokemon-wrapper">
            <PokemonCard v-for="pokemon in visiblePokemon" :key="pokemon.id" :name="pokemon.name"
                :url="pokemon.url" :id="pokemon.id" :image="pokemon.image" @click="openSheet(pokemon.id)" />
        </div>
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
