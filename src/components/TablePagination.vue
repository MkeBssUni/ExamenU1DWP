<script>
import instance from '../config/axios';

export default {
    data() {
        return {
            perPage: 0,
            currentPage: 1,
            items: [{}],
            sortBy: "",
            sortDesc: "",
            pageOptions: [1, 2, 3, 4, 5, 10, 15, 20],
            filtro: "",
            fields: [
                { key: 'id', label: '#', sortable: true },
                { key: 'brand', label: 'Marca', sortable: true },
                { key: 'model', label: 'Modelo', sortable: true },
                { key: 'serie', label: 'No. Serie', sortable: true },
                { key: 'year', label: 'Año de producción', sortable: true },
            ],
            itemsBreadCrumbs: [
                {
                    text: 'Inicio',
                    to: '/'
                },
                {
                    text: 'Autos disponibles',
                    active: true,
                    to: '/all'
                }]
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    },
    mounted() {
        this.perPage = 5;
        instance.post("/vehiculos/page", {
            page: this.currentPage - 1,
            limit: this.perPage
        }).then((response) => {
            this.items = response.data.content;
        });
    }
}
</script>
  
<template>
    <div class="container p-5">
        <b-breadcrumb :items="itemsBreadCrumbs"></b-breadcrumb>
        
            <b-card title="Autos disponibles" class="mb-2">
                <!-- boton agregar auto alineado a la derecha-->
                <b-button variant="outline-success" to="/newCar" class="float-right">Agregar auto</b-button>
                
                <b-input class="mt-3" placeholder="Buscar..." v-model="filtro"></b-input>

                <b-table class="mt-3 p-3" id="my-table" :items="items" :per-page="perPage" :current-page="currentPage" small
                    sort-icon-left responsive="sm" striped hover :fields="fields" :filter="filtro" :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc" label-sort-asc="" label-sort-desc=""></b-table>

                <b-row>
                    <b-col>
                        <p class="mt-3">Página actual: {{ currentPage }}</p>
                    </b-col>
                    <b-col>
                        <p class="mt-3">Total de registros: {{ rows }}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <p class="mt-3">Selecciona la cantidad de registros: </p>
                    </b-col>
                    <b-col>
                        <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                    </b-col>
                </b-row>
                <b-pagination class="mt-3" v-model="currentPage" :total-rows="rows" :per-page="perPage"
                    aria-controls="my-table" align="center"></b-pagination>
            </b-card>
    </div>
</template>
  
  