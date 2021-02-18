<template>
  <div class="pl-4">
    <h1>Contenido</h1>
    <div class="play-list--items">
      <play-list-item
        v-for="(item, index) in items"
        :key="index"
        :item="item"
      ></play-list-item>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  components: {
    playListItem: () => import("./playListItem"),
  },
  data: () => ({
    items: [],
  }),
  methods: {
    async init() {
      if (this.$store.state.listContent !== undefined) {
        this.items = this.$store.state.listContent;
        return;
      }
      try {
        const { data } = await this.$axios.post("content");
        this.$store.dispatch("listContentAdd", data.content);
        // this.items = this.$store.state.listContent;
      } catch (error) {
        console.warn(error);
      }
    },
  },
  computed: {
    listContent() {
      this.items = this.$store.getters["getListContent"];
    },
  },
};
</script>

<style lang="scss" scoped>
.play-list--items {
  background-color: lightblue;
  height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>