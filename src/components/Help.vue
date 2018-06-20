<template>
    <div class="container">
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title text-center">Abi</h3>
                    <p class="card-text">
                        Rakendus on mõeldud lauatennise võistluse nimekirja koostamiseks. Programm järjestab võistlejad automaatselt reitingu järgi (naiste reiting korrutatakse viiega) ja võimaldab võistlejate nimekirja vaadata kujul, mida on lihtne Exceli tabelisse kopeerida.
                        <br>
                        Hetkel on reitingute nimekirja laadimise võimaldamiseks vaja paigaldada veebilehitsejale <a class="card-link" href="http://https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi">CORS pistikprogramm</a>
                        <br>
                        Rakendus on testitud Chrome veebilehitsejaga.
                    </p>
                    <table class="helpTable">             
                        <tr>
                            <td><button class="btn btn-success">Lae alla uued reitingud</button></td>
                            <td>Laadib alla reitingud lauatennise liidu koduleheküljelt. Kui nupp on roheline, siis ei ole reitinguid veel laetud.</td>
                        </tr>
                        <tr>
                            <td><button class="btn btn-success">Näita nimekirja...</button></td>
                            <td>Näitab võisteljate nimekirja kujul, mida saab Excelisse kopeerida. Exceli tabelisse tuleb kleepida ilma vorminduseta.</td>
                        </tr>
                        <tr>
                            <td><button class="btn btn-success">Täida nimekiri</button></td>
                            <td>Kui võistlejaid on vähem, kui turniiritabeli täitmiseks vaja, siis täidab nimekirja nn kohatäidetega (Bye Bye)</td>
                        </tr>
                        <tr>
                            <td><button class="btn btn-info">Abi</button></td>
                            <td>Näitab infot :)</td>
                        </tr>
                    </table>
                </div>
            </div>
            <br>
            <br>
            <div class="row text-center">
                <button class="btn btn-success" @click="hideHelp(index)">Sulge abi</button>
            </div>
            <br>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        hideHelp() {
            this.$store.commit('toggleHelp', false);
        }
    }
}
</script>

<style>
.helpTable {
    border-collapse: separate;
    border-spacing: 1em;
}
</style>

