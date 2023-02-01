<template>
<div>
    <table>
        <tbody >
            <tr>
                <th class="excelListCell">Eesnimi</th>
                <th class="excelListCell">Perekonnanimi</th>
                <th class="excelListCell">Nimi kokku</th>
                <th class="excelListCell">ID</th>
            </tr>
        </tbody>
    </table>
    <table class="excelList">
        <tbody >
            <tr v-for="person in persons" :key="person.id">
                <td class="excelListCell">{{ person.firstName }}</td>
                <td class="excelListCell">{{ person.lastName }}</td>
                <td class="excelListCell">{{ person.firstName + ' ' + person.lastName }}</td>
                <td class="excelListCell">{{ person.personId }}</td>
            </tr>
            <br>
        </tbody>
    </table>
    <button class="btn btn-danger" @click="hideExcelList">Sulge</button>
    <button class="btn btn-success btnClipboard" data-clipboard-target=".excelList">Kopeeri vahemällu</button>
</div>
</template>

<script>
new ClipboardJS('.btnClipboard');

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
    .excelListCell {
        width: 100px;
        cursor: text;
    }
</style>
