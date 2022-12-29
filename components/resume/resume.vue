<template>
  <div style="width: 900px">
    <Toast />
    <Button
      label="Resume"
      icon="pi pi-download"
      class="p-button-sm p-button-success mt-3"
      badge=""
      @click="downloadCV(form)"
    />
  </div>
</template>

<script setup>
import axios from "axios";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const id = route.params.id;
let form = reactive();
const nama= ref();

const downloadCV = async (form) => {
  const linkSource = `data:application/pdf;base64,${form}`;
  const a = document.createElement("a");
  a.href = linkSource;
  a.download = `Resume-${nama.value}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

async function getForm() {
  form = await axios.get(config.API_BASE_URL + "download_pdf/" + id);
  form = form.data.dataPDF;
}

async function getApplicant() {
  nama.value = await axios.get(config.API_BASE_URL + "applicants/" + id);
  nama.value = nama.value.data.data.name;
}

onMounted(() => {
  getApplicant()
  getForm();
});
</script>
