<template>
    <div class="container">
        <div class="row fixed-top">
            <app-header></app-header>
        </div>
        <div class="row">
            <div class="col-sm-5">
                <app-add-person v-if="!showExcelListState"></app-add-person>
                <app-list-for-excel v-else></app-list-for-excel>
            </div>
            <div class="col-sm-2">

            </div>
            <div class="col-sm-5">
                <app-person-grid></app-person-grid>
            </div>
        </div>   
        <app-footer></app-footer>     
    </div>
</template>

<script>
    import PersonGrid from './components/PersonGrid.vue'
    import AddPerson from './components/AddPerson.vue'
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'
    import ListForExcel from './components/ListForExcel.vue'

    export default {
        computed: {
            showExcelListState() {
                return this.$store.getters.getShowExcelListState;
            }
        },
        components: {
            appPersonGrid: PersonGrid,
            appAddPerson: AddPerson,
            appHeader: Header,
            appFooter: Footer,
            appListForExcel: ListForExcel
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
    @import url('../node_modules/vue-flash-message/dist/vue-flash-message.min.css');
</style>
