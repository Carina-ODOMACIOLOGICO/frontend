<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> Entrenar </v-btn>
      </template>

      <v-card elevation="1">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Entrenamiento</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false"> Cerrar </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Informacion básica</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Campos para entrenamiento </v-list-item-title>
              <v-list-item-subtitle v-for="(field, index) in fields" :key="index">
                <v-icon small color="blue"> mdi-bookmark-box-multiple </v-icon>
                {{ field.text }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Cantidad de registros para entrenar</v-list-item-title>
              <v-list-item-subtitle>
                <v-icon small color="blue"> mdi-sort-numeric-variant </v-icon>
                {{ data.length }}</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark @click="training" v-if="!showProgress"> Iniciar entrenamientoo </v-btn>
          </v-card-actions>
        </v-list>
        <v-divider></v-divider>
        <v-row>
          <v-col cols="1" sm="1" md="1"></v-col>
          <v-col cols="10" sm="10" md="10">
            <div v-if="showProgress">
              <p class="font-weight-bold">Total: {{ value }}% - Bufer: {{ valueBufer }}%</p>
              <v-progress-linear :buffer-value="valueBufer" :value="value" stream></v-progress-linear>
              <v-progress-linear v-model="valuePartial" :active="show" :indeterminate="false" :query="true"></v-progress-linear>
            </div>
            <template v-if="showProgress">
              <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
                <v-timeline-item v-for="(item, i) in items" :key="i" :color="item.color" :icon="item.icon" fill-dot>
                  <v-card :color="item.color" dark>
                    <v-card-title class="text-h6">
                      {{ item.title }}
                    </v-card-title>
                    <v-card-text class="white text--primary">
                      <p>{{ item.text }}</p>
                    </v-card-text>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </template>
          </v-col>
          <v-col cols="1" sm="1" md="1"></v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import socket from "../socket";
export default {
  props: ["fields", "data", "id_documento"],
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      value: 0,
      valueBufer: 0,
      indeterminate: false,
      items: [],
      valuePartial: 0,
      showProgress: false,
      show: false,
    };
  },
  methods: {
    training() {
      console.log("Training");
      axios
        .post(`${this.URLServer}/train/${this.id_documento}`, {
          fields: this.fields,
          dataTrain: this.data,
          nameTrain: uuidv4(),
          testrain: 0,
        })
        .then((response) => {
          this.showProgress = true;
          this.indeterminate = true;
        });
    },
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
  created() {
    socket.on("initTrain", () => {
      this.items = [];
    });
    socket.on("addItem", (data) => {
      this.items.unshift({
        color: data.color,
        title: data.title,
        text: data.text,
        train: true,
        icon: "mdi-check-circle",
      });
      this.value = Math.round((data.progress * 100) / 11);
      this.valueBufer = Math.round((data.progress * 100) / 11 + 10);
    });

    socket.on("partialProgress", (data) => {
      this.valuePartial = data.valuePartial;
    });
  },
};
</script>
