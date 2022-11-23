<template>
  <Button label="tambah attachment" icon="pi pi-plus" class="p-button-sm p-button-success mt-3"
    @click="openModalAttachment" />
  <Dialog v-model:visible="displayModalAttachment" header="Tambah Attachment"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }" :modal="true">
    <div class="card p-3">
      <div class="mt-2">
        <label for="attachment"><small>Nama Attachment</small><span style="color: red">*</span></label>
        <Field class="form-control" name="attachment" v-model="newAttachment.attachment" />
      </div>
      <div class="mt-2">
        <label for="formFile"><small>File Attachment</small><span style="color: red">*</span></label>
        <FileUpload name="demo[]" mode="basic" @upload="onUpload" accept="image/*,.pdf" :maxFileSize="2000000">
        </FileUpload>
      </div>
    </div>
  </Dialog>
  <div v-if="attachements === undefined">
    <div class="card mt-3 p-5" style="display: flex">
      <div style="text-align: center; opacity: 0.6">
        <i class="pi pi-info-circle" style="font-size: 2rem"></i>
        <p>anda belum membuat attachement</p>
      </div>
    </div>
  </div>
  <div v-else>
    <DataTable :value="attachements" :paginator="true" :rows="5"
      paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      responsiveLayout="scroll" removableSort>
      <Column>
        <template #body="slotProps">
          <div v-if="isPDF(slotProps.data.type) === true">
            <div style="opacity: 0.4">
              <i class="pi pi-file-pdf" style="font-size: 3rem" />
              <br />
              <small>PDF File</small>
            </div>
          </div>
          <div v-else>
            <div style="opacity: 0.4">
              <i class="pi pi-image" style="font-size: 3rem" /> <br />
              <small>Image File</small>
            </div>
          </div>
        </template>
      </Column>
      <Column field="attachment_name"></Column>
      <Column>
        <template #body="slotProps">
          {{ reverseDate(slotProps.data.createdAt) }}
        </template>
      </Column>
      <Column>
        <template #body>
          <Button class="p-button-text p-button-plain" icon="pi pi-external-link" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import axios from "axios";
import dateFormat from "dateformat";

const route = useRoute();
const displayModalAttachment = ref(false);
const newAttachment = reactive({
  attachment: "",
  type: "",
  file: "",
});
const attachements = ref("");
const id = route.params.id;

const isPDF = (param) => {
  if (param === "application/pdf") {
    return true;
  } else {
    return false;
  }
};
const config = useRuntimeConfig();
onMounted(async () => {
  const getAttachments = await axios.get(config.API_BASE_URL + "attachments/dept/" + id);
  attachements.value = await getAttachments.data.data;
});
const reverseDate = (date) => {
  return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
};
async function onUpload(evt) {
  try {
    let f = evt.files[0];
    newAttachment.type = f.type;
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = async () => {
      newAttachment.file = reader.result;
      console.log(newAttachment.file);
      await axios.post(config.API_BASE_URL + "attachments", {
        attachment_name: newAttachment.attachment,
        attachment_file: newAttachment.file,
        type: newAttachment.type,
        DepartementId: route.params.id,
      });
      const getAttachments = await axios.get(config.API_BASE_URL + "attachments/dept/" + id);
      attachements.value = getAttachments.data.data;
    };
    alert("Attachment baru ditambahkan");
    displayModalAttachment.value = false;

  } catch (error) {
    alert(error);
  }
}
function openModalAttachment() {
  displayModalAttachment.value = !displayModalAttachment.value;
}
</script>
