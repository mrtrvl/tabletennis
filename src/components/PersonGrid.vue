<template>
    <div class="row">
        <h3 class="text-center">Registreeritud mängijad:</h3>
        <div class="text-center">
            <p class="inlineWithButton">Kokku nimekirjas: {{ countPersons }} mängijat </p>
            <button class="btn btn-danger btn-sm" @click="emptyPersonsList">Tühjenda nimekiri</button>
            <p class="text-center inlineWithButton"></p>
        </div>
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
                    <td><button class="btn btn-danger btn-sm" @click="removePerson(index)">Eemalda</button></td>
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
        },
        countPersons() {
            return this.$store.getters.countPersons;
        }
    },
    methods: {
        removePerson(index) {
            this.$store.commit('removePerson', index);
        },
        emptyPersonsList() {
            this.$store.commit('emptyPersonsList');
        }
    }
}
</script>

<style>
    .scrollable {
        max-height: 600px;
        overflow-y: scroll;
    }
    .inlineWithButton {
        display: inline-block;
        margin: 10px;
    }
</style>
