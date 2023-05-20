<template>
  <div class="song-container">
    <img :src="`${currentSong.cover}`" :style="rotateCover" />
    <h2>{{ currentSong.name }}</h2>
    <h3>{{ currentSong.artist }}</h3>
  </div>
</template>
<script setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  currentSong: {
    type: Object,
    required: true,
  },
  songInfo: {
    type: Object,
    required: true,
  },
});

const rotateCover = computed(() => {
  const degree = Math.round(
    (props.songInfo.currentTime / props.songInfo.duration) * 360
  );
  // console.log(degree);
  return `transform : rotate(${degree}deg)`;
});
</script>
<style scoped lang="scss">
.song-container {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  img {
    width: 20%;
    border-radius: 50%;
  }
  h2 {
    padding: 3rem 1rem 1rem 1rem;
  }
  h3 {
    font-size: 1rem;
  }
}

@media screen and (max-width: 768px) {
  .song-container {
    img {
      width: 60%;
    }
  }
}
</style>
