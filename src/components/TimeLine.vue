<template>
  <div class="timeline-container">
    <div v-if="randomNumber" class="random-number-display">
      Next Number: {{ randomNumber }} (Changing in {{ countdown }} seconds)
    </div>
    <div class="timeline">
      <div v-for="(item, index) in dots" :key="item.id" class="timeline-item">
        <div
          v-if="item.type === 'dot'"
          :class="{ 'disabled-dot': dotUsed }"
          class="timeline-dot"
          @click="() => dotClick(index)"
        ></div>
        <div v-else-if="item.type === 'number'" class="timeline-number">
          {{ item.number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  name: "Timeline",
  setup() {
    const dots = ref([{ id: 0, type: "dot" }]);
    let nextId = 1;
    const numbers = ref(
      [1965, 2003, 2022, 1984, 1945, 1999, 2001, 1977, 1953].sort(
        () => 0.5 - Math.random()
      )
    );
    const randomNumber = ref(null);
    const countdown = ref(5);
    const intervalId = ref(null);
    const dotUsed = ref(false);

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function isValidNumber(number, leftNumber, rightNumber) {
      return (
        (!leftNumber || number >= leftNumber) &&
        (!rightNumber || number <= rightNumber)
      );
    }

    function dotClick(index) {
      if (!dotUsed.value && randomNumber.value) {
        const leftNumber =
          index > 0 && dots.value[index - 1]?.type === "number"
            ? dots.value[index - 1].number
            : null;
        const rightNumber =
          index < dots.value.length - 1 &&
          dots.value[index + 1]?.type === "number"
            ? dots.value[index + 1].number
            : null;

        if (isValidNumber(randomNumber.value, leftNumber, rightNumber)) {
          dots.value.splice(index, 1, {
            id: nextId++,
            type: "number",
            number: randomNumber.value,
          });
          dots.value.splice(index, 0, { id: nextId++, type: "dot" });
          dots.value.splice(index + 2, 0, { id: nextId++, type: "dot" });
        }
        dotUsed.value = true;
      }
    }

    function updateRandomNumber() {
      if (numbers.value.length > 0) {
        randomNumber.value = numbers.value.pop();
        dotUsed.value = false; // Reset for the new number
      } else {
        randomNumber.value = null;
        if (intervalId.value) {
          clearInterval(intervalId.value);
        }
      }
    }

    function setRandomNumberWithInterval() {
      updateRandomNumber();
      intervalId.value = setInterval(() => {
        if (countdown.value > 0) {
          countdown.value -= 1;
        } else {
          updateRandomNumber();
          countdown.value = 5;
        }
      }, 1000);
    }

    onMounted(setRandomNumberWithInterval);
    onBeforeUnmount(() => {
      if (intervalId.value) {
        clearInterval(intervalId.value);
      }
    });

    return { dots, randomNumber, countdown, dotClick, dotUsed };
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
  /* Styles for the random number display */
}
</style>
