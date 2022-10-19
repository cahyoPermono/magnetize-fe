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
      <Form @submit="saveAttachment">
        <div class="mt-2">
          <label for="attachment"
            ><small>Nama Attachment</small
            ><span style="color: red">*</span></label
          >
          <Field
            class="form-control"
            name="attachment"
            :rules="isRequired"
            v-model="newAttachment.attachment"
          />
          <ErrorMessage name="attachment"
            ><small style="color: red"
              >Attachment is required</small
            ></ErrorMessage
          >
        </div>
        <div class="mt-2">
          <label for="formFile"
            ><small>File Attachment</small
            ><span style="color: red">*</span></label
          >
          <input
            class="form-control"
            type="file"
            @change="handleFileSelect"
            id="formFile"
          />
        </div>
        <div class="mt-4">
          <Button label="Submit" icon="pi pi-check" type="submit" />
        </div>
      </Form>
    </div>
  </Dialog>
</template>

<script setup>
import axios from "axios";

const displayModalAttachment = ref(false);
const newAttachment = reactive({
  attachment: "",
});

const file = ref("");

function handleFileSelect(evt) {
  let f = evt.target.files[0];
  const filesize = f.size / 1024 ** 2;
  if (filesize >= 2) {
    alert("Please select a file less than 2MB.");
    return;
  } else {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.pdf)$/i;
    if (!allowedExtensions.exec(f.name)) {
      alert("Invalid file type");
      file.value = "";
      newAttachment.attachment = "";
      return false;
    } else {
      const reader = new FileReader();

      reader.onloadend = () => {
        file.value = reader.result;
      };
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
}
function openModalAttachment() {
  displayModalAttachment.value = !displayModalAttachment.value;
}
const route = useRoute();

async function saveAttachment() {
  try {
    const res = await axios.post("http://localhost:3000/api/1.0/attachments", {
      attachment_name: newAttachment.attachment,
      attachment_file: file.value,
      DepartementId: route.params.id,
    });
    alert("Attachment baru ditambahkan");
    setTimeout(function () {
      location.reload();
    }, 760);
  } catch (error) {
    alert("Attachment kosong atau invalid type file");
  }
}
const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>
