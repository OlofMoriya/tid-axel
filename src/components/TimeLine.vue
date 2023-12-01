<template>
  <div class="timeline-container">
    <div class="timeline">
      <div class="timeline-event" v-for="event in events" :key="event.id">
        <div class="event-dot"></div>
        <div class="event-content">
          <h3>{{ event.title }}</h3>
          <span>{{ event.date }}</span>
          <p>{{ event.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timeline",
  data() {
    return {
      events: [
        // Your event data
      ],
    };
  },
};
</script>

<style>
.timeline-container {
  overflow-x: auto;
  white-space: nowrap;
}

.timeline {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.timeline-event {
  display: inline-flex;
  align-items: center;
  margin-right: 20px; /* Adjust spacing between events */
}

.event-dot {
  height: 20px; /* Size of the dot */
  width: 20px; /* Size of the dot */
  background-color: #555; /* Color of the dot */
  border-radius: 50%;
  position: relative;
}

.event-content {
  margin-left: 10px;
  /* Additional styling for event content */
}
</style>
