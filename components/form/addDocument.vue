<template>
  <Toast />
  <div v-if="store.document">
    <div class="mt-4 mx-3" v-for="(data, index) in store.document" :key="index">
      <label for="cv">
        <small>{{ data.type }}</small
        ><span style="color: red">*</span>
      </label>
      <div class="flex mt-2">
        <FileUpload
          mode="basic"
          name="cv"
          accept="application/pdf"
          :maxFileSize="maxSize"
          @upload="upload($event, index)"
          url="./test"
          :auto="true"
          chooseLabel="Browse"
        />
        <p class="ml-2 mt-2">{{ data.filename }}</p>
      </div>
    </div>
  </div>
  
  <loading-screen v-if="loading" />
</template>

<script setup>
import { useToast } from "primevue/usetoast";
import { useStore } from "~~/stores/applicant_auth";

const store = useStore();
const toast = useToast();
const maxSize = 5 * 1000000;
const loading = ref(false);

const upload = async (event, index) => {
  try {
    loading.value = true;
    const file = event.files[0];
    store.document[index].filename = file.name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      store.document[index].file = reader.result;
      toast.add({
        severity: "info",
        summary: "Sukses Upload File",
        detail: "sukses upload " + store.document[index].type,
        life: 2000,
      });
    };
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};
</script>
