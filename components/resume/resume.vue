<template>
  <div>
    <Toast />
    <div class="grid" style="width: 75vw">
      <Button
        label="Resume"
        icon="pi pi-download"
        class="p-button-sm p-button-success mr-1 mt-1"
        @click="downloadFile(form, 'f', 'Resume')"
      />
      <Button
        v-if="formTechnical"
        label="Technical Skill"
        icon="pi pi-download"
        class="p-button-sm p-button-success mr-1 mt-1"
        @click="downloadFile(formTechnical, 'f', 'Technical Skill')"
      />
      <Button
        v-if="form2"
        label="Form 2"
        icon="pi pi-download"
        class="p-button-sm p-button-success mr-1 mt-1"
        @click="downloadFile(form2, 'f', 'Form 2')"
      />
      <Button
        v-for="(data, index) in attachments"
        :key="index"
        :label="data.type"
        icon="pi pi-download"
        class="p-button-sm p-button-info mr-1 mt-1"
        @click="downloadFile(data.file, 'file', data.type)"
      />
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
let form2 = reactive();
let formTechnical = reactive();
const nama = ref();
const attachments = ref({});

function getExtension(mimeType) {
  const mimeToExtMap = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "application/pdf": "pdf",
    "application/x-zip-compressed": "zip",
    "application/x-rar-compressed": "rar",
    "application/vnd.rar": "rar",
  };

  // Check if the MIME type exists in the mapping object
  if (mimeToExtMap.hasOwnProperty(mimeType)) {
    return mimeToExtMap[mimeType];
  }

  // If the MIME type is not found, return an empty string or handle the case as needed
  return "";
}

const downloadFile = async (form, param, type) => {
  let linkSource = param === "file" ? form : `data:application/pdf;base64,${form}`;

  //get ext
  const mimeType_ = linkSource.substring(0, linkSource.indexOf(";")).replace("data:", "");
  const ext = getExtension(mimeType_);

  const a = document.createElement("a");
  a.href = linkSource;
  a.download = `${type}-${nama.value}.${ext}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast.add({ severity: "success", summary: "berhasil download resume", life: 1000 });
};

async function getForm() {
  form = await axios.get(config.API_BASE_URL + "download_pdf?id=" + id + "&name=" + nama.value);
  form = form.data.dataPDF;
}

async function getFormTechnical() {
  formTechnical = await axios.get(
    config.API_BASE_URL + "download_technical_skill?id=" + id + "&name=" + nama.value
  );
  formTechnical = formTechnical.data.dataPDF;
}

async function getForm2() {
  const data = await axios.get(config.API_BASE_URL + "download_form_2?id=" + id + "&name=" + nama.value);
  if (data.data.dataPDF) {
    form2 = data.data.dataPDF;
  }
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
  await getApplicant();
  await getForm();
  await getFormTechnical();
  await getForm2();
  await getApplicantAttachment();
});
</script>
