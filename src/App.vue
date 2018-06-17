<template>
    <div class="container">
        <app-header></app-header>
        <app-add-person @personAdded="addNewPerson"></app-add-person>
        <app-person-grid :persons="persons" @personRemoved="removePerson"></app-person-grid>
        <p>Mängijaid: {{ countPersons }}</p>        
    </div>
</template>

<script>
    import PersonGrid from './components/PersonGrid.vue'
    import AddPerson from './components/AddPerson.vue'
    import Header from './components/Header.vue'

    export default {
        computed: {
            countPersons() {
                return this.$store.getters.countPersons;
            }
        },
        components: {
            appPersonGrid: PersonGrid,
            appAddPerson: AddPerson,
            appHeader: Header
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
