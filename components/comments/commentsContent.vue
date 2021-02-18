<template>
  <div>
    <h2 class="mb-3">{{ comments.length }} Comentarios</h2>
    <section class="d-flex white pa-5 rounded-lg">
      <v-icon class="mr-5" color="#30308C" x-large>mdi-account-circle</v-icon>
      <v-text-field
        @keydown="keyDownListener"
        v-model="comment"
        placeholder="Agregar comentario"
        dense
        hide-details
        filled
        solo
        flat
        background-color="#ECF1F6"
      ></v-text-field>
    </section>
    <comment-item
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      :index="index"
    ></comment-item>
  </div>
</template>

<script>
export default {
  components: {
    commentItem: () => import("./commentItem"),
  },
  created() {
    this.init();
  },
  data: () => ({
    comment: "",
  }),
  methods: {
    async init() {
      try {
        const idContent = this.$store.state.listContent[this.index].id;
        const { data } = await this.$axios.post(
          `content/${idContent}/comments`
        );
        const comments = data.comments.reverse();
        this.$store.dispatch("updateComments", comments);
      } catch (error) {
        console.warn(error);
      }
    },
    async keyDownListener(e) {
      if (e.key === "Escape") {
        this.comment = "";
      }

      if (e.key === "Enter" && this.comment.trim() != "") {
        const data = {};
        data.content = this.comment.trim();
        data.user_id = this.$store.state.auth.user.id;
        data.content_id = this.$store.state.listContent[this.index].id;
        await this.setComment(data);
      }
    },
    async setComment(data) {
      try {
        const response = await this.$axios.post("comment/create", data);
        if (response.status === 200) {
          this.comment = "";
          const comment = response.data.message;
          comment.user = this.$store.state.auth.user;
          this.$store.dispatch("agregateComment", comment);
        }
      } catch (error) {
        console.warn(error);
      }
    },
  },
  computed: {
    comments() {
      return this.$store.getters["getComments"];
    },
    index() {
      return this.$store.state.index;
    },
  },
  watch: {
    index: function () {
      this.init();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>