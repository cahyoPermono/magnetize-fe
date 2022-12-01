<template>
  <div class="container">
    <div>
      <img alt="Vue logo" src="" />
      <Toast />

      <div>
        <form @submit.prevent="greet">
          <InputText type="text" v-model="text" />
          <Button type="submit" label="Submit" />
        </form>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import axios from "axios";

import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const text = ref();
const toast = useToast();
const greet = () => {
  toast.add({ severity: "info", summary: "Hello " + text.value });
};
const config = useRuntimeConfig();

const data_applicants = ref(null);
onMounted(async () => {
    const getApplicants = await axios.get(config.API_BASE_URL + "allapplicants");
    data_applicants.value = await getApplicants.data.data;
    console.log(data_applicants.value);
});
</script>
<style>

</style>
  