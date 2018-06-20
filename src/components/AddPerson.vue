<template>
    <div class="row">
        <h3 class="text-center">Lisa mängija</h3>
        <p class="text-center">Kokku nimekirjas: {{ countAllPersons }} inimest <span v-if="loadedDate !='-'">{{ loadedDate }} seisuga</span></p>
        <div class="input-group text-center">
            <div class="form-group has-feedback has-clear">
                <input class="form-control" placeholder="Eesnimi Perekonnanimi" type="text" v-model="input">
                <span class="form-control-clear glyphicon glyphicon-remove form-control-feedback" :class="{ 'hidden': input === '' }" @click="clearInput"></span>
            </div>
        </div>
            <table class="table table-striped table-hover">
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
            return this.$store.getters.findPersonsByName(this.input);
        },
        countAllPersons() {
            return this.$store.getters.countAllPersons;
        },
        loadedDate() {
            let loadedDate = this.$store.getters.getLoadedDate;
            if (loadedDate != '') {
                let date = new Date(loadedDate);
                let convertedDate = date.getHours() + ':' + date.getMinutes() + ' ' + date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

                return convertedDate;
            } else {
                return '-';
            }
        }
    },
    methods: {
        addNewPerson(personId) {
            if(this.$store.getters.isPersonInThePersonsList(personId)) {
                alert("Mängija on juba nimekirjas");
            } else {
                this.$store.commit('addPerson', personId);
            }
        },
        clearInput() {
            this.input = '';
        }
    }
}
</script>

<style>
tr {
    cursor: pointer;
}

::-ms-clear {
  display: none;
}

.form-control-clear {
  z-index: 10;
  pointer-events: auto;
  cursor: pointer;
}
.input-group {
        display: block;
}
</style>

