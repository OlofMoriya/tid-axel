<template>
  <div>
    <Timeline :currentCard="currentCard" :id="id" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Timeline from "../components/TimeLine.vue";
import { subscribe } from "../../firebase";
import { useRoute } from "vue-router";

export default {
  name: "Game",
  components: {
    Timeline,
  },

  setup() {
    const route = useRoute();
    const currentCard = ref(null);

    onMounted(() => {
      subscribe("games", "hast", (data) => {
        currentCard.value = data.card[current_card];
      });
    });
    const id = route.params.id;
    return {
      currentCard,
      id,
    };
  },
};
</script>

<style></style>
