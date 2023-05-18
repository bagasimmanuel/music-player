<template>
  <div class="library" :class="isLibraryOpen">
    <h2>Library</h2>
    <div class="library-songs">
      <LibrarySong
        v-for="song in props.songs"
        :songs="songs"
        :song="song"
        :key="song.id"
        @updateSelectedSong="selectSong"
        :audioRef="audioRef"
        :isPlaying="isPlaying"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, onMounted } from "vue";
import LibrarySong from "@/components/LibrarySong.vue";

const emit = defineEmits(["selectSong"]);

const selectSong = (data) => {
  emit("selectSong", data);
};

const props = defineProps({
  songs: {
    type: Object,
    required: true,
  },
  audioRef: {
    type: Object,
  },
  isPlaying: {
    type: Boolean,
  },
  libraryStatus: {
    type: Boolean,
    required: true,
  },
});
const isLibraryOpen = computed(() => {
  return props.libraryStatus ? "active-library" : "";
});
</script>

<style scoped lang="scss">
.library {
  position: fixed;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100%;
  box-shadow: 2px 2px 50px rgb(203, 203, 203);
  transform: translateX(-100%);
  transition: all 0.5s ease;
  opacity: 0;
  overflow: scroll;
  h2 {
    padding: 2rem;
  }
}
.active-library {
  transform: translateX(0%);
  opacity: 1;
}

.library-songs {
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 768px) {
  .library {
    width: 100%;
    opacity: 1;
    background: white;
  }
}
</style>
