<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card class="mx-auto" elevation="0">
          <v-container>
            <v-btn-toggle v-model="card" borderless>
              <v-btn value="new">
                <span>Nuevo documento</span>
                <v-icon dense right> mdi-folder-plus-outline </v-icon>
              </v-btn>

              <v-btn value="detail">
                <span>Documentos</span>
                <v-icon dense right> mdi-folder-outline </v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card class="mx-auto" v-if="card == 'new'">
          <v-container>
            <v-text-field v-model="nombre" label="Nombre del documento" required></v-text-field>

            <v-textarea v-model="detalle" outlined label="Detalle del documento" value="" rows="3"></v-textarea>
            <v-btn color="success" class="mr-4" @click="saveDocument"> Crear nuevo documento </v-btn>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <v-card class="mx-auto" v-if="card == 'detail'">
          <v-container>
            <v-select item-text="nombre" item-value="id" :items="documents" label="Documentos" v-model="docSel" @change="getDocumentById"></v-select>
            <div v-if="!isData">
              <p class="font-weight-black">Este documento no posee datos aún, presione el botón para cargar.</p>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="blue lighten-1" dark v-bind="attrs" v-on="on" :to="`/upload_file/image/${docSel}`">
                    <v-icon class="blue lighten-1" dark> mdi-cloud-upload </v-icon>
                  </v-btn>
                </template>
                <span>Cargar imágenes</span>
              </v-tooltip>

              <!--v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="blue lighten-1"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    :to="`/upload_file/csv/${docSel}`"
                  >
                    <v-icon class="blue lighten-1" dark>
                      mdi-cloud-upload
                    </v-icon>
                  </v-btn>
                </template>
                <span>Cargar CSV</span>
              </v-tooltip-->
            </div>
            <v-list subheader three-line v-if="Object.keys(corpus).length !== 1">
              <v-subheader>Fuente de información</v-subheader>
              <v-list-item>
                <v-list-item-avatar>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="blue lighten-1" dark v-bind="attrs" v-on="on" :to="`/upload_file/image/${docSel}`">
                        <v-icon class="blue lighten-1" dark> mdi-cloud-upload </v-icon>
                      </v-btn>
                    </template>
                    <span>Cargar imágenes</span>
                  </v-tooltip>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ corpus.nombre }}</v-list-item-title>
                  <v-list-item-subtitle>{{ corpus.detalle }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    <v-btn outlined small color="warning" class="ma-2 white--text" :to="`/config/${docSel}/${corpus.schema}`">
                      Confguración
                      <v-icon right dark> mdi-cog-outline </v-icon>
                    </v-btn>
                    <v-btn outlined small color="blue-grey" class="ma-2 white--text" :to="`/train/${docSel}/${corpus.schema}`">
                      Entrenamiento
                      <v-icon right dark> mdi-blur </v-icon>
                    </v-btn>
                    <v-btn outlined small color="purple" class="ma-2 white--text" :to="`/dataset/${docSel}/${corpus.schema}`">
                      Datasets
                      <v-icon right dark> mdi-folder-star-outline </v-icon>
                    </v-btn>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>

            <v-list three-line v-if="corpus.iteraciones.length !== 0">
              <div v-for="(iteracion, i) in corpus.iteraciones" :key="i">
                <v-list-item>
                  <v-list-item-avatar tile size="100" v-if="iteracion.imagen">
                    <v-img :src="`${URLServer}/uploads/${iteracion.imagen}`"></v-img>
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title v-if="iteracion.espanol" v-html="`${iteracion.espanol}`"></v-list-item-title>
                    <v-list-item-title v-if="iteracion.embera" v-html="`${iteracion.embera}`"></v-list-item-title>

                    <v-list-item-title v-if="iteracion.nombre" v-html="`${iteracion.nombre}`"></v-list-item-title>
                    <v-list-item-subtitle v-if="iteracion.nombre_científico" v-html="`${iteracion.nombre_científico}`"></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-if="iteracion.descripcion"
                      v-html="`Total de descripciones ${iteracion.descripcion.length}`"
                    ></v-list-item-subtitle>

                    <v-list-item-subtitle
                      v-if="iteracion.imagen"
                      v-html="`<a href='${URLServer}/uploads/${iteracion.imagen}'>Ver imagen</a>`"
                    ></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </div>
            </v-list>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "Documents",
  data: () => ({
    documents: [],
    corpus: { iteraciones: [] },
    docSel: {
      id: "",
      nombre: "",
    },
    schema: "",
    animales: [],
    visibleAnimals: false,
    nombre: "",
    detalle: "",
    card: "",
    isData: true,
  }),
  components: {
    Animals: () => import("../components/Animals.vue"),
  },
  methods: {
    getDocuments() {
      axios
        .get(`${this.URLServer}/onGetAllCorpus`)
        .then((response) => {
          this.documents = response.data.corpus;
        })
        .catch((error) => {
          throw error;
        });
    },
    getDocumentById() {
      let schema = undefined;
      this.isData = false;

      schema = this.documents.find((data) => data.id === this.docSel).schema;

      if (schema !== undefined) {
        this.isData = true;
        axios
          .get(`${this.URLServer}/getCorpusOfDocument/${this.docSel}/${schema}`)
          .then((response) => {
            this.corpus = response.data.corpus;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.isData = false;
      }
    },
    showRegister(r) {
      this.register = r;
    },
    saveDocument() {
      let document = {
        nombre: this.nombre,
        detalle: this.detalle,
      };
      axios.post(`${this.URLServer}/onNewCorpus`, document).then((response) => {
        this.nombre = "";
        this.detalle = "";
        this.getDocuments();
        this.card = "detail";
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
