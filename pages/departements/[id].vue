<template>
  <div class="container-dept p-3">
    <div class="mt-2">
      <div class="b col-4">
        <div class="card p-3">
          <small>Nama Departemen</small>
          <h2>{{ dept.nama }}</h2>
          <small>Deskripsi</small>
          <Editord v-model="dept.deskripsi" class="deskripsi-one" />
          <div>
            <edit-departemen />
          </div>
        </div>
      </div>
      <div class="b col-8">
        <div class="card p-3">
          <small>URL</small>
          <h5>{{ dept.url }}</h5>
          <small>Industri</small>
          <h5>{{ dept.industri }}</h5>
          <small>Lokasi</small>
          <h5>{{ dept.lokasi }}</h5>
          <small>Alamat</small>
          <h5>{{ dept.alamat }}</h5>
        </div>
      </div>
    </div>
    <div class="mt-5">
      <div class="b col-12">
        <div class="card p-3">
          <tab-component />
        </div>
      </div>
    </div>
    <NuxtLink to="/departements" class="float my-float">
      <Button
        icon="pi pi-arrow-left"
        class="p-button-rounded"
        style="box-shadow: 2px 2px 3px #999"
      />
    </NuxtLink>
  </div>
</template>

<script setup>
import axios from "axios";
const route = useRoute();

const edit_note = ref(false);
function edit() {
  edit_note.value = !edit_note.value;
}
async function update_note(note, id) {
  await axios.post("http://localhost:3000/api/1.0/notes", {
    notes: note,
    DepartementId: route.params.id,
  });

  await axios.delete("http://localhost:3000/api/1.0/notes/" + id);
  return location.reload();
}
const dept = ref("");
const isRequired = (value) => {
  if (!value) {
    return "This field is required";
  }
  return true;
};

onMounted(async () => {
  const route = useRoute();

  const id = route.params.id;
  const res = await axios.get(
    "http://localhost:3000/api/1.0/departements/" + id
  );
  if (res.data.message) {
    alert(res.data.message);
    location = "/departements";
  } else {
    dept.value = res.data.departement;
  }
});
</script>
<style>
.ProseMirror .deskripsi-one {
  border: 0px;
}
div.b {
  display: inline-block;
}
.p-accordion-header-link .p-accordion-header-text a:hover {
  text-decoration: none;
}
.p-accordion-content p {
  font-size: 12pt;
}
.float {
  position: fixed;
  bottom: 40px;
  right: 40px;
  text-align: center;
  margin-top: 22px;
}
</style>
