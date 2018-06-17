import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        persons: [],
        allPersons: []
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
      }
    },
    getters: {
        getPersons: state => {
            const compare = (a,b) => {
                if (a.rateOrder < b.rateOrder)
                  return -1;
                if (a.rateOrder > b.rateOrder)
                  return 1;
                return 0;
              }
              
            return state.persons.sort(compare);
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
            return state.allPersons.filter(person => {return (person.firstName + person.lastName).toLowerCase().includes(string.toLowerCase())});
        },
        isPersonInThePersonsList: state => personId => {
            if (state.persons.filter(person => {return person.personId === personId}).length > 0) {
                return true;
            } else {
                return false;
            }
        }
    }
});