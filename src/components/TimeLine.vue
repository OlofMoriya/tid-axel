<template>
    <div class="next-card">
    <div class="playing-card-large">
        <img class="playing-card-image" :src="currentCardImage" />
    </div>
    </div>
  <div class="timeline-container">
    <div class="timeline">
      <div v-for="(item, index) in dots" :key="item.id" class="timeline-item">
        <div
          v-if="item.type === 'dot'"
          :class="{ 'disabled-dot': dotUsed }"
          class="timeline-dot"
          @click="() => dotClick(index)"
        ></div>
        <div v-else-if="item.type === 'card'" class="timeline-number">

  <div class="playing-card">
    <img :src="item.url" class="playing-card-image"/>
  </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watchEffect, ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "Timeline",
  props: {
    id: Number,
    currentCard: Object
  },
  setup(props) {
      const id = props.id;

      const currentCard = ref(undefined);
      const currentCardImage = computed(()=>"/public/"+currentCard.value?.url);
      watchEffect(()=>{currentCard.value = props.currentCard});



    const dots = ref([{ id: 0, type: "dot" }]);
    let nextId = 1;
    
    const countdown = ref(5);
    const intervalId = ref(null);
    const dotUsed = ref(false);

    function isValidNumber(number, leftNumber, rightNumber) {
      return (
        (!leftNumber || number >= leftNumber) &&
        (!rightNumber || number <= rightNumber)
      );
    }

    function dotClick(index) {
      if (!dotUsed.value && currentCard.value?.year) {
        const leftNumber =
          index > 0 && dots.value[index - 1]?.type === "number"
            ? dots.value[index - 1].number
            : null;

        const rightNumber =
          index < dots.value.length - 1 &&
          dots.value[index + 1]?.type === "number"
            ? dots.value[index + 1].number
            : null;

        if (isValidNumber(currentCard.value?.year, leftNumber, rightNumber)) {
          dots.value.splice(index, 1, {
            id: nextId++,
            type: "card",
            number: currentCard.value?.year,
            url: "/public/" + currentCard.value?.url,
          });
          dots.value.splice(index, 0, { id: nextId++, type: "dot" });
          dots.value.splice(index + 2, 0, { id: nextId++, type: "dot" });
        }
        dotUsed.value = true;
      }
    }

    return { currentCardImage, currentCard, dots, countdown, dotClick, dotUsed, id };
  },
};
</script>

<style>
.timeline-container {
  overflow-x: auto;
  white-space: nowrap;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.timeline {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  width: 1000px;
  padding: 0 10px;
}

.timeline-dot {
  height: 20px;
  width: 20px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  border: red solid 5px;
  z-index: 1;
  cursor: pointer;
}

.disabled-dot {
  opacity: 0.5;
  cursor: not-allowed;
}

.timeline-number {
  /* Styles for the timeline number */
}

.random-number-display {
    display: block;
  /* Styles for the random number display */
}

.playing-card-large {
  width: 200px;
height: 300px;
overflow: hidden;
  border: 1px solid black;
  border-radius: 10px;
box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.playing-card {
  width: 100px;
height: 150px;
overflow: hidden;
  border: 1px solid black;
  border-radius: 10px;
box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.playing-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.next-card {
    display: flex;
    justify-content: center;
}

</style>
