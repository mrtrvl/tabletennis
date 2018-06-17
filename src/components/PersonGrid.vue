<template>
    <div class="row">
        <h2 class="text-center">Registreeritud mängijad:</h2>
        <table class="table table-striped">
                <tbody>
                    <tr>
                        <th>Nr</th>
                        <th>ID</th>
                        <th>Reiting</th>
                        <th>Nimi</th>
                        <th>Sugu</th>
                        <th></th>
                    </tr>
                    <tr v-for="(person, index) in persons" :key="person.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ person.personId }}</td>
                        <td>{{ person.rateOrder }}</td>
                        <td>{{ person.firstName + ' ' + person.lastName }}</td>
                        <td>{{ person.sex }}</td>
                        <td><button class="btn btn-danger" @click="removePerson(index)">Eemalda</button></td>
                    </tr>
                </tbody>
            </table>
    </div>
</template>

<script>

export default {
    computed: {
        persons() {
            return this.$store.getters.getPersons;
        }
    },
    methods: {
        removePerson(index) {
            this.$store.commit('removePerson', index);
        }
    }
}
</script>

<style>
    .scrollable {
        max-height: 600px;
        overflow-y: scroll;
    }
</style>
