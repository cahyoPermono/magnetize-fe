<template>
  <Toast />
  <div v-if="store.document">
    <div class="mt-4 mx-3" v-for="(data, index) in store.document" :key="index">
      <div v-if="index < 3">
        <label :for="data.type">
          <small>{{ data.type }}</small>
          <span style="color: red" v-if="data.isRequired">*</span>
        </label>
        <div class="flex mt-2">
          <FileUpload
            mode="basic"
            :name="data.type"
            accept="application/pdf"
            :maxFileSize="maxSize"
            @upload="upload($event, index)"
            url="/"
            :auto="true"
            chooseLabel="Browse"
          />
          <p class="ml-2 mt-2">{{ data.filename }}</p>
        </div>
      </div>
    </div>
    <div class="mt-4 mx-3">
      <label for="data lain">
        <small>Dokumen Pendukung (Ijazah, Sertifikat, SIM, Referensi Kerja, dll)</small>
        <span style="color: red">*</span>
      </label>
      <div class="flex mt-2">
        <FileUpload
          mode="basic"
          name="data lain"
          :maxFileSize="maxSize"
          @upload="upload($event)"
          url="/"
          :auto="true"
          chooseLabel="Browse"
          multiple="true"
        />
        <p class="ml-2 mt-2">
          <span v-for="(data, index) in dataPendukung" :key="index"> {{ data.filename }}, </span>
        </p>
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

const dataPendukung = computed(() => {
  return store.document.slice(3);
});

const upload = async (event, index) => {
  try {
    loading.value = true;

    if (index < 3) {
      const reader = new FileReader();
      const file = event.files[0];
      store.document[index].filename = file.name;
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        store.document[index].file = reader.result;
      };
    } else {
      const files = event.files;
      files.forEach((file, i) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          store.document.push({
            type: `Dokumen Pendukung-${i}`,
            file: reader.result,
            filename: file.name,
          });
        };
      });
    }

    toast.add({
      severity: "info",
      summary: "Sukses Upload File",
      detail: "sukses upload",
      life: 2000,
    });
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
};
</script>
