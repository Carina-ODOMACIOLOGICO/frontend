<template>
  <v-container>
    <v-card class="mx-auto" max-width="344">
      <v-container fluid>
        <v-row dense>
          <v-col>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="user"
                :counter="10"
                :rules="userRules"
                label="Usuario"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Contraseña"
                required
              ></v-text-field>
              <v-btn color="warning" class="mr-4" @click="reset">
                Cancelar
              </v-btn>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
              >
                Login
              </v-btn>
            </v-form>
          </v-col>
        </v-row></v-container
      >
    </v-card>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    user: "",
    userRules: [(v) => !!v || "Usuario es requerido"],
    password: "",
    passwordRules: [
      (v) => !!v || "Contraseña es requerida",
      (v) => /.+@.+\..+/.test(v) || "La contraseña debe ser válida",
    ],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>
<style lang="css">
</style>