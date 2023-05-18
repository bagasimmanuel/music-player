<template>
  <Song :currentSong="currentSong" />
  <Player
    :currentSong="currentSong"
    :isPlaying="isPlaying"
    @playOrPause="updateIsPlaying"
    :audioRef="audioRef"
    :songInfo="songInfo"
  />
  <Library
    :audioRef="audioRef"
    :songs="songs"
    @selectSong="updateSelectedSong"
    :isPlaying="isPlaying"
  />
  <audio
    @timeupdate="updateSongInfo"
    @loadedmetadata="updateSongInfo"
    :src="`${currentSong.audio}`"
    ref="audioRef"
  ></audio>
</template>
<script setup>
import { ref, reactive } from "vue";
import Song from "@/components/Song.vue";
import Player from "@/components/Player.vue";
import Library from "@/components/Library.vue";
import data from "./util";
//Song
const songs = ref(data);
let currentSong = ref(songs.value[0]);

const updateSelectedSong = (selectedSongId) => {
  const index = songs.value.findIndex((song) => song.id === selectedSongId);
  currentSong.value.active = false;

  currentSong.value = songs.value[index];
  currentSong.value.active = true;
};

//Player
let isPlaying = ref(false);
const updateIsPlaying = () => {
  isPlaying.value = !isPlaying.value;
};

// Here comes the pain of audioRef from player to App.vue
const audioRef = ref(null);

// Song Info
const songInfo = reactive({
  currentTime: 0,
  duration: 0,
});

const updateSongInfo = (e) => {
  songInfo.currentTime = e.target.currentTime;
  songInfo.duration = e.target.duration;
};
</script>
<style>
h1,
h2,
h3 {
  color: rgb(54, 54, 54);
}
body {
  font-family: "Lato", sans-serif;
}
h3,
h4 {
  font-weight: 400;
  color: rgb(100, 100, 100);
}
</style>
