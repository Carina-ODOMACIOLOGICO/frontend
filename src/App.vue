<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Diccionario Onomaciológico</v-toolbar-title>

      <v-spacer></v-spacer>

      <template> </template>
    </v-app-bar>
    <v-main>
      <v-navigation-drawer v-model="drawer" absolute left temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item to="/" link>
              <v-list-item-title> Inicio </v-list-item-title>
            </v-list-item>

            <v-list-item to="/documents">
              <v-list-item-title> Documentos </v-list-item-title>
            </v-list-item>

            <!--v-list-item to="/train">
              <v-list-item-title>Entrenamiento</v-list-item-title>
            </v-list-item>

            <v-list-item to="/upload_file">
              <v-list-item-title>Subir imágenes </v-list-item-title>
            </v-list-item-->
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import socket from "./socket";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
    conected: false,
    server: {
      name: "",
      version: "",
    },
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  created() {
    socket.connect();

    socket.on("connect", () => {
      this.conected = true;
    });

    // socket getters
    socket.emit("getVersion", {});

    // socket listeners
    socket.on("onVersion", (data) => {
      this.server.name = data.name;
      this.server.version = data.version;
      if (data) this.conected = true;
    });

    socket.on("disconnect", (data) => {
      this.conected = false;
    });
  },
};
</script>
<style></style>
