<template>
  <div>
    <Timeline />
  </div>
</template>

<script>
import Timeline from "../components/TimeLine.vue";
import {subscribe} from "../../firebase";

subscribe("games", "hast", (data)=>{
    console.log("data in game: ", data);
});

export default {
  name: "Game",
  components: {
    Timeline,
  },
};
</script>

<style></style>
