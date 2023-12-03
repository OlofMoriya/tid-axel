<template>
  <div>
    <Timeline :currentCard="currentCard" :id="id" />
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";
import Timeline from "../components/TimeLine.vue";
import { next_card, subscribe } from "../../firebase";
import { useRoute } from "vue-router";

export default {
  name: "Game",
  components: {
    Timeline,
  },

  setup() {
    const route = useRoute();
    const currentCard = ref(null);
    const game = ref(null);
    watchEffect(() =>
      console.log("WHat's happening here?", currentCard.value?.text)
    );

    const id = route.params.id;

    onMounted(async () => {
      subscribe("games", id, (data) => {
        game.value = data;
        currentCard.value = data.cards[data.current_card];
      });

      const interval = setInterval(() => {
        next_card("games", id, game.value, game.value?.current_card + 1);
        if (game.value?.current_card == game.value?.cards.length - 2) {
          console.log("end of the line");
          clearInterval(interval);
        }
      }, 10000);
    });

    console.log("game", id);

    return {
      currentCard,
      id,
    };
  },
};
</script>

<style></style>
