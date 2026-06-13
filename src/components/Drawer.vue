<script setup>
    import {
        ref,
        onMounted,
        watch
    } from 'vue'
    import {
        MDCDrawer
    } from '@material/drawer';

    const props = defineProps({
        open: Boolean
    })
    const emit = defineEmits(['openDrawer', 'openFavorites'])

    const drawer = ref(null)

    onMounted(() => {
        drawer.value = new MDCDrawer(drawer.value)
        drawer.value.open = props.open
    })

    function openDrawer() {
        if (drawer.value)
            drawer.value.open = true
    }

    function closeDrawer() {
        if (drawer.value)
            drawer.value.open = false
    }

    defineExpose({
        openDrawer,
    })
</script>

<template>
    <aside ref="drawer" class="mdc-drawer mdc-drawer--modal">
        <div class="mdc-drawer__header">
            <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" alt="logo">
        </div>
        <div class="mdc-drawer__content">
            <nav class="mdc-list">
                <RouterLink to="/" @click="closeDrawer" class="mdc-list-item mdc-list-item--activated"
                    aria-current="page">
                    <span class="mdc-list-item__ripple"></span>
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">home</i>
                    <span class="mdc-list-item__text">Home</span>
                </RouterLink>
                <RouterLink to="/favorites" @click="closeDrawer" class="mdc-list-item">
                    <span class="mdc-list-item__ripple"></span>
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">favorite</i>
                    <span class="mdc-list-item__text">Favourites</span>
                </RouterLink>
            </nav>
        </div>
    </aside>
    <div class="mdc-drawer-scrim"></div>
</template>

<style scoped>
    .mdc-drawer__header img {
        padding-top: 10px;
        width: auto;
        height: 70px;
    }

    .mdc-list-item {
        width: 100%;
        display: flex;
        gap: 10px;
        padding: 10px;
    }
</style>
