<template>
  <v-container>
   <v-row>
     <v-col cols="8">
       <play-video></play-video>
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
    PlayVideo
  },
};
</script>
