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
            <img :src="item.url" class="playing-card-image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch, ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "Timeline",
  props: {
    id: Number,
    currentCard: Object,
  },
  setup(props) {
    const dotUsed = ref(false);
    const currentCardImage = computed(
      () => "/public/" + props.currentCard?.url
    );
    const dots = ref([{ id: 0, type: "dot" }]);
    let nextId = 1;

    function isValidNumber(number, leftNumber, rightNumber) {
      return (
        (!leftNumber || number >= leftNumber) &&
        (!rightNumber || number <= rightNumber)
      );
    }

    function dotClick(index) {
      if (!dotUsed.value && props.currentCard?.year) {
        const leftNumber =
          index > 0 && dots.value[index - 1]?.type === "card"
            ? dots.value[index - 1].number
            : null;
        const rightNumber =
          index < dots.value.length - 1 &&
          dots.value[index + 1]?.type === "card"
            ? dots.value[index + 1].number
            : null;

        if (isValidNumber(props.currentCard.year, leftNumber, rightNumber)) {
          dots.value.splice(index, 1, {
            id: nextId++,
            type: "card",
            number: props.currentCard.year,
            url: "/public/" + props.currentCard.url,
          });
          dots.value.splice(index, 0, { id: nextId++, type: "dot" });
          dots.value.splice(index + 2, 0, { id: nextId++, type: "dot" });
        }
        dotUsed.value = true;
      }
    }

    watch(
      () => props.currentCard,
      (newCard) => {
        dotUsed.value = false;
      }
    );

    return { currentCardImage, dots, dotClick, dotUsed };
  },
};
</script>

<style>
.timeline-container {
  margin-top: 30px;
  overflow-x: auto;
  white-space: nowrap;
  padding: 20px;
  display: flex;
  justify-content: center;
  background: #f4f7fa;
}

.timeline,
.timeline-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline {
  position: relative;
  padding: 0 10px;
  margin-left: 40px;
}

.timeline-item {
  margin-right: 40px;
}

.timeline-dot {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: #ddd;
  position: relative;
  border: 3px solid #bbb;
  cursor: pointer;
}

.timeline-dot:before,
.timeline-dot:after {
  content: "";
  position: absolute;
  height: 2px;
  background-color: #bbb;
  top: 50%;
  transform: translateY(-50%);
}

.timeline-dot:before {
  width: 48px;
  left: 15px;
}

.timeline-dot:after {
  width: 43px;
  right: 15px;
}

.disabled-dot {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #ccc;
  border-color: #ccc;
}

.playing-card,
.playing-card-large {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.playing-card {
  width: 100px;
  height: 150px;
}

.playing-card-large {
  max-width: 400px;
  max-height: 550px;
  border: 1px solid #ccc;
}

.playing-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.next-card {
  display: flex;
  justify-content: center;
}
</style>
