<template>
  <v-container>
    <h1>Car</h1>
    <p>{{ nombres }}</p>
    <p>{{ apellidos }}</p>
    <p>{{ identificacion }}</p>
    <p>{{ correo }}</p>
  </v-container>
</template>
<script>
export default {
  name: "Car",
  data() {
    return {
      nombres: "Alexander",
      apellidos: "Toscano Ricardo",
      identificacion: "78753406",
      correo: "kikret@gmail.com",
    };
  },
};
</script>
<style>
</style>