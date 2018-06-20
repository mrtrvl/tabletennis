// Saving into localstorage vuex tutorial:
// https://www.mikestreety.co.uk/blog/vue-js-using-localstorage-with-the-vuex-store

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        persons: [],
        allPersons: [],
        loading: false,
        loadedDate: '',
        showExcelListState: false,
        showHelpState: false
    },
    mutations: {
        addPerson(state, personId) {
            let person = state.allPersons.find((person) => { return person.personId === personId; });
            if (person.sex === 'N') {
                person.rateOrder *= 5;
            }
            state.persons.push(person);
        },
        removePerson(state, index) {
            state.persons.splice(index, 1);
        },
        setAllPersons(state, personListFromXML) {
            state.allPersons = personListFromXML;
            state.loadedDate = Date.now();
        },
        changeLoadingState(state, loadingStatus) {
            state.loading = loadingStatus;
        },
        initialiseStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('store')))
                );
            }
            state.loading = false;
        },
        emptyPersonsList(state) {
            state.persons.splice(0, state.persons.length);
        },
        toggleExcelList(state, showExcelListStatus) {
            state.showExcelListState = showExcelListStatus;
        },
        toggleHelp(state, showHelpStatus) {
            state.showHelpState = showHelpStatus;
        },
        fillList(state) {
            let tableLength = 16;
            let currentTableLength = state.persons.length;
            if (currentTableLength > 96) {
                tableLength = 128;
            } else if (currentTableLength > 64) {
                tableLength = 96;
            } else if (currentTableLength > 48) {
                tableLength = 64;
            } else if (currentTableLength > 32) {
                tableLength = 48;
            } else if (currentTableLength > 24) {
                tableLength = 32;
            } else if (currentTableLength > 16) {
                tableLength = 24;
            }

            while (state.persons.length != tableLength) {
                state.persons.push({
                    firstName: 'Bye',
                    lastName: 'Bye',
                    sex: '-',
                    personId: 0,
                    rateOrder: -1
                });
            }
        }
    },
    getters: {
        getPersons: state => {
            const compareRateOrder = (a,b) => {
                if (a.rateOrder < b.rateOrder)
                  return -1;
                if (a.rateOrder > b.rateOrder)
                  return 1;
                if (a.sex === 'N' && b.sex ==='M')
                  return -1;
                if (a.sex === 'M' && b.sex ==='N')
                  return 1;
                return 0;
              }
              
            return state.persons.sort(compareRateOrder);
        },
        countPersons: state => {
            return state.persons.length;
        },
        countAllPersons: state => {
            return state.allPersons.length;
        },
        getAllPersons: state => {
            return state.allPersons;
        },
        findPersonsByName: state => string => {
            string = string.toLowerCase();
            return state.allPersons.filter(person => {return (person.firstName + ' ' + person.lastName).toLowerCase().includes(string.toLowerCase())});
        },
        isPersonInThePersonsList: state => personId => {
            if (state.persons.find((person) => { return person.personId === personId; })) {
                return true;
            } else {
                return false;
            }
        },
        loadingState: state => {
            return state.loading;
        },
        getLoadedDate: state => {
            return state.loadedDate;
        },
        getShowExcelListState: state => {
            return state.showExcelListState;
        },
        getShowHelpState: state => {
            return state.showHelpState;
        }
    }
});

store.subscribe((mutation, state) => {
	localStorage.setItem('store', JSON.stringify(state));
});