<template>
    <div style="width:900px;">
        <Toast />
    <Button
      label="Resume"
      icon="pi pi-download"
      class="p-button-sm p-button-success mt-3"
      @click="downloadCV(form)"
    /></div>
    
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

const downloadCV = async (form) => {
  const a = document.createElement("a");
  a.href = 'data:application/pdf;base64,'+form;
  a.download = "resume.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

async function getForm() {
  form = await axios.get(config.API_BASE_URL + "download_pdf/" + id);
  form = form.data.dataPDF;
}

onMounted(() => {
  getForm();
});
</script>
