<template>
  <div class="timeline-container">
    <!-- Display the next random number above the timeline -->
    <div v-if="randomNumber !== null" class="random-number-display">
      Next Number: {{ randomNumber }}
    </div>
    <div class="timeline">
      <div v-for="(item, index) in dots" :key="item.id" class="timeline-item">
        <div
          v-if="item.type === 'dot'"
          class="timeline-dot"
          @click="dotClick(index)"
        ></div>
        <div v-else-if="item.type === 'number'" class="timeline-number">
          {{ item.number }}
        </div>
        =
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",

  data() {
    return {
      dots: [{ id: 0, type: "dot" }],
      nextId: 1,
      numbers: this.shuffleArray([
        1965, 2003, 2022, 1984, 1945, 1999, 2001, 1977, 1953,
      ]),
      randomNumber: null,
    };
  },
  created() {
    this.randomNumber = this.numbers[this.numbers.length - 1];
  },
  methods: {
    dotClick(index) {
      if (this.randomNumber !== null) {
        const leftNumber =
          index > 0 && this.dots[index - 1].type === "number"
            ? this.dots[index - 1].number
            : null;
        const rightNumber =
          index < this.dots.length - 1 && this.dots[index + 1].type === "number"
            ? this.dots[index + 1].number
            : null;

        if (this.isValidNumber(this.randomNumber, leftNumber, rightNumber)) {
          this.dots.splice(index, 1, {
            id: this.nextId++,
            type: "number",
            number: this.randomNumber,
          });
          this.dots.splice(index, 0, { id: this.nextId++, type: "dot" });
          this.dots.splice(index + 2, 0, { id: this.nextId++, type: "dot" });
          this.numbers.pop(); // Remove the used number from the array
          this.setNextRandomNumber();
        } else {
          console.log("Random number does not fit between adjacent numbers.");
        }
      }
    },
    setNextRandomNumber() {
      if (this.numbers.length > 0) {
        this.randomNumber = this.numbers[this.numbers.length - 1];
      } else {
        this.randomNumber = null; // No more numbers to display
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
      return (
        (!leftNumber || number >= leftNumber) &&
        (!rightNumber || number <= rightNumber)
      );
    },
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
}

.timeline::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  height: 2px;
  background-color: #333;
  z-index: -1;
}

.timeline-dot:last-child {
  margin-right: 0;
}
.clicked-dot {
  background-color: #3498db;
}
.timeline-item {
  display: flex;
  align-items: center;
}

.timeline-label {
  /* Styles for your label */
  margin: 0 10px;
  color: #333;
  font-weight: bold;
}
.timeline-number {
  /* Styles for your number */
  margin: 0 10px;
  color: #3498db;
  font-weight: bold;
}
.random-number-display {
  margin-bottom: 15px;
  font-size: 1.2em;
  color: #3498db;
}
.timeline-number {
  /* Styles for your number */
  margin: 0 10px;
  color: #3498db;
  font-weight: bold;
}

/* Rest of your styles */
</style>
