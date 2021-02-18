<template>
  <section class="white mt-5 rounded-lg">
    <v-row class="ma-0">
      <v-col cols="1">
        <v-icon class="ml-2" color="#80808A" x-large
          >mdi-account-circle</v-icon
        ></v-col
      >
      <v-col cols="10" class="pl-0">
        <p>
          <span class="font-weight-bold text-h6 mr-3">{{
            comment.user.name
          }}</span>
          <span class="text-subtitle-2 grey--text text--lighten-1">{{
            getMoment()
          }}</span>
        </p>
        <p v-if="!isEdit">
          {{ comment.content }}
        </p>
        <p v-if="isEdit">
          <v-text-field
            class="mb-2"
            @keydown="keyDownListener"
            v-model="commentUpdated"
            placeholder="Agregar comentario"
            dense
            hide-details
            filled
            solo
            flat
            background-color="#ECF1F6"
          ></v-text-field>
          <span class="cancel" @click="isEdit = false">Cancelar</span>
        </p>
      </v-col>
      <v-col cols="1" class="text-right">
        <v-menu offset-y left origin="top center" transition="scale-transition" v-if="!isEdit">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item-group class="pa-2">
              <v-list-item @click="editComment()">
                <v-list-item-icon class="mr-3">
                  <v-icon color="black">mdi-file-edit-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="deleteComment()">
                <v-list-item-icon class="mr-3">
                  <v-icon color="black">mdi-delete-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Eliminar</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    isEdit: false,
    commentUpdated: "",
  }),
  methods: {
    getMoment() {
      const milisecondsAgo = new Date(this.comment.created_at).getTime();
      const milisecondsActually = new Date().getTime();
      const minute = 60;
      const hour = 60 * minute;
      const day = 24 * hour;
      const month = day * 30;
      const year = month * 12;
      const seconsAgo = (milisecondsActually - milisecondsAgo) / 1000;

      if (seconsAgo / year >= 1) {
        const time = parseInt(seconsAgo / year);
        const message = `${time} años`;
        return message;
      }

      if (seconsAgo / month < 12 && seconsAgo / month > 1) {
        const time = parseInt(seconsAgo / month);
        const message = `${time} meses`;
        return message;
      }

      if (seconsAgo / day < 30 && seconsAgo / day > 1) {
        const time = parseInt(seconsAgo / day);
        const message = `${time} días`;
        return message;
      }

      if (seconsAgo / hour < 24 && seconsAgo / hour > 1) {
        const time = parseInt(seconsAgo / hour);
        const message = `${time} horas`;
        return message;
      }

      if (seconsAgo / minute < 24 && seconsAgo / minute > 1) {
        const time = parseInt(seconsAgo / minute);
        const message = `${time} minutos`;
        return message;
      }

      return `menos de 1 minuto`;
    },
    async deleteComment() {
      try {
        const idComment = this.comment.id;
        const { status } = await this.$axios.delete(`comment/${idComment}`);
        if (status === 200) this.$store.dispatch("deleteComment", this.index);
      } catch (error) {
        console.warn(error);
      }
    },
    keyDownListener(e) {
      if (e.key === "Escape") this.isEdit = false;
      if (e.key === "Enter") this.updateComment();
    },
    editComment() {
      this.commentUpdated = this.comment.content;
      this.isEdit = true;
    },
    async updateComment() {
      try {
        const data = {};
        data.content = this.commentUpdated;
        const idComment = this.comment.id;
        const { status } = await this.$axios.post(
          `comment/${idComment}/update`,
          data
        );
        if (status === 200) {
          const payload = {};
          payload.index = this.index;
          payload.content = this.commentUpdated;
          this.$store.dispatch("editComment", payload);
          this.isEdit = false;
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cancel {
  color: #30308c;
  font-size: 12px;
  font-weight: 500;
}

.cancel:hover {
  cursor: pointer;
}
</style>