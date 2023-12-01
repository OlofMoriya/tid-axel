<template>
  <div class="form-container">
    <input type="text" v-model="field1" placeholder="Game ID" />
    <input type="text" v-model="field2" placeholder="Name" />
    <button :disabled="isButtonDisabled" @click="submitForm">Join Game</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      field1: '',
      field2: ''
    };
  },
  computed: {
    isButtonDisabled() {
      return this.field1 === '' || this.field2 === '';
    }
  },
  methods: {
    submitForm() {
      const id = this.field1;
      const name = this.field2;

      console.log('Submitted ID:', id, 'Submitted Name:', name);
      // Further processing can be added here
    }
  }
}
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
  background-color: #4CAF50; /* Example button color */
  color: white;
  margin-top: 10px; /* Space above the button */
}

button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
