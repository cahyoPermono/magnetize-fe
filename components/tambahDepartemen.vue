<template>
  <Button
    label="tambah departemen"
    icon="pi pi-plus"
    class="p-button-sm mt-3"
    @click="openModal"
  />
  <Dialog
    v-model:visible="displayModal"
    header="Tambah Departemen"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '40vw' }"
    :modal="true"
  >
    <div class="card p-3">
      <Form @submit="save">
        <div class="mt-2">
          <label for="nama"
            ><small>Nama Departemen</small
            ><span style="color: red">*</span></label
          >
          <Field
            class="form-control"
            name="nama"
            :rules="isRequired"
            v-model="newDept.nama"
          />
          <ErrorMessage name="nama"
            ><small style="color: red">Name is required</small></ErrorMessage
          >
        </div>
        <div class="mt-2">
          <label for="url"
            ><small>URL</small><span style="color: red">*</span></label
          >
          <Field
            class="form-control"
            name="url"
            :rules="isRequired"
            v-model="newDept.url"
          />
          <ErrorMessage name="url"
            ><small style="color: red">url is required</small></ErrorMessage
          >
        </div>
        <div class="mt-2">
          <label for="industri"
            ><small>Industri</small><span style="color: red">*</span></label
          >
          <Field
            class="form-control"
            name="industri"
            :rules="isRequired"
            v-model="newDept.industri"
          />
          <ErrorMessage name="industri"
            ><small style="color: red"
              >industri is required</small
            ></ErrorMessage
          >
        </div>
        <div class="mt-2">
          <label for="lokasi"
            ><small>Lokasi</small><span style="color: red">*</span></label
          >
          <Field
            class="form-control"
            name="lokasi"
            :rules="isRequired"
            v-model="newDept.lokasi"
          />
          <ErrorMessage name="lokasi"
            ><small style="color: red">lokasi is required</small></ErrorMessage
          >
        </div>
        <div class="mt-2">
          <label for="alamat"
            ><small>Alamat</small><span style="color: red">*</span></label
          >
          <Field
            class="form-control"
            name="alamat"
            :rules="isRequired"
            v-model="newDept.alamat"
          />
          <ErrorMessage name="alamat"
            ><small style="color: red">lokasi is required</small></ErrorMessage
          >
        </div>
        <div class="mt-2">
          <label for="deskripsi"><small>Deskripsi</small></label>
          <Editor v-model="deskripsi" id="deskripsi" />
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
import { useToast } from "primevue/usetoast";

const toast = useToast();

const displayModal = ref(false);
const deskripsi = ref("");
const newDept = reactive({
  nama: "",
  url: "",
  industri: "",
  lokasi: "",
  alamat: "",
});

function openModal() {
  displayModal.value = !displayModal.value;
}

async function save() {
  try {
    await axios
      .post("http://localhost:3000/api/1.0/departements", {
        nama: newDept.nama,
        url: newDept.url,
        industri: newDept.industri,
        lokasi: newDept.lokasi,
        alamat: newDept.alamat,
        deskripsi: deskripsi.value,
      })
      .then(() => {
        alert("Departemen baru ditambahkan");
        setTimeout(function () {
          location.reload();
        }, 760);
      });
  } catch (error) {
    console.log(error);
  }
}
const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};
</script>

<style>
.ProseMirror {
  border-radius: 10px;
  border: 1px solid #1d1d1d;
  width: 400px;
}
</style>
