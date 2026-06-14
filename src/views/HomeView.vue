<script setup>
    import {
        MDCTextField
    } from '@material/textfield';
    import {
        ref,
        computed,
        onMounted,
    } from 'vue';

    import PokemonCard from '../components/PokemonCard.vue'
    import PokemonSheet from '../components/PokemonSheet.vue';

    const props = defineProps({
        pokemons: Array
    })

    const visiblePokemon = computed(() => {
        if (!search.value.trim()) {
            return props.pokemons.slice(0, amount.value)
        }

        return props.pokemons.filter(pokemon =>
            pokemon.name
            .toLowerCase()
            .includes(search.value.toLowerCase())
        )
    })

    const sheet = ref(null)

    function openSheet(id) {
        if (sheet.value)
            sheet.value.openSheet(id)
    }

    const searchRef = ref(null)
    const lazyLoader = ref(null)

    let observer = null

    onMounted(() => {
        new MDCTextField(searchRef.value)

        observer = new IntersectionObserver((entries) => {
            const e = entries[0]
            if (e.isIntersecting) loadPokemon()
        }, {
            root: null,
            rootMargin: '400px',
            threshold: 0.1
        })
        if (lazyLoader.value) observer.observe(lazyLoader.value)
    })

    const search = ref('')
    const amount = ref(20)

    function loadPokemon() {
        amount.value += 20
    }
</script>

<template>
    <PokemonSheet ref="sheet" :pokemons="visiblePokemon" />

    <main class="mdc-top-app-bar--fixed-adjust">
        <label ref="searchRef" class="mdc-text-field mdc-text-field--filled">
            <span class="mdc-text-field__ripple"></span>
            <span class="mdc-floating-label" id="my-label-id">Search Pokemon</span>
            <input v-model="search" class="mdc-text-field__input" type="text" aria-labelledby="my-label-id">
            <span class="mdc-line-ripple"></span>
        </label>

        <div class="pokemon-wrapper">
            <PokemonCard v-for="pokemon in visiblePokemon" :key="pokemon.id" :name="pokemon.name"
                :url="pokemon.url" :id="pokemon.id" image="pokemon.image" @click="openSheet(pokemon.id)" />
        </div>

        <div ref="lazyLoader" style="height:1px"></div>
    </main>
</template>

<style scoped>
    main {
        display: block;
    }

    .mdc-text-field {
        width: 100%;
    }
</style>
