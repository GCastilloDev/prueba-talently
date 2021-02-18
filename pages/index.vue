<template>
  <v-container>
    <v-row>
      <v-col cols="8" class="d-flex justify-center pa-0">
        <client-only>
          <vimeo-player
            class="video--content"
            ref="player"
            :video-id="videoID"
            :options="options"
            @timeupdate="prueba"
          />
        </client-only>
      </v-col>
      <v-col cols="4" class="red"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import PlayVideo from "~/components/PlayVideo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
    PlayVideo,
  },
  data: () => ({
    videoID: "39619054",
    options: {
      autoplay: true,
      responsive: true
    },
  }),
  methods: {
    prueba(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.video--content {
  width: 100%;
}
</style>
