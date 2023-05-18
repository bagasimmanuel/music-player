<template>
  <div class="player">
    <div class="time-control">
      <p>{{ formattedCurrentTime }}</p>
      <input
        min="0"
        :max="`${songInfo.duration || 0}`"
        :value="`${songInfo.currentTime}`"
        @change="sliderHandler"
        type="range"
      />
      <p>{{ formattedDuration }}</p>
    </div>
    <div class="play-control">
      <font-awesome-icon
        @click="skipSong('skip-back')"
        class="skip-back"
        icon="fa-solid fa-angle-left"
        size="2x"
      />
      <Transition name="fade" mode="out-in">
        <font-awesome-icon
          :key="new Date().getTime()"
          :icon="computedPlayOrPause"
          @click="playOrPause"
          class="play"
          size="2x"
        />
        <!-- Need the key so that the transition works
        https://stackoverflow.com/questions/49427008/how-to-apply-transitions-to-font-awesome-5-vue-icons -->
      </Transition>
      <font-awesome-icon
        @click="skipSong('skip-forward')"
        class="skip-forward"
        icon="fa-solid fa-angle-right"
        size="2x"
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  currentSong: {
    type: Object,
    required: true,
  },
  isPlaying: {
    type: Boolean,
    required: true,
  },
  audioRef: {
    type: Object,
  },
  songInfo: {
    type: Object,
  },
});

const sliderHandler = (e) => {
  props.audioRef.currentTime = e.target.value;
  props.songInfo.currentTime = e.target.value;
};

const formattedCurrentTime = computed(() => {
  return formatTime(props.songInfo.currentTime);
});

const formattedDuration = computed(() => {
  // console.log(props.songInfo.duration);
  return props.songInfo.duration ? formatTime(props.songInfo.duration) : "0:00";
});

const formatTime = (timeInMillis) => {
  return (
    Math.floor(timeInMillis / 60) +
    ":" +
    ("0" + Math.floor(timeInMillis % 60)).slice(-2)
  );
};

// Emits
const emit = defineEmits(["playOrPause", "skipSong"]);
const playOrPause = () => {
  if (props.isPlaying) {
    props.audioRef.pause();
  } else {
    props.audioRef.play();
  }
  emit("playOrPause");
};

const skipSong = (data) => {
  if (data === "skip-forward") {
    emit("skipSong", 1);
    return;
  }
  emit("skipSong", -1);
};
// Props accessed in js, need to use props.propName
// meanwhile di template no need, just use propName

// Computed Template
const computedPlayOrPause = computed(() => {
  return props.isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play";
});
</script>

<style scoped lang="scss">
.player {
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.time-control {
  display: flex;
  width: 50%;
  justify-content: space-between;
  input {
    width: 100%;
    padding: 1rem 0rem;
  }
  p {
    padding: 1rem;
  }
}
.play-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  width: 30%;
  svg {
    cursor: pointer;
  }
}

// Transitions, will tweak around later
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup></script>
