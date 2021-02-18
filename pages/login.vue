<template>
  <v-row class="d-flex justify-center align-center login--container">
    <v-col cols="4">
      <v-card>
        <v-card-title class="d-flex justify-center">
          <v-img src="/talently-logo.png" max-width="150"></v-img>
        </v-card-title>
        <v-card-text>
          <v-form>
            <span class="black--text">Email</span>
            <v-text-field v-model="user.email" outlined></v-text-field>
            <span class="black--text">Password</span>
            <v-text-field
              v-model="user.password"
              outlined
              type="password"
            ></v-text-field>
            <v-btn
              @click="userLogin"
              class="text-none font-weight-regular"
              large
              depressed
              block
              color="#30308C"
              dark
              >Iniciar sesión</v-btn
            >
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
      email: "test1@gmail.com",
      password: "123456",
    },
  }),
  methods: {
    async userLogin() {
      try {
        const { status } = await this.$auth.loginWith("local", {
          data: this.user,
        });

        const {data} = await this.$axios.post("content");
        this.$store.dispatch("listContentAdd", data.content);

        if (status === 200) this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login--container {
  height: 100vh;
}
</style>