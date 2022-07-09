<template>
  <v-container>
    <v-layout row wrap v-if="visibleAnimals">
      <v-flex xs12 sm12 md12>
        <v-card class="mx-auto">
          <v-list two-line>
            <v-list-item-group active-class="blue--text">
              <template v-for="animal in animales">
                <v-list-item :key="animal.code">
                  <template>
                    <v-list-item-avatar>
                      <v-img
                        :alt="`${animal.nombre} avatar`"
                        :src="`${server}${uploads}${animal.imagen}`"
                      ></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="animal.nombre"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        class="text--primary"
                        v-text="animal.nombre_científico"
                      ></v-list-item-subtitle>

                      <v-list-item-subtitle
                        v-text="`Descripciones ${animal.descripcion.length}`"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Animals",
  props: {
    animales: {
      type: Array,
      default: function () {
        return [];
      },
    },
    visibleAnimals: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: [2],
      server: "http://192.168.1.53:5000",
      uploads: "/uploads/",
    };
  },
};
</script>
<style>
</style>