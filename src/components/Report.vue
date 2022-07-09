<template>
  <v-container>
    <v-layout row wrap v-if="visibleReport">
      <v-flex xs12 sm12 md12>
        <v-row>
          <v-col cols="12" md="12">
            <v-card class="mx-auto">
              <v-card-title> Resultado más próximo</v-card-title>
              <v-card-subtitle v-for="(field, i) in fields" :key="i">
                <div v-if="field == 'imagen'">
                  <v-img max-width="250" :src="`${URLServer}/uploads/${detail[0][field]}`" class="text-right pa-2" />
                </div>
                <div v-else>{{ field }}: {{ detail[0][field] }}</div>
              </v-card-subtitle>
              <v-card-actions>
                <v-btn color="orange lighten-2" text> Más resultados similares </v-btn>

                <v-spacer></v-spacer>

                <v-btn icon @click="show = !show">
                  <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="show">
                  <v-divider></v-divider>
                  <v-card-text v-for="(item, i) in detail" :key="i">
                    <v-card-text v-for="(field, j) in fields" :key="j">
                      <div v-if="field == 'imagen'">
                        <v-img max-width="250" :src="`${URLServer}/uploads/${item[field]}`" class="text-right pa-2" />
                      </div>
                      <div v-else>
                        <b>{{ field }}</b
                        >: {{ item[field] }} {{ field }}: {{ detail[i][field] }}
                      </div>
                    </v-card-text>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Report",
  props: ["fields", "schema", "prediction", "visibleReport", "detail"],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
};
</script>
<style></style>
