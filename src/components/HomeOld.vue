<script setup>
    import {
        MDCTextField
    } from '@material/textfield';
    import {
        ref,
        onMounted,
        watch,
    } from 'vue';

    import PokemonCard from './PokemonCard.vue'
    import Header from './Header.vue'
    import PokemonSheet from './PokemonSheet.vue';

    const props = defineProps({
        pokemons: Array
    })

    const emit = defineEmits([
        'search',
        'openDrawer',
        'loadPokemon',

    ])

    function openDrawer() {
        emit('openDrawer')
    }

    const sheet = ref(null)

    function openSheet(id) {
        if (sheet.value)
            sheet.value.openSheet(id)
    }

    const searchRef = ref(null)
    const q = ref('')
    const lazyLoader = ref(null)

    let observer = null

    onMounted(() => {
        new MDCTextField(searchRef.value)

        observer = new IntersectionObserver((entries) => {
            const e = entries[0]
            if (e.isIntersecting) emit('loadPokemon')
        }, {
            root: null,
            rootMargin: '200px',
            threshold: 0.1
        })
        if (lazyLoader.value) observer.observe(lazyLoader.value)
    })

    watch(q, () => {
        emit('search', q.value)
    })
</script>

<template>
    <PokemonSheet ref="sheet" :pokemons="pokemons" />

    <Header @openDrawer="openDrawer" />

    <main class="mdc-top-app-bar--fixed-adjust">
        <label ref="searchRef" class="mdc-text-field mdc-text-field--filled">
            <span class="mdc-text-field__ripple"></span>
            <span class="mdc-floating-label" id="my-label-id">Search Pokemon</span>
            <input v-model="q" class="mdc-text-field__input" type="text" aria-labelledby="my-label-id">
            <span class="mdc-line-ripple"></span>
        </label>

        <div class="pokemon-wrapper">
            <PokemonCard v-for="pokemon in pokemons" :key="pokemon.id" :name="pokemon.name"
                :url="pokemon.url" :id="pokemon.id" :image="pokemon.image" @click="openSheet(pokemon.id)" />
        </div>

        <div ref="lazyLoader" style="height:1px"></div>
    </main>
</template>

<style scoped>
    main {
        display: block;
    }

    .pokemon-wrapper {
        margin: 20px;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }


    .mdc-text-field {
        width: 100%;
    }
</style>
