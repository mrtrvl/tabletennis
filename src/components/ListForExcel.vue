<template>
    <table>
        <tbody>
            <tr>
                <th>Eesnimi</th>
                <th>Perekonnanimi</th>
            </tr>
            <tr v-for="person in persons" :key="person.id">
                <td>{{ person.firstName }}</td>
                <td>{{ person.lastName }}</td>
            </tr>
            <button class="btn btn-success" @click="hideExcelList(index)">Sulge</button>
        </tbody>
    </table>
</template>

<script>
export default {
    computed: {
        persons() {
            return this.$store.getters.getPersons;
        }
    },
    methods: {
        hideExcelList() {
            this.$store.commit('toggleExcelList', false);
        }
    }
}
</script>

<style>

</style>
