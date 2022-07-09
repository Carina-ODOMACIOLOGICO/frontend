<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card class="mx-auto" elevation="2">
          <v-card-title>{{ link.nombre }}</v-card-title>
          <v-card-text>
            {{ link.descripcion }}
            <v-card-subtitle>
              <v-chip class="ma-2" color="success" outlined pill>
                <v-icon left> mdi-image-multiple-outline </v-icon>
                <b>Total de imagánes:</b> {{ link.rango }}
              </v-chip>
              <v-chip class="ma-2" color="primary" outlined pill>
                <v-icon left> mdi-tune-vertical </v-icon>
                <b>Orden:</b> {{ link.orden }}
              </v-chip>
            </v-card-subtitle>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <Collector :elements="elements" :schema="schema" />
  </v-container>
</template>
<script>
import axios from "axios";
import Collector from "../components/Collector.vue";
export default {
  name: "Filldata",
  props: ["id_document", "id_link"],
  components: {
    Collector,
  },
  data: () => ({
    elements: [],
    link: {},
    schema: "",
  }),
  methods: {
    findLinkProperties() {
      axios
        .get(`${this.URLServer}/links/${this.id_document}/${this.id_link}`)
        .then((response) => {
          this.link = response.data.doc.links[0];
          this.schema = response.data.doc.schema;
          this.getElements();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getElements() {
      try {
        let params = {
          schema: this.schema,
          rango: this.link.rango,
          orden: this.link.orden,
        };

        axios
          .get(
            `${this.URLServer}/images/${this.schema}/${this.link.rango}/${this.link.orden}`,
            { params }
          )
          .then((response) => {
            this.elements = response.data.docs_shuffled;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        if (error) throw error;
      }
    },
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
  created() {},
  mounted() {
    this.findLinkProperties();
  },
};
</script>
