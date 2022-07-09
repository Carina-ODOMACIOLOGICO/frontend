<template>
  <v-container fluid>
    <div v-if="elements !== undefined">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-carousel
              v-model="page"
              hide-delimiter-background
              delimiter-icon="mdi-minus"
              :continuous="false"
            >
              <v-carousel-item
                v-for="(element, i) in elements"
                :key="i"
                :src="`${URLServer}/uploads/${element.imagen}`"
                contain
                reverse-transition="fade-transition"
                transition="fade-transition"
              >
                <v-card-title
                  class="blue lighten-3 transparent"
                  v-text="`${page + 1}. ${element.nombre}`"
                ></v-card-title>
              </v-carousel-item>
            </v-carousel>
            <v-card-text>
              <v-textarea
                rows="5"
                solo
                name="input-7-4"
                label="Describe la imagen aquí"
                v-model="detail"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                large
                :loading="false"
                :disabled="false"
                color="info"
                class="ma-2 white--text"
                @click="saveDescription"
              >
                Guardar descripción
                <v-icon right dark> mdi-content-save </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
export default {
  name: "FormCapture",
  props: ["element", "schema", "elements"],
  event: "incrementPage",
  data: () => ({
    detail: "",
    model: 0,
    page: 0,
  }),
  computed: {
    pageLocal: {
      get: function () {
        return this.page;
      },
      set: function (value) {
        this.$emit("nextOnSave");
      },
    },
  },
  methods: {
    saveDescription() {
      let id = this.elements[this.page]._id;
      axios
        .post(`${this.URLServer}/detail/${this.schema}/${id}`, {
          detail: this.detail,
        })
        .then((response) => {
          this.detail = "";
          this.page++;
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
};
</script>
<style scoped>
.transparent {
  opacity: 0.65;
}
</style>