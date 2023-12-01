<template>
  <div class="form-container">
    <input type="text" v-model="field1" placeholder="Game ID" />
    <input type="text" v-model="field2" placeholder="Name" />
    <button :disabled="isButtonDisabled" @click="submitForm">Join Game</button>
  </div>
</template>


<script setup>
import { start_game } from "../../firebase";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const field1 = ref("");
const field2 = ref("");
const router = useRouter();

const isButtonDisabled = computed(() => {
  return field1.value === "" || field2.value === "";
});

const submitForm = () => {
  const result = start_game("games", field1.value);
  console.log("result", result);
  console.log("Submitted ID:", field1.value, "Submitted Name:", field2.value);

  router.push({
    name: "Game", // Using the name of the route
    params: { id: field1.value, name: field2.value }, // Assuming you only want to pass `id` as a route parameter
  });
};

</script>

<style>
.form-container {
  background-color: #f0f0f0; /* Light grey background */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the items horizontally */
}

input[type="text"] {
  width: 100%; /* Full width within the form-container */
  max-width: 300px; /* Maximum width of the fields */
  padding: 10px;
  margin-bottom: 10px; /* Space between fields and button */
  border: none;
  border-radius: 5px;
}

button {
  max-width: 300px; /* Maximum width of the button */
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50; /* Example button color */
  color: white;
  margin-top: 10px; /* Space above the button */
}

button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
