<template>
  <Nav @toggleLibrary="updateLibraryStatus" />
  <Song :currentSong="currentSong" />
  <Player
    :currentSong="currentSong"
    :isPlaying="isPlaying"
    @playOrPause="updateIsPlaying"
    :audioRef="audioRef"
    :songInfo="songInfo"
    @skipSong="skipSong"
  />
  <Library
    :libraryStatus="libraryStatus"
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
import Nav from "@/components/Nav.vue";
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

// library status
let libraryStatus = ref(false);
const updateLibraryStatus = () => {
  libraryStatus.value = !libraryStatus.value;
};

// skipSong
const skipSong = (num) => {
  const totalSong = songs.value.length;
  const currentIndex = songs.value.findIndex(
    (song) => song.id === currentSong.value.id
  );
  // This logic is kinda stupid i think we can just do like below
  // let updatedIndex = currentIndex + num;
  // if (updatedIndex + num > totalSong - 1) {
  //   updatedIndex = 0;
  // } else if (updatedIndex + num < 0) {
  //   updatedIndex = totalSong - 1;
  // } else {
  //   updatedIndex += num;
  // }
  /////
  let updatedIndex = (currentIndex + num) % (totalSong - 1);
  if (updatedIndex < 0) updatedIndex = totalSong - 1;
  currentSong.value.active = false;

  currentSong.value = songs.value[updatedIndex];
  currentSong.value.active = true;
  if (isPlaying.value)
    if (isPlaying.value) {
      const playPromise = audioRef.value.play();
      if (audioRef.value.play() !== undefined) {
        playPromise.then((audio) => {
          audioRef.value.play();
        });
      }
    }
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
