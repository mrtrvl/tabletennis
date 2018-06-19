<template>
    <div class="row text-center">
        <button class="btn" :class="{ 'btn-success': countAllPersons === 0, 'btn-light': countAllPersons != 0 }" @click="getPersonsXML">Lae alla mängijate nimekiri</button>
    </div>
</template>

<script>
import axios from 'axios';
const parseString = require('xml2js').parseString;

export default {
    computed: {
        countAllPersons() {
            return this.$store.getters.countAllPersons;
        }
    },
    methods: {
        getPersonsXML() {
            this.$store.commit('changeLoadingState');
            axios.get('http://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php')
                .then(response => {
                    parseString(response.data, (err, result) => {
                        const persons = this.convertPersonsFromXML(result.PERSONS.PERSON);
                        this.$store.commit('setAllPersons', persons);
                        this.$store.commit('changeLoadingState');
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
        },
        // https://paulund.co.uk/how-to-capitalize-the-first-letter-of-a-string-in-javascript
        capitalizeString(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }
    }
}
</script>
