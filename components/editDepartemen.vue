<template>
  <i class="pi pi-user-edit" @click="openPosition('top')" style="float: right; opacity:0.3;" />

  <Dialog header="Edit Data Departemen" v-model:visible="displayPosition"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '50vw' }" :position="position" :modal="true">
    <Form class="mb-3" @submit="save">
      <div class="card p-3">
        <div class="">
          <label for="edit_nama"><small>Nama</small><span style="color: red">*</span></label>
          <Field v-model="newDept.nama" class="form-control" name="edit_nama" />
        </div>
        <div class="mt-2">
          <label for="edit_url"><small>URL</small><span style="color: red">*</span></label>
          <Field v-model="newDept.url" class="form-control" name="edit_url" />
        </div>
        <div class="mt-2">
          <label for="edit_industri"><small>Industri</small><span style="color: red">*</span></label>
          <Field v-model="newDept.industri" class="form-control" name="edit_industri" />
        </div>
        <div class="mt-2">
          <label for="edit_lokasi"><small>Lokasi</small><span style="color: red">*</span></label>
          <Field v-model="newDept.lokasi" class="form-control" name="edit_lokasi" />
        </div>
        <div class="mt-2">
          <label for="edit_alamat"><small>Alamat</small><span style="color: red">*</span></label>
          <Field v-model="newDept.alamat" class="form-control" name="edit_alamat" />
        </div>
        <div class="mt-2">
          <label for="deskripsi"><small>Deskripsi</small></label> <br>
          <Textarea name="deskripsi" v-model="newDept.deskripsi" class="deskripsi-tambah" />
        </div>
      </div>
      <div class="mt-3" style="float: right">
        <Button label="No" icon="pi pi-times" @click="closePosition" class="p-button-text mb-5 mr-3" />
        <Button class="mb-5" label="Update" icon="pi pi-check" type="submit" />
      </div>
    </Form>
  </Dialog>
</template>

<script setup>
import axios from "axios";
const newDept = ref(null);
const position = ref("center");
const displayPosition = ref(false);
const openPosition = (pos) => {
  position.value = pos;
  displayPosition.value = true;
};
const closePosition = () => {
  displayPosition.value = false;
};
async function save() {
  console.log(newDept.value);
  try {
    await axios
      .post("http://localhost:3000/api/1.0/departements", {
        nama: newDept.value.nama,
        url: newDept.value.url,
        industri: newDept.value.industri,
        lokasi: newDept.value.lokasi,
        alamat: newDept.value.alamat,
        deskripsi: newDept.value.deskripsi,
      })
      .then(() => {
        alert("Departemen diupdate");
        setTimeout(function () {
          location = "/departements";
        }, 760);
      });

    await axios.delete(
      "http://localhost:3000/api/1.0/departements/" + newDept.value.id
    );
  } catch (error) {
    alert(error);
  }
}
onMounted(async () => {
  const route = useRoute();

  const id = route.params.id;
  const getdata = await axios.get(
    "http://localhost:3000/api/1.0/departements/" + id
  );
  newDept.value = getdata.data.departement;
});
</script>

<style>

</style>
