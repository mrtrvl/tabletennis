<template>
    <div class="row">
        <h2 class="text-center">Lisa mängija</h2>
        <div class="text-center">
            <input class="form-control" type="text" v-model="input">
        </div>
            <table class="table table-striped">
                <tbody>
                    <tr v-for="person in filteredPersons" :key="person.personId" v-if="input !=''" @click="addNewPerson(person.personId)">
                        <td>{{ person.personId + ' ' + person.rateOrder + ' ' + person.firstName + ' ' + person.lastName + ' ' + person.sex }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>

<script>
export default {
    data() {
        return {
            input: ''
        }
    },
    computed: {
        filteredPersons() {
            //return this.$store.getters.getAllPersons;
            return this.$store.getters.findPersonsByName(this.input);
        }
    },
    methods: {
        addNewPerson(personId) {
            if(this.$store.getters.isPersonInThePersonsList(personId)) {
                alert("Mängija on juba nimekirjas");
            } else {
                this.$store.commit('addPerson', personId);
                this.input = '';
            }
        },
    }
}
</script>

<style>
tr {
    cursor: pointer;
}
</style>

