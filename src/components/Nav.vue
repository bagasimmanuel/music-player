<template>
  <nav>
    <h1>Waves</h1>
    <button @click="toggleLibrary">
      Library
      <FontAwesomeIcon icon="fa-solid fa-music" />
    </button>
  </nav>
</template>

<script setup>
import { defineEmits } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const emit = defineEmits(["toggleLibrary"]);

const toggleLibrary = () => {
  emit("toggleLibrary");
};
</script>

<style lang="scss" scoped>
nav {
  min-height: 10vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  button {
    background: transparent;
    border: none;
    cursor: pointer;
    border: 2px solid rgb(65, 65, 65);
    padding: 0.5rem;
    transition: all 0.3s ease;
    &:hover {
      background: rgb(65, 65, 65);
      color: white;
    }
  }
}
</style>
