<template>
    <div class="container">
        <app-header></app-header>
        <div class="row">
            <div class="row-8">
                <app-add-person></app-add-person>
            </div>
            <div class="row-8">
                <app-person-grid></app-person-grid>
            </div>
        </div>
        <p class="text-center">Mängijaid: {{ countPersons }}</p>   
        <app-footer></app-footer>     
    </div>
</template>

<script>
    import PersonGrid from './components/PersonGrid.vue'
    import AddPerson from './components/AddPerson.vue'
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

    export default {
        computed: {
            countPersons() {
                return this.$store.getters.countPersons;
            }
        },
        components: {
            appPersonGrid: PersonGrid,
            appAddPerson: AddPerson,
            appHeader: Header,
            appFooter: Footer
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
