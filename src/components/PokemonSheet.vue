<script setup>
    import {
        ref
    } from 'vue'

    const props = defineProps({
        pokemons: Array,
        image: String,
    })

    const sheet = ref(null)
    const placeholderImage = ref(null)
    const pokemon = ref(null)
    const storedFavorites = localStorage.getItem('favorites')
    const favorites = ref(storedFavorites ? JSON.parse(storedFavorites) : [])
    const isFavorite = ref(false)

    function openSheet(id) {
        if (!sheet.value) return

        pokemon.value = props.pokemons.find(p => p.id === id) ?? null
        isFavorite.value = pokemon.value ? favorites.value.includes(pokemon.value.id) : false

        if (placeholderImage.value && pokemon.value) {
            placeholderImage.value.src = pokemon.value.image
        }

        sheet.value.classList.remove('sheet-out-of-view')
        sheet.value.classList.add('sheet-open')
    }

    function nextPokemon() {
        if (!pokemon.value) return

        const currentIndex = props.pokemons.findIndex(p => p.id === pokemon.value.id)
        const nextIndex = (currentIndex + 1) % props.pokemons.length
        openSheet(props.pokemons[nextIndex].id)
    }

    function prevPokemon() {
        if (!pokemon.value) return

        const currentIndex = props.pokemons.findIndex(p => p.id === pokemon.value.id)
        const prevIndex = (currentIndex - 1 + props.pokemons.length) % props.pokemons.length
        openSheet(props.pokemons[prevIndex].id)
    }

    function closeSheet() {
        if (!sheet.value) {
            return
        }

        sheet.value.classList.add('sheet-out-of-view')
        sheet.value.classList.remove('sheet-open')
    }


    function toggleFavorite() {
        if (!pokemon.value) return

        if (favorites.value.includes(pokemon.value.id)) {
            const index = favorites.value.indexOf(pokemon.value.id)
            favorites.value.splice(index, 1)

            isFavorite.value = false
        } else {
            favorites.value.push(pokemon.value.id)
            isFavorite.value = true
        }

        localStorage.setItem('favorites', JSON.stringify(favorites.value))

        window.dispatchEvent(
            new CustomEvent('favorites-changed', {
                detail: favorites.value
            })
        )
    }

    defineExpose({
        openSheet,
        closeSheet,
    })
</script>

<template>
    <div ref="sheet" class="sheet sheet-out-of-view">
        <header class="mdc-top-app-bar">
            <div class="mdc-top-app-bar__row">
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                    <button @click="closeSheet" class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                        aria-label="close meme">close</button>
                    <span class="mdc-top-app-bar__title">{{ pokemon?.name }}</span>
                </section>
                <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                    <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                        aria-label="Share">share</button>
                    <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                        aria-label="Options">more_vert</button>
                </section>
            </div>
        </header>

        <main>
            <img ref="placeholderImage" :src="image" alt="Pokemon image" />
        </main>

        <footer class="mdc-tab-bar" role="tablist">
            <button @click="prevPokemon" class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                aria-label="Favourite">arrow_back_ios</button>
            <button @click="toggleFavorite" :class="{ favorite: isFavorite }" class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                aria-label="Favourite">favorite</button>
            <button @click="nextPokemon" class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                aria-label="next">arrow_forward_ios</button>
        </footer>
    </div>
</template>

<style scoped>
    .sheet {
        position: fixed;
        inset: 0;
        z-index: 1000;
        margin-left: 0;
        width: 100vw;
        height: 100vh;
        transition: 0.3s ease;
        background: white;
    }

    .sheet-out-of-view {
        margin-left: -100vw;
    }

    .sheet-open {
        height: 100vh;
        overflow: hidden;
    }

    .sheet main {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
    }

    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        background-color: var(--mdc-theme-primary) !important;
        display: flex;
        justify-content: space-around;
        padding: 10px 0;
    }

    footer .mdc-icon-button {
        color: white;
    }

    img {
        width: 100%;
        height: auto;
    }

    .favorite {
        color: red !important;
    }
</style>
