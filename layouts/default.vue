<template>
  <v-app>
    <v-app-bar flat app color="#ECF1F6">
      <v-container class="d-flex">
        <div>
          <v-img src="/talently-logo.png" max-width="100"></v-img>
        </div>
        <v-spacer />
        <v-btn @click="closeSession()" class="text-none btn--exit" text
          >Cerrar sesión <v-icon class="ml-3">mdi-exit-to-app</v-icon></v-btn
        >
      </v-container>
    </v-app-bar>
    <v-main class="content">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    async closeSession() {
     await this.$auth.logout();
     this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background-color: #ecf1f6;
}

.btn--exit {
  letter-spacing: normal;
  font-weight: 600;
}
</style>
