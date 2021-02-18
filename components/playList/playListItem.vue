<template>
  <v-row class="video--item">
    <v-col cols="4"
      ><client-only>
        <vimeo-player
          class="video--content vide--item"
          ref="player"
          :video-id="videoID"
          :options="options"
          @play="play"
        /> </client-only
    ></v-col>
    <v-col cols="4" class="title-wrapper">
      <p class="title">{{ item.title }}</p>
      <span class="subtitle">
        <v-icon small class="pb-1">mdi-clock-outline</v-icon> 1 min</span
      >
    </v-col>
    <v-col cols="4" class="d-flex justify-center align-center">
      <v-progress-circular
        v-if="item.progress < 10"
        :value="item.progress * 10"
        color="#30308C"
      ></v-progress-circular>
      <v-icon v-else color="#30308C" large>mdi-check-circle</v-icon>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.getVideoId();
  },
  data: () => ({
    videoID: "",
    options: {
      autoplay: false,
      responsive: true,
      controls: true,
    },
    time: "",
  }),
  methods: {
    getVideoId() {
      this.videoID = this.item.video_url.split("/")[3];
    },
    play(e) {
      this.$refs.player.pause();
      this.$store.dispatch("updateIndex", this.index);
    }
  },
  computed: {
    getProgress() {
      const listContent = this.$store.getters["getListContent"];
      this.progress = listContent[this.index].progress;
    },
  },
};
</script>

<style lang="scss" scoped>
.video--content {
  width: 100%;
}

.title-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .title {
    font-weight: bold;

    font-size: 1.2rem !important;
    height: 1.5rem;
  }
  .subtitle {
    font-weight: regular;
    font-size: 0.85rem;
    margin-bottom: 0;
  }
}

.video--item:hover {
  cursor: pointer;
}
</style>