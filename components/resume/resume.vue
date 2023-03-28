<template>
  <div style="width: 90vw">
    <Toast />
    <div class="flex">
      <Button label="Resume" icon="pi pi-download" class="p-button-sm p-button-success mr-1"
        @click="downloadFile(form, 'f', 'Resume')" />
      <Button v-for="(data, index) in attachments" :key="index" :label="data.type" icon="pi pi-download"
        class="p-button-sm p-button-info mr-1" @click="downloadFile(data.file, 'file', data.type)" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const route = useRoute();
const config = useRuntimeConfig();
const id = route.params.id;
let form = reactive();
const nama = ref();
const attachments = ref({});

const downloadFile = async (form, param, type) => {
  let linkSource = param === 'file' ? form : `data:application/pdf;base64,${form}`;
  const a = document.createElement("a");
  a.href = linkSource;
  a.download = `${type}-${nama.value}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast.add({ severity: 'success', summary: 'berhasil download resume', life: 1000 });
};

async function getForm() {
  form = await axios.get(config.API_BASE_URL + "download_pdf?id=" + id + "&name=" + nama.value);
  form = form.data.dataPDF;
}

async function getApplicant() {
  nama.value = await axios.get(config.API_BASE_URL + "applicants/" + id);
  nama.value = nama.value.data.data.name;
}

async function getApplicantAttachment() {
  attachments.value = await axios.get(config.API_BASE_URL + "attachmentapplicants/" + id);
  attachments.value = attachments.value.data.data;
}

onMounted(async () => {
  await getApplicant()
  await getForm();
  await getApplicantAttachment();
});
</script>
