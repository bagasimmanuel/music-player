<template>
  <div @click="selectSong" class="library-song">
    <img :src="`${song.cover}`" />
    <div class="song-description">
      <h3>{{ song.name }}</h3>
      <h4>{{ song.artist }}</h4>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["updateSelectedSong"]);

const props = defineProps({
  song: {
    required: true,
  },
  songs: {
    required: true,
  },
  audioRef: {
    type: Object,
  },
  isPlaying: {
    type: Boolean,
  },
});
// Steps
// Emit the id to the top parent, trus dapetin the index, change the currentSong
// For which song is active, tiap library song component will have a computed seng decide kalau
// props.songs.filter((song) => song.id === props.song.id); itu sama, kalau sama brarti isActive

const selectSong = () => {
  emit("updateSelectedSong", props.song.id);
  if (props.isPlaying) {
    const playPromise = props.audioRef.play();
    if (props.audioRef.play() !== undefined) {
      playPromise.then((audio) => {
        props.audioRef.play();
      });
    }
  }
};
</script>

<style scoped lang="scss">
.library-song {
  display: flex;
  padding: 1rem 2rem 1rem 2rem;
  cursor: pointer;
  img {
    width: 30%;
  }
  &:hover {
    background: lightcyan;
  }
}
.song-description {
  padding-left: 1rem;
  h3 {
    font-size: 1rem;
  }
  h4 {
    font-size: 0.75rem;
  }
}
</style>
