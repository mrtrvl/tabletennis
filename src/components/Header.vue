<template>
    <header class="header text-center">
        <div class="container">
        <flash-message></flash-message>
        <h1 v-if="loading">Laen mängijate nimekirja...</h1>
        <h1 v-if="countAllPersons === 0">Mängijate nimekiri on laadimata!</h1>
        <h1 v-else>Lauatennise võistluse nimekiri</h1>
    </div>
</header>
</template>

<script>
export default {
    computed: {
            countAllPersons() {
                return this.$store.getters.countAllPersons;
            },
            loading() {
                return this.$store.getters.loadingState;
            }
    }
}
</script>

<style>

</style>

