<template>
  <Button
    label="tambah attachment"
    icon="pi pi-plus"
    class="p-button-sm p-button-success mt-3"
    @click="openModalAttachment"
  />
  <Dialog
    v-model:visible="displayModalAttachment"
    header="Tambah Attachment"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '40vw' }"
    :modal="true"
  >
    <div class="card p-3">
      <div class="mt-2">
        <label for="attachment"
          ><small>Nama Attachment</small
          ><span style="color: red">*</span></label
        >
        <Field
          class="form-control"
          name="attachment"
          v-model="newAttachment.attachment"
        />
      </div>
      <div class="mt-2">
        <label for="formFile"
          ><small>File Attachment</small
          ><span style="color: red">*</span></label
        >
        <FileUpload
          name="demo[]"
          mode="basic"
          @upload="onUpload"
          accept="image/*,.pdf"
          :maxFileSize="2000000"
        >
        </FileUpload>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import axios from "axios";
const route = useRoute();

const displayModalAttachment = ref(false);
const newAttachment = reactive({
  attachment: "",
  type: "",
  file: "",
});

async function onUpload(evt) {
  try {
    let f = evt.files[0];
    newAttachment.type = f.type;
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => {
      newAttachment.file = reader.result;
    };
    console.log(newAttachment.file);
    await axios.post("http://localhost:3000/api/1.0/attachments", {
      attachment_name: newAttachment.attachment,
      attachment_file: newAttachment.file,
      type: newAttachment.type,
      DepartementId: route.params.id,
    });
    alert("Attachment baru ditambahkan");
    setTimeout(function () {
      location.reload();
    }, 760);
  } catch (error) {
    alert(error);
  }
}
function openModalAttachment() {
  displayModalAttachment.value = !displayModalAttachment.value;
}
</script>
