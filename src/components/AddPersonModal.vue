<template>
    <div class="modal show" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">Lisa uus mängija</h3>
                <button type="button" class="close" @click="hideModal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group has-feedback has-clear">
                Eesnimi: <input class="form-control" placeholder="Eesnimi" type="text" v-model="person.firstName">
                Perekonnanimi: <input class="form-control" placeholder="Perekonnanimi" type="text" v-model="person.lastName">
                Sugu: <select class="form-control" v-model="person.sex">
                    <option value="" selected disabled>Vali sugu</option>
                    <option value="N">Naine</option>
                    <option value="M">Mees</option>
                </select>
                Reiting: (Kui inimesel reiting puudub, siis ära sisesta siia midagi!)
                <input class="form-control" placeholder="Reiting" type="number" v-model="person.rateOrder">
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click.prevent="savePerson">Save changes</button>
                <button type="button" class="btn btn-secondary" @click="hideModal">Close</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            person: {
                firstName: '',
                lastName: '',
                sex: '',
                rateOrder: 0
            }
        }
    },
    methods: {
        hideModal() {
            this.$store.commit('toggleModal', false);
        },
        savePerson() {
            if (this.person.firstName === '' || this.person.lastName === '' || this.person.sex === '') {
                alert('Kõik väljad peavad olema täidetud!');
            } else {
                if (this.person.rateOrder === 0) {
                    this.person.rateOrder = 45001;
                }
                this.$store.commit('addNewPerson', this.person);
                this.hideModal();
            }
        }
    }
}
</script>

<style>

</style>
