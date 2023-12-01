<template>
  <div>
    <Timeline :currentCard="currentCard" />
  </div>
</template>

<script>
import Timeline from "../components/TimeLine.vue";
import { subscribe } from "../../firebase";

export default {
  name: "Game",
  data() {
    return {
      currentCard: number,
    };
  },

  components: {
    Timeline,
  },

  mounted() {
    subscribe("games", "hast", (data) => {
      this.currentCard = data.card[current_card];
    });
  },
};
</script>

<style></style>
