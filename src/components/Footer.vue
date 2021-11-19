<template>
    <footer class="footer text-center">
        <div class="container">
            <button class="btn" :class="{ 'btn-success': countAllPersons === 0, 'btn-light': countAllPersons != 0 }" @click="getPersonsXML">Lae alla uued reitingud</button>
            <button class="btn btn-success" @click="showExcelList">Näita nimekirja excelisse kopeerimiseks</button>
            <button class="btn btn-success" @click="fillList">Täida nimekiri</button>
            <button class="btn btn-info" @click="showHelp">Abi</button>
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
            axios.post('http://159.65.18.166:3000/cors', {url: 'http://www.lauatennis.ee/app_partner/app_eltlid_reitinguga_xml.php'})
                .then(response => {
                    parseString(response.data.response, (err, result) => {
                        if (err) {
                            throw new Error('Midagi läks nihu');
                            console.log(error);
                        } else {
                            const persons = this.convertPersonsFromXML(result.PERSONS.PERSON);
                            this.$store.commit('setAllPersons', persons);
                            this.flash('Nimekiri laetud', 'success', {timeout: 3000});
                            this.$store.commit('changeLoadingState', false);
                        }  
                })        
            })
            .catch((err) => {
                    this.flash('Nimekirja laadimine ebaõnnestus!', 'error', {timeout: 3000});
                    this.$store.commit('changeLoadingState', false);
                    console.error(err);
            })
        },
        convertPersonsFromXML(persons) {
            let convertedPersons = [];
            persons.forEach(person => {
                let rateOrder = person.RATEORDER[0];
                if (rateOrder == 0 || rateOrder === 'undefined' ||  isNaN(rateOrder) || rateOrder === '') 
                    rateOrder = 9000;
                convertedPersons.push({
                    firstName: this.capitalizeString(person.FIRSTNAME[0]),
                    lastName: this.capitalizeString(person.FAMNAME[0]),
                    sex: person.SEX[0],
                    personId: person.PERSONID[0],
                    rateOrder: parseInt(rateOrder)
                });
            });
            return convertedPersons;
        },
        // https://paulund.co.uk/how-to-capitalize-the-first-letter-of-a-string-in-javascript
        capitalizeString(string) {
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        },
        showExcelList() {
            if (this.$store.getters.getShowExcelListState) {
                this.$store.commit('toggleExcelList', false);
            } else {
                this.$store.commit('toggleExcelList', true);
            }
        },
        showHelp() {
            if (this.$store.getters.getShowHelpState) {
                this.$store.commit('toggleHelp', false);
            } else {
                this.$store.commit('toggleHelp', true);
            }
        },
        fillList() {
            this.$store.commit('fillList');
        }
    }
}
</script>

<style>

</style>

