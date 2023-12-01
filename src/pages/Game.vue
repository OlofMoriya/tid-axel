<template>
  <div>
    <Timeline :currentCard="currentCard" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Timeline from "../components/TimeLine.vue";
import { subscribe } from "../../firebase";

export default {
  name: "Game",
  components: {
    Timeline,
  },
  setup() {
    const currentCard = ref(null);

    onMounted(() => {
      subscribe("games", "hast", (data) => {
        currentCard.value = data.card[current_card];
      });
    });

    return {
      currentCard,
    };
  },
};
</script>

<style></style>
