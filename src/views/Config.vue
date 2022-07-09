<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card class="mx-auto" elevation="0">
          <v-container>
            <v-btn-toggle v-model="card" borderless>
              <v-btn value="links">
                <span class="hidden-sm-and-down">Enlaces</span>
                <v-icon dense right> mdi-link </v-icon>
              </v-btn>
              <v-btn value="new">
                <span class="hidden-sm-and-down">Nuevo enlace</span>
                <v-icon dense right> mdi-link-plus </v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card elevation="2">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="12" v-if="card == 'links'">
                <v-card-title>Listado de links</v-card-title>
                <v-card-text>
                  Lins para carga de datos, permiten alimentar los dataset
                  dependiendo de los campos seleccionados</v-card-text
                >
                <v-list-item tree-line v-for="link in links" :key="link._id">
                  <v-list-item-content>
                    <v-list-item-title>{{ link.nombre }}</v-list-item-title>
                    <v-list-item-subtitle
                      ><router-link :to="`${link.url}`"
                        >URL: {{ URLServer }}{{ link.url }}</router-link
                      >
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      [Rango: {{ link.rango }} - Orden: {{ link.orden }} ]
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col cols="12" md="12" v-if="card == 'new'">
                <v-card-title>Crear nuevo link</v-card-title>
                <v-card-text
                  >Cree un nuevo link para carga de datos. Configure cuantos
                  registros se cargaran y en que modo se presentaran a los
                  usuarios(random, ascendente, descendente, etc.)
                </v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-text-field
                    v-model="link.nombre"
                    label="Nombre"
                    required
                    dense
                    outlined
                    messages="Escriba un nombre relacionado con el público que lo accederá"
                  ></v-text-field>
                  <v-text-field
                    v-model="link.descripcion"
                    label="Descripción de la actividad"
                    required
                    dense
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="link.url"
                    label="Enlace"
                    readonly
                    required
                    dense
                    outlined
                  ></v-text-field>

                  <v-text-field
                    v-model="link.rango"
                    label="Rango"
                    required
                    dense
                    outlined
                    messages="Escriba la cantidad de elementos que desea alimentar, -1"
                  ></v-text-field>

                  <v-select
                    v-model="link.orden"
                    :items="['random', 'ascendente', 'descendente']"
                    label="Orden de presentación"
                    required
                    dense
                    outlined
                  ></v-select>

                  <v-btn color="success" class="mr-4" @click="saveLink">
                    Guardar
                  </v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import { uuid } from "vue-uuid";

export default {
  name: "Config",
  props: ["id_document", "schema"],
  data: () => ({
    link: {
      url: `/fill_data/${uuid.v4()}`,
      nombre: "",
      rango: "100",
      orden: "random",
      descripcion: "",
    },
    corpus: { iteraciones: [] },
    card: "links",
    links: [],
  }),
  components: {},
  methods: {
    getDocumentById() {
      axios
        .get(
          `${this.URLServer}/getCorpusOfDocument/${this.id_document}/${this.schema}`
        )
        .then((response) => {
          this.corpus = response.data.corpus;
          this.link.url = `/filldata/${this.id_document}/${uuid.v4()}`;
          this.links = this.corpus.links;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveLink() {
      axios
        .post(`${this.URLServer}/setLinksOfDocument/${this.id_document}`, {
          link: this.link,
        })
        .then((response) => {
          this.getDocumentById();
          this.card = "links";
        });
    },
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
  mounted() {
    this.getDocumentById();
  },
};
</script>
