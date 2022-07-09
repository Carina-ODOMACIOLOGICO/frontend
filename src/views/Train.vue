<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card class="mx-auto" elevation="1">
          <v-card-title>{{ documento.nombre }} </v-card-title>
          <v-card-subtitle>{{ documento.detalle }}</v-card-subtitle>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>Campos para el entrenamiento</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6" sm="6" md="6">
                <v-card-text>
                  <h2 class="text-h6 mb-2">Fuente de datos</h2>
                  <v-chip-group v-model="data" column>
                    <v-chip
                      v-for="(mf, i) in modelFields"
                      :key="i"
                      filter
                      outlined
                      @click="changeHeader(0, mf, i)"
                      >{{ mf }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-col>
              <v-col cols="6" sm="6" md="6">
                <v-card-text>
                  <h2 class="text-h6 mb-2">Referencia</h2>
                  <v-chip-group v-model="target" column>
                    <v-chip
                      v-for="(mf, i) in modelFields"
                      :key="i"
                      filter
                      outlined
                      @click="changeHeader(1, mf, i)"
                      >{{ mf }}
                    </v-chip>
                  </v-chip-group>
                </v-card-text>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-title>Campos para el entrenamiento</v-card-title>
          <v-card-text v-if="desserts.length > 0">
            <template>
              <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="itemsPerPage"
                class="elevation-1"
              ></v-data-table>
            </template>
          </v-card-text>
          <v-card-text>
            <v-card-actions>
              <TrainConfig
                :fields="headers"
                :data="desserts"
                :id_documento="id_document"
              />
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";

export default {
  name: "Train",
  props: ["id_document", "schema"],
  data() {
    return {
      documento: {},
      data: [],
      target: [0],
      modelFields: [],
      headers: [
        { text: "", value: "", width: "60%" },
        { text: "", value: "", width: "40%" },
      ],
      desserts: [],
      itemsPerPage: 10,
    };
  },
  created() {},
  components: {
    TrainConfig: () => import("../components/TrainConfig.vue"),
  },
  methods: {
    getFIeldsModel() {
      axios
        .get(`${this.URLServer}/models/${this.id_document}/${this.schema}`)
        .then((response) => {
          this.documento = response.data.document;
          this.modelFields = response.data.modelFields;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeHeader(hi, mf, i) {
      this.headers[hi].text = mf;
      this.headers[hi].value = mf;
      console.log(`Data ${JSON.stringify(this.headers)}`);
      if (this.headers[0].value != "" && this.headers[1].value != "") {
        this.desserts = [];
        this.documento.iteraciones.map((item) => {
          //if (item[this.headers[0].value].length > 0) {
          if (
            typeof item[this.headers[0].value] == "object" ||
            typeof item[this.headers[0].value] == "array"
          ) {
            return item[this.headers[0].value].map((elem) => {
              let iName1 = this.headers[0].value;
              let iName2 = this.headers[1].value;
              this.desserts.push({
                [iName1]: elem,
                [iName2]: item[iName2],
              });
            });
          } else {
            this.desserts.push(item);
          }
        });
      }
    },
  },
  mounted() {
    this.getFIeldsModel();
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
};
</script>