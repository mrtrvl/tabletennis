<template>
    <div class="row">
        <app-person v-for="(person, index) in persons" :key="person.id">{{ person.rateOrder + ' ' + person.firstName + ' ' + person.lastName }}
            <button class="btn btn-danger" @click="removePerson(index)">Kustuta</button>
        </app-person>
    </div>
</template>

<script>
import Person from './Person.vue'

export default {
    computed: {
        persons() {
            return this.$store.getters.getPersons;
        }
    },
    components: {
        appPerson: Person
    },
    methods: {
        removePerson(index) {
            this.$store.commit('removePerson', index);
        }
    }
}
</script>

<style>

</style>
