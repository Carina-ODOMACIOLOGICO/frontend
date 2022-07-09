<template>
  <v-container fluid>
    <v-layout row wrap v-for="document in documents" :key="document._id">
      <v-flex xs12 sm12>
        <v-card elevation="2">
          <v-card-text>
            <v-card-title>{{ document.nombre }}</v-card-title>
            <v-card-text> {{ document.detalle }}</v-card-text>
            <v-list-item
              tree-line
              v-for="link in document.links"
              :key="link._id"
            >
              <v-list-item-content>
                <v-list-item-title>{{ link.nombre }}</v-list-item-title>
                <v-list-item-subtitle
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                  ]"
                  ><router-link :to="`${link.url}`"
                    >URL: {{ URLServer }}{{ link.url }}</router-link
                  >
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  [Rango: {{ link.rango }} - Orden: {{ link.orden }} ]
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "Links",
  data() {
    return {
      links: [],
      isActive: false,
      isExactActive: false,
      documents: [],
    };
  },
  methods: {
    getDocuments() {
      axios
        .get(`${this.URLServer}/onGetAllLinks`)
        .then((response) => {
          this.documents = response.data.corpus;
        })
        .catch((error) => {
          throw error;
        });
    },
    getLinks() {
      axios
        .get(`${this.URLServer}api/links`)
        .then((response) => {
          this.links = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
  mounted() {
    this.getDocuments();
  },
};
</script>