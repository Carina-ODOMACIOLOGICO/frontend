<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card class="mx-auto" elevation="1">
          <v-card-title>Espacio de problema</v-card-title>
          <v-card-text> A continuación se muestran los diferentes espacios de problema creados para entrenamiento</v-card-text>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>{{ datasets.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mx-12"></v-divider>
          <v-flex xs12 sm12>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select
                  outlined
                  item-text="name"
                  item-value="_id"
                  :items="selectDatasets"
                  label="Datasets de entrenamiento"
                  v-model="idDataset"
                ></v-select>
                <v-textarea
                  outlined
                  name="input-7-4"
                  label="Descripcion a evaluar"
                  v-model="query"
                  value="Pajaro rojo pico mediano pequeño ojos negros"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-flex>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" @click="getPrediction"> Predecir </v-btn>
          </v-card-actions>
          <v-card-text>
            <Report :fields="fields" :schema="schema" :prediction="prediction" :detail="detail" :visibleReport="visibleReport" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "Dataset",
  props: ["id_document", "schema"],
  data() {
    return {
      datasets: [],
      idDataset: "",
      selectDatasets: [],
      prediction: [],
      detail: [],
      query: "",
      show: false,
      fields: [],
      visibleReport: false,
    };
  },
  components: {
    Report: () => import("../components/Report.vue"),
  },
  methods: {
    getDatasets() {
      console.log(this.id_document, this.schema);
      axios
        .get(`${this.URLServer}/dataset/${this.id_document}/${this.schema}`)
        .then((response) => {
          let props = response.data.props;
          this.fields = props.filter((p) => p !== "_id" && p !== "__v");
          this.datasets = response.data.doc;
          this.selectDatasets = this.datasets.has.map((item) => {
            return {
              _id: item._id,
              name: item.name,
            };
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getPrediction() {
      axios
        .post(`${this.URLServer}/prediction/${this.idDataset}/${this.schema}`, {
          query: this.query,
          id_document: this.id_document,
        })
        .then((response) => {
          console.log("getPrediction", response.data);
          this.prediction = response.data.prediction;
          this.detail = response.data.detail;
          this.visibleReport = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getDatasets();
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
};
</script>
