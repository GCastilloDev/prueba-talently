<template>
  <div class="white">
    <v-container>
      <h2 class="mb-3 mt-3">{{ item.title }}</h2>
      <p>
        {{ item.description }}
      </p>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>