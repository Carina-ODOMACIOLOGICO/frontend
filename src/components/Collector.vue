<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12">
        <form-capture :elements="elements" :schema="schema" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import FormCapture from "./FormCapture.vue";
export default {
  name: "Collector",
  props: ["elements", "schema"],
  components: {
    FormCapture,
  },
  data: () => ({}),
  methods: {},
  computed: {
    URLServer() {
      return this.$store.state.URLServer;
    },
  },
};
</script>