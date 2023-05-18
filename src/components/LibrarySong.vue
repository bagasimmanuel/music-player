<template>
  <div @click="selectSong" class="library-song" :class="isActive">
    <img :src="`${song.cover}`" />
    <div class="song-description">
      <h3>{{ song.name }}</h3>
      <h4>{{ song.artist }}</h4>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from "vue";
import { playAudio } from "../util";
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
  playAudio(props.isPlaying, props.audioRef);
};

const isActive = computed(() => {
  if (props.song.active === true) {
    return "is-active";
  }
});
</script>

<style scoped lang="scss">
.library-song {
  display: flex;
  padding: 1rem 2rem 1rem 2rem;
  cursor: pointer;
  transition: background 0.5s ease;
  img {
    width: 30%;
  }
  &:hover {
    background: rgba(224, 255, 255, 0.212);
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

.is-active {
  background-color: lightcyan;

  &:hover {
    background: rgba(224, 255, 255, 0.212);
  }
}
</style>
