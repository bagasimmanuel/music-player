<template>
  <div class="library">
    <h2>Library</h2>
    <div class="library-songs">
      <LibrarySong
        v-for="song in props.songs"
        :songs="songs"
        :song="song"
        :key="song.id"
        @updateSelectedSong="selectSong"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from "vue";
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
});
onMounted(() => {});
</script>

<style scoped lang="scss">
.library {
  position: fixed;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100%;
  box-shadow: 2px 2px 50px rgb(203, 203, 203);
  overflow: scroll;
  h2 {
    padding: 2rem;
  }
}

.library-songs {
  display: flex;
  flex-direction: column;
}
</style>
