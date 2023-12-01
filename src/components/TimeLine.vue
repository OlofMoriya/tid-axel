<template>
  <div class="timeline-container">
    <!-- Display the next random number above the timeline with countdown -->
    <div v-if="randomNumber !== null" class="random-number-display">
      Next Number: {{ randomNumber }} (Changing in {{ countdown }} seconds)
    </div>
    <div class="timeline">
      <div v-for="(item, index) in dots" :key="item.id" class="timeline-item">
        <div v-if="item.type === 'dot'" :class="{ 'disabled-dot': dotUsed }" class="timeline-dot" @click="dotClick(index)"></div>
        <div v-else-if="item.type === 'number'" class="timeline-number">{{ item.number }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {
      dots: [{ id: 0, type: 'dot' }],
      nextId: 1,
      numbers: this.shuffleArray([1965, 2003, 2022, 1984, 1945, 1999, 2001, 1977, 1953]),
      randomNumber: null,
      countdown: 5,
      intervalId: null,
      dotUsed: false,
    };
  },
  created() {
    this.setRandomNumberWithInterval();
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  },
  methods: {
    dotClick(index) {
      if (!this.dotUsed && this.randomNumber !== null) {
        const leftNumber = index > 0 && this.dots[index - 1].type === 'number' ? this.dots[index - 1].number : null;
        const rightNumber = index < this.dots.length - 1 && this.dots[index + 1].type === 'number' ? this.dots[index + 1].number : null;

        if (this.isValidNumber(this.randomNumber, leftNumber, rightNumber)) {
          this.dots.splice(index, 1, { id: this.nextId++, type: 'number', number: this.randomNumber });
          this.dots.splice(index, 0, { id: this.nextId++, type: 'dot' });
          this.dots.splice(index + 2, 0, { id: this.nextId++, type: 'dot' });
        } else {
          console.log('Random number does not fit between adjacent numbers.');
        }
        this.dotUsed = true; // Disable further clicks, regardless of whether the click was right or wrong
      }
    },
    setRandomNumberWithInterval() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.updateRandomNumber();
      this.intervalId = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          this.updateRandomNumber();
          this.countdown = 5;
        }
      }, 1000);
    },
    updateRandomNumber() {
      if (this.numbers.length > 0) {
        this.randomNumber = this.numbers.pop();
        this.dotUsed = false; // Allow dot clicks for the new number
      } else {
        this.randomNumber = null;
        clearInterval(this.intervalId);
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    isValidNumber(number, leftNumber, rightNumber) {
      return (!leftNumber || number >= leftNumber) && (!rightNumber || number <= rightNumber);
    }
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
    /* Your styles for the timeline number */
  }

  .random-number-display {
    /* Your styles for the random number display */
  }

  /* Add any additional styles you need here */
</style>
