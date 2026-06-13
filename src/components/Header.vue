<script setup>
    import {
        MDCTopAppBar
    } from '@material/top-app-bar'
    import {
        ref,
        onMounted
    } from 'vue'

    const headerRef = ref()

    const emit = defineEmits([
        'openDrawer',
    ])

    onMounted(() => {
        new MDCTopAppBar(headerRef.value)
    })
</script>

<template>
    <header ref="headerRef" class="mdc-top-app-bar mdc-top-app-bar--fixed">
        <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                <button @click="emit('openDrawer')"
                    class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
                <span class="mdc-top-app-bar__title">PokeApi</span>
            </section>
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            </section>
        </div>
    </header>
</template>
