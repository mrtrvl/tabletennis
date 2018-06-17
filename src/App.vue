<template>
    <div class="container">
        <h1 v-if="countAllPersons == 0">Mängijate nimekiri on laadimata!</h1>
        <app-add-person @personAdded="addNewPerson"></app-add-person>
        <app-person-grid :persons="persons" @personRemoved="removePerson"></app-person-grid>
        <p>Mängijaid: {{ countPersons }}</p>        
    </div>
</template>

<script>
    import PersonGrid from './components/PersonGrid.vue'
    import AddPerson from './components/AddPerson.vue'

    export default {
        computed: {
            countPersons() {
                return this.$store.getters.countPersons;
            },
            countAllPersons() {
                return this.$store.getters.countAllPersons;
            }
        },
        components: {
            appPersonGrid: PersonGrid,
            appAddPerson: AddPerson
        },
        methods: {
            addNewPerson(person) {
                this.persons.push(person);
            },
            removePerson(index) {
                this.persons.splice(index, 1);
            }
        }
    }
</script>

<style>
</style>
