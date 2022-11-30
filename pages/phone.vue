<!-- your-component.vue-->
<template>
    <vue-tel-input v-model="phone" mode="international"></vue-tel-input>
    <button @click="show" type="button" />
    
  </template>
  <script>
  import { ref } from 'vue'
  import { VueTelInput } from 'vue3-tel-input'
  import 'vue3-tel-input/dist/vue3-tel-input.css'
  
  export default {
    components: {
      VueTelInput,
    },
  
    setup() {
      const phone = ref(null);

      function show(){
        console.log(phone)
      }
  
      return {
        phone, show
      }
    }
  };
  </script>