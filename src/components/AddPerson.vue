<template>
    <div class="row">
        <h2 class="text-center">Lisa mängija</h2>
        <p class="text-center">Kokku nimekirjas: {{ countAllPersons }} inimest {{ loadedDate }} seisuga</p>
        <div class="text-center">
            <input class="form-control" type="text" v-model="input">
        </div>
            <table class="table table-striped">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Reiting</th>
                        <th>Nimi</th>
                        <th>Sugu</th>
                        <th></th>
                    </tr>
                    <tr v-for="person in filteredPersons" :key="person.personId" v-if="input !=''" @click="addNewPerson(person.personId)">
                        <td>{{ person.personId }}</td>
                        <td>{{ person.rateOrder }}</td>
                        <td>{{ person.firstName + ' ' + person.lastName }}</td>
                        <td>{{ person.sex }}</td>
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
        },
        countAllPersons() {
            return this.$store.getters.countAllPersons;
        },
        loadedDate() {
            let date = new Date(this.$store.getters.getLoadedDate);
            let convertedDate = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

            return convertedDate;
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
        }
    }
}
</script>

<style>
tr {
    cursor: pointer;
}
</style>



