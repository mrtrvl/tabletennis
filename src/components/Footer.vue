<template>
    <footer class="footer text-center">
        <div class="container">
            <button class="btn" :class="{ 'btn-success': countAllPersons === 0, 'btn-light': countAllPersons != 0 }" @click="getPersonsXML">Lae alla uued reitingud</button>
            <button class="btn btn-success" @click="showExcelList">Näita nimekirja excelisse kopeerimiseks</button>
            <button class="btn btn-success" @click="fillList">Täida nimekiri</button>
            <h6><a href="mailto:mrt@mrt.ee">Martti Raavel</a></h6>
        </div>
    </footer>
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
            this.$store.commit('changeLoadingState', true);
            axios.get('http://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php')
                .then(response => {
                    parseString(response.data, (err, result) => {
                        if (err) {
                            throw new Error('Midagi läks nihu');
                        } else {
                            const persons = this.convertPersonsFromXML(result.PERSONS.PERSON);
                            this.$store.commit('setAllPersons', persons);
                            this.flash('Nimekiri laetud', 'success', {timeout: 3000});
                            this.$store.commit('changeLoadingState', false);
                        }  
                })
                .error((err) => {
                    this.flash('Nimekirja laadimine ebaõnnestus!', 'danger', {timeout: 3000});
                    this.$store.commit('changeLoadingState', false);
                    console.error(err);
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
        },
        showExcelList() {
            this.$store.commit('toggleExcelList', true);
        },
        fillList() {
            this.$store.commit('fillList');
        }
    }
}
</script>

<style>

</style>

