<template>
    <div class="row">
        <app-person v-for="(person, index) in persons" :key="person.id">{{ person.rateOrder + ' ' + person.firstName + ' ' + person.lastName }}
            <button class="btn btn-danger" @click="removePerson(index)">Kustuta</button>
        </app-person>
        <button class="btn btn-success" @click="getPersonsXML">Lae alla mängijate nimekiri</button>
    </div>
</template>

<script>
import Person from './Person.vue'
import axios from 'axios';
const parseString = require('xml2js').parseString;


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
        },
        getPersonsXML() {
            axios.get('http://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php')
                .then(response => {
                    parseString(response.data, (err, result) => {
                        const persons = this.convertPersonsFromXML(result.PERSONS.PERSON);
                        this.$store.commit('setAllPersons', persons);
                        alert('Nimekiri laetud');
                });        
            })
        },
        convertPersonsFromXML(persons) {
            let convertedPersons = [];
            persons.forEach(person => {
                convertedPersons.push({
                    firstName: person.FIRSTNAME[0],
                    lastName: person.FAMNAME[0],
                    sex: person.SEX[0],
                    personId: person.PERSONID[0],
                    rateOrder: person.RATEORDER[0] || 0
                });
            });
            return convertedPersons;
        }
    }
}
</script>

<style>

</style>
