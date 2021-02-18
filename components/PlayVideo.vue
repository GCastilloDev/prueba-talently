<template>
  <div>
    <client-only>
      <vimeo-player ref="player" :video-id="videoID" @durationchange="prueba" />
    </client-only>
  </div>
</template>

<script>
export default {
    data: () => ({
        videoID: "39619054"
    }),
    methods: {
        prueba(e) {
            console.log(e);
        }
    }
};
</script>

<style lang="scss" scoped>

</style>