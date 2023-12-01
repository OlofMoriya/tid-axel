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
      const id = route.params.id;

    onMounted(() => {
      subscribe("games", id, (data) => {
        currentCard.value = data.card[data.current_card];
      });
    });
    return {
      currentCard,
      id,
    };
  },
};
</script>

<style></style>
