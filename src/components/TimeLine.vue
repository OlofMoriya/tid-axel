<template>
  <div class="timeline-container">
    <div class="timeline">
      <div
        class="timeline-dot"
        v-for="(dot, index) in dots"
        :key="dot.id"
        :class="{ 'clicked-dot': dot.clicked }"
        @click="dotClick(index)"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {
      dots: [{ id: 0, clicked: false }],
      nextId: 1,
    };
  },
  methods: {
    dotClick(index) {
      const middleIndex = Math.floor(this.dots.length / 2);
      console.log(this.dots[index], "middleIndex");
      this.dots[index].clicked = true;

      const newDotBefore = { id: this.nextId + 1, clicked: false };
      const newDotAfter = { id: this.nextId - 1, clicked: false };

      this.dots.splice(middleIndex, 0, newDotBefore);
      this.dots.splice(middleIndex + 1, 0, newDotAfter);
      //}
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

/* Rest of your styles */
</style>
