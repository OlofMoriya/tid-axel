<template>
  <div class="timeline-container">
    <!-- Displaying the random number above the timeline -->
    <div class="random-number-display">Random Number: {{ randomNumber }}</div>
    <div class="timeline">
      <div v-for="(item, index) in dots" :key="item.id" class="timeline-item">
        <div v-if="item.type === 'dot'" class="timeline-dot" @click="dotClick(index)"></div>
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
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9], // Array of numbers
      randomNumber: null
    };
  },
  created() {
    this.generateRandomNumber();
  },
  methods: {
    dotClick(index) {
      if (this.randomNumber !== null) {
        this.dots.splice(index, 1, { id: this.nextId++, type: 'number', number: this.randomNumber });
        this.dots.splice(index, 0, { id: this.nextId++, type: 'dot' });
        this.dots.splice(index + 2, 0, { id: this.nextId++, type: 'dot' });
        this.generateRandomNumber(); // Generate a new random number
      }
    },
    generateRandomNumber() {
      this.randomNumber = this.numbers[Math.floor(Math.random() * this.numbers.length)];
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
