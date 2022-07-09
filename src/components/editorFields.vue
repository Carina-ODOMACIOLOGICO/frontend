<template>
  <v-container v-if="bdDataInfo.length > 0" fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 sm12 v-for="(card, i) in bdDataInfo" :key="i">
        <v-card elevation="1">
          <v-card-text>
            <v-row>
              <v-col cols="5">
                <v-img
                  :src="`${URLServer}${uploads}${card.imagen}`"
                  contain
                  max-height="300"
                  max-width="500"
                ></v-img>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  v-model="card.code"
                  label="Code"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.nombre"
                  label="Nombre"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="card.nombre_científico"
                  label="Nombre científico"
                  required
                ></v-text-field>
                <!--v-textarea
                  v-model="card.descripcion"
                  label="Descripción"
                  required></v-textarea-->
                <v-text-field
                  v-model="card.imagen"
                  label="Imagen"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12>
        <v-card elevation="0">
          <v-card-text>
            <v-row
              v-if="bdDataInfo.length != 0"
              align="center"
              justify="space-around"
            >
              <v-btn tile color="success" @click="setAnimals">
                <v-icon left> mdi-pencil </v-icon>
                Guardar información
              </v-btn>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "EditorFields",
  props: {
    bdDataInfo: {
      type: Array,
      default: function () {
        return [];
      },
    },
    id_document: String,
    data_source: {},
    modelName: String,
  },
  components: {},
  data() {
    return {
      uploads: "/uploads/",
    };
  },
  methods: {
    setAnimals() {
      axios
        .post(`${this.URLServer}/corpus/${this.id_document}/iterations/`, {
          iteracion: this.bdDataInfo,
          name: this.modelName,
          template: this.data_source,
        })
        .then((response) => {
          this.$router.push({
            name: "Home",
          });
        });
    },
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
};
</script>
<style>
.card {
  font-size: 1.2em;
  padding-top: 0;
  padding-bottom: 7%;
}
</style>