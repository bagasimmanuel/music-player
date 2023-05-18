<template>
  <div class="player">
    <div class="time-control">
      <p>{{ formattedCurrentTime }}</p>
      <div class="track" :style="trackBackground">
        <input
          min="0"
          :max="`${songInfo.duration || 0}`"
          :value="`${songInfo.currentTime}`"
          @change="sliderHandler"
          type="range"
        />
        <div class="animate-track" :style="translateX"></div>
      </div>
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

//computed tracker style
const translateX = computed(() => {
  return `transform: translateX(${props.songInfo.animationPercentage}%)`;
});

const trackBackground = computed(() => {
  return `background : linear-gradient(to right, ${props.currentSong.color[0]},${props.currentSong.color[1]})`;
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
    appearance: none;
    background: transparent;
    cursor: pointer;
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

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  height: 16px;
  width: 16px;
}
.track {
  width: 100%;
  height: 1rem;
  position: relative;
  border-radius: 1rem;
  display: flex;
  overflow: hidden;
  transform: translateY(100%); // Idk why but we need this to align center
}

.animate-track {
  background: rgb(204, 204, 204);
  width: 100%;
  height: 100%;
  position: absolute;
  align-self: center;
  top: 0;
  left: 0;
  transform: translate(0%);
  pointer-events: none;
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
