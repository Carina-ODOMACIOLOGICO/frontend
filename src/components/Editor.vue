<template>
  <v-container> </v-container>
</template>
<script>
export default {
  name: "Editor",
  components: {},
  data: () => ({
    elements: [],
  }),
  methods: {
    getElements(numElements) {
      try {
        for (let i = 1; i < numElements; i++) {
          let id = Math.trunc(Math.random() * (256 - 1) + 1);
          let url = `https://picsum.photos/id/${id}/300/200`;
          this.elements.push({ id: i, img: url });
        }
      } catch (error) {
        if (error) throw error;
      }
    },
  },
  created() {
    // console.log(this.$el);
  },
  mounted() {
    // console.log(this.$el);
    this.getElements(20);
  },
};
</script>
<style>
</style>