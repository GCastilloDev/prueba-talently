<template>
  <v-row class="d-flex justify-center align-center login--container">
    <v-col cols="3">
      <v-card class="pa-3">
        <v-card-title class="d-flex justify-center mt-5 mb-5">
          <v-img src="/talently-logo.png" max-width="150"></v-img>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <div class="mb-2">
              <span class="black--text">Nombre</span>
            </div>
            <v-text-field
              dense
              v-model="user.name"
              outlined
              :rules="isRequired"
              type="text"
            ></v-text-field>
            <div class="mb-2">
              <span class="black--text">Email</span>
            </div>
            <v-text-field
              dense
              v-model="user.email"
              outlined
              :rules="emailRules"
              type="email"
            ></v-text-field>
            <div class="d-flex justify-space-between mb-2">
              <span class="black--text">Password</span>
            </div>
            <v-text-field
              dense
              v-model="user.password"
              outlined
              :rules="passwordRules"
              type="password"
            ></v-text-field>

            <v-alert type="error" v-if="error">
              {{ messageError }}
            </v-alert>
            <v-btn
              @click="createAccount"
              class="text-none btn--text"
              :loading="loading"
              large
              depressed
              block
              color="#30308C"
              dark
              >Crear cuenta</v-btn
            >
            <p class="text-center mt-5 create-account">
              <span>¿Ya tienes cuenta?</span>

              <NuxtLink to="/login" class="create-account--link"
                >Inicia sesión.</NuxtLink
              >
            </p>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: "session",
  data: () => ({
    user: {
      name: "",
      email: "",
      password: "",
    },
    valid: true,
    emailRules: [
      (v) => !!v || "Campo requerido",
      (v) => /.+@.+\..+/.test(v) || "Ingresa un formato de email válido",
    ],
    isRequired: [(v) => !!v || "Campo requerido"],
    passwordRules: [
      (v) => !!v || "Campo requerido",
      (v) => (v && v.length >= 6) || "Campo requiere como mínimo 6 caracteres",
    ],
    loading: false,
    error: false,
    messageError: "",
  }),
  methods: {
    async createAccount() {
      if (!this.$refs.form.validate()) return;

      try {
        this.loading = true;
        const response = await this.$axios.post(`auth/register`, this.user);

        if (!response.data.success) {
          this.messageError = "Correo ya registrado.";
          this.error = true;

          setTimeout(() => {
            this.error = false;
          }, 3000);
        }

        if (response.data.success) this.$router.push("/login");
      } catch (err) {
        this.messageError = "Tuvimos un problena, intentalo más tarde.";
        this.error = true;

        setTimeout(() => {
          this.error = false;
        }, 3000);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login--container {
  height: 100vh;
  background-color: #ecf1f6;
}

.password-recovery {
  color: #30308c;
  font-size: 0.95rem;
}

.btn--text {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: normal;
}

.create-account {
  font-size: 12px;
  color: #000000;
}

.create-account--link {
  color: #30308c;
  font-weight: 700;
}
</style>