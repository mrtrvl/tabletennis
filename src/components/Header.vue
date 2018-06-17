<template>
    <div class="row text-center">
        <h1 v-if="countAllPersons == 0">Mängijate nimekiri on laadimata!</h1>
    </div>
</template>

<script>
export default {
    computed: {
            countAllPersons() {
                return this.$store.getters.countAllPersons;
            }
    }
}
</script>
